import pool from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {

    const client = await pool.connect();
    const { username, email, password, name } = req.body;
    try {
        //CHECK USER IF EXISTS
        const q = "SELECT * FROM users WHERE username= $1"
        const userExists = await client.query(q, [username]);

        if (userExists.rows.length > 0) {
            return res.status(409).json("User already exists!");
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const createUserQuery = `
            INSERT INTO users (username, email, password, name)
            VALUES ($1, $2, $3, $4)
        `;

        await client.query(createUserQuery, [username, email, hashedPassword, name]);
        return res.status(200).json("User has been created.");
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json(error.message);
    } finally {
        client.release(); 
    }
};

export const login = async (req, res) => {
    const client = await pool.connect();
    try {
        const q = ` SELECT u.*, r.tipo as role 
                    FROM users AS u
                    LEFT JOIN roles AS r ON u.roleid = r.roleid
                    WHERE u.username=$1`;
        const { rows } = await client.query(q, [req.body.username]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        const user = rows[0];

        // Check the password
        const isPasswordCorrect = bcrypt.compareSync(req.body.password, user.password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Wrong password or username" });
        }

        // Generate JWT token including role with 30 days expiration
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET || "secretkey", {
            expiresIn: '30d'
        });

        // Exclude password from the response
        const { password, ...others } = user;

        // Set the token in the cookie
        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
            maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days in milliseconds
        }).status(200).json(others);

    } catch (error) {
        console.error("Error login:", error);
        res.status(500).json("Error during login");
    } finally {
        client.release();
    }
}

export const logout = (req, res) => {
    try { 
        res.clearCookie("accessToken", {
            secure: process.env.NODE_ENV === 'production', 
            sameSite: "none"  
        });
  
        res.status(200).json({ message: "User has been logged out." });
    } catch (error) { 
        console.error("Error during logout:", error);
        res.status(500).json({ message: "Failed to log out. Please try again." });
    }
};
