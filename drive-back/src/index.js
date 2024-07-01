import express from 'express';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/users.routes.js';
import carrerasRoutes from './routes/carreras.routes.js';
import destinosRoutes from './routes/destinos.routes.js';
import tiemposEsperaRoutes from './routes/tiemposEspera.routes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

//middlewares
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Credentials', true);
    next()

})
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
}
))
app.use(cookieParser())


app.use('/api/users', userRoutes)
app.use('/api/wait-times', tiemposEsperaRoutes)
app.use('/api/destinations', destinosRoutes)
app.use('/api/rides', carrerasRoutes)
app.use('/api/auth', authRoutes)


app.listen(8800, () => {
    console.log("API running on port 8800");
});
