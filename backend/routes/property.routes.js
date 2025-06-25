import express from 'express';
import { getAllProperties, createProperty, getPropertyByCity, getPropertyById, updatePropertyById, deletePropertyById } from '../controllers/property.controller.js';

const router = express.Router();

router.get('/properties', getAllProperties);
router.get('/properties/:id', getPropertyById)
router.get('/properties/city/:city', getPropertyByCity)
router.post('/properties', createProperty)
router.put('/properties/:id', updatePropertyById)
router.delete('/properties/:id', deletePropertyById)


export default router;