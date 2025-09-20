import express, { Router } from "express";
import { 
    createEmployee, 
    deleteEmployee, 
    getAllEmployees, 
    getEmployeeById, 
    updateEmployee 
} from "../controllers/employeeController";


const router: Router = express.Router();

router.get("/employees", getAllEmployees);
router.get("/employees/:id", getEmployeeById);
router.post("/employees", createEmployee);
router.put("/employees/:id", updateEmployee);
router.delete("/employees/:id", deleteEmployee);

export default router;