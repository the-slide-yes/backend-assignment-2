import express, { Router } from "express";
import * as employeeController from "../controllers/employeeController";
import { validateRequest } from "../middleware/validate";
import { employeeSchemas } from "../validations/employeeValidation";

const router: Router = express.Router();

router.get("/employees", employeeController.getAllEmployees);
router.get("/employees/:id", validateRequest(employeeSchemas.getById), employeeController.getEmployeeById);
router.get("/employees/onBranch/:branchId", validateRequest(employeeSchemas.getByBranch), employeeController.getEmployeesByBranch);
router.get("/employees/inDepartment/:department", validateRequest(employeeSchemas.getByDepartment), employeeController.getEmployeesByDepartment);
router.post("/employees", validateRequest(employeeSchemas.create), employeeController.createEmployee);
router.put("/employees/:id", validateRequest(employeeSchemas.update), employeeController.updateEmployee);
router.delete("/employees/:id", validateRequest(employeeSchemas.delete), employeeController.deleteEmployee);

export default router;