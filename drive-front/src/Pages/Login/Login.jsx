import React from 'react';
import loginImage from '../../assets/Portadas/Login2.png'; // Asegúrate de ajustar la ruta a la imagen que subiste
import { Link } from 'react-router-dom';


const Login = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-green-100">
            <div className="w-3/4 md:w-3/4 lg:w-1/2 flex items-center justify-center bg-white dark:bg-gray-800 dark:border-gray-700 rounded-2xl shadow-lg  ">
                <div className="hidden md:flex w-1/2 items-center justify-center bg-cover bg-center h-[500px] rounded-l-2xl" style={{ backgroundImage: `url(${loginImage})` }}>
                </div>
                <div className="w-full md:w-1/2 p-10 md:p-16  lg:p-16">
                    <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">Iniciar Sesión</h2>
                    <form className="space-y-6">
                        <div className="relative z-0 w-full group">
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                                placeholder=" "
                                required
                            />
                            <label
                                htmlFor="email"
                                className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Email
                            </label>
                        </div>
                        <div className="relative z-0 w-full group">
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                                placeholder=" "
                                required
                            />
                            <label
                                htmlFor="password"
                                className="absolute text-sm  text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                            >
                                Password
                            </label>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2.5 px-4 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-600 dark:focus:ring-green-500"
                        >
                            Iniciar Sesión
                        </button>
                    </form>
                    <Link to="/register">
                        <button
                            type="submit"
                            className="w-full mt-3 mb-3 bg-indigo-100 rounded-lg px-4 py-2  text-sm text-gray-800 tracking-wide font-semibold font-sans"
                        >

                            Registrate
                        </button>
                    </Link>

                </div>
            </div>
        </div>
    );
}


export default Login;