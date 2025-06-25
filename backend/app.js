import express from 'express';
import syncRoutes from './routes/sync.routes.js'
import propertyRoutes from './routes/property.routes.js';


const app = express();
app.use(express.json());


app.use('/api', syncRoutes);
app.use('/api', propertyRoutes)



export default app;