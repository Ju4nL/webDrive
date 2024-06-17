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
app.use(express.json())
app.use(cors())
app.use(cookieParser())


app.use('/api/users', userRoutes)
app.use('/api/tiemposEspera', tiemposEsperaRoutes)
app.use('/api/destinos', destinosRoutes)
app.use('/api/carreras', carrerasRoutes)
app.use('/api/auth', authRoutes)
 

app.listen(8800, () => {
    console.log("API running on port 8800");
});
