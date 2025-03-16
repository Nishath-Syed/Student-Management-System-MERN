import express from 'express';
import {
    registerStudent,
    loginStudent,
    logoutStudent,
    getAllStudents,
    getPersonal,
    editStudent,
    getStudentById,
    deleteStudent,
} from '../controllerss/userController.js'; 

const router = express.Router(); // Create a router

router.post('/login', loginStudent);               // Student login
router.post('/logout', logoutStudent);             // Student logout
router.post('/register', registerStudent);         // Register new student
router.get('/all', getAllStudents);                // Get all students
router.get('/get/:id', getStudentById);            // Get student by ID
router.get('/personal/:id', getPersonal);          // Get student's personal details             
router.put('/edit/:id', editStudent);              // Edit student information
router.delete('/delete/:id', deleteStudent);       // Delete student by ID

export default router; // Export the router as default
