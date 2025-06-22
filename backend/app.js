import express from 'express';
import syncRoutes from './routes/sync.routes.js'


const app = express();
app.use(express.json());


app.use('/api', syncRoutes);



export default app;