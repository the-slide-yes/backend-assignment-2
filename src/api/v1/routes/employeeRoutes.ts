import express, { Router } from "express";
import * as employeeController from "../controllers/employeeController";
import { validateRequest } from "../middleware/validate";
import { employeeSchemas } from "../validations/employeeValidation";

const router: Router = express.Router();

/**
 * @openapi
 * /employees:
 *   get:
 *     summary: Retrieves a list of employees
 *     tags: [Employees]
 *     responses:
 *       200:
 *         description: A list of Employees
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               employees:
 *                 $ref: '#/components/schemas/Employee'
 */
router.get("/employees", employeeController.getAllEmployees);

/**
 * @openapi
 * /employees/{id}:
 *   get:
 *     summary: Retrieves one employee with the specified ID
 *     tags: [Employees]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the desired employee
 *     responses:
 *       200:
 *         description: Retrieved employee successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       404:
 *         description: Employee not found
 */
router.get("/employees/:id", validateRequest(employeeSchemas.getById), employeeController.getEmployeeById);

/**
 * @openapi
 * /employees/onBranch/{branchId}:
 *   get:
 *     summary: Retrieves all employees on the specified branch
 *     tags: [Employees]
 *     parameters:
 *       - name: branchId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the branch
 *     responses:
 *       200:
 *         description: Retrieved employees successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               employees:
 *                 $ref: '#/components/schemas/Employee'
 */
router.get("/employees/onBranch/:branchId", validateRequest(employeeSchemas.getByBranchId), employeeController.getEmployeesByBranch);

/**
 * @openapi
 * /employees/inDepartment/{department}:
 *   get:
 *     summary: Retrieves all employees in the specified department
 *     tags: [Employees]
 *     parameters:
 *       - name: department
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The name of the department
 *     responses:
 *       200:
 *         description: Retrieved employees successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               employees:
 *                 $ref: '#/components/schemas/Employee'
 */
router.get("/employees/inDepartment/:department", validateRequest(employeeSchemas.getByDepartment), employeeController.getEmployeesByDepartment);

/**
 * @openapi
 * /employees:
 *   post:
 *     summary: Create a new Employee
 *     tags: [Employees]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - potition
 *               - department
 *               - email
 *               - phone
 *               - branchId
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 1
 *                 example: "Dave"
 *               position:
 *                 type: string
 *                 minLength: 1
 *                 example: "Salesperson"
 *               department:
 *                 type: string
 *                 minLength: 1
 *                 example: "Sales"
 *               email:
 *                 type: string
 *                 minLength: 1
 *                 example: "dave.henry@sadcompany.com"
 *               phone:
 *                 type: string
 *                 minLength: 1
 *                 example: "222-222-2222"
 *               branchId:
 *                 type: string
 *                 minLength: 1
 *                 example: "363153325754"
 *     responses:
 *       201:
 *         description: Employee created successfully
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Employee'
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Error'
 */
router.post("/employees", validateRequest(employeeSchemas.create), employeeController.createEmployee);

/**
 * @openapi
 * /employees/{id}:
 *   put:
 *     summary: Updates an employee with new data
 *     tags: [Employees]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the desired employee
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 1
 *                 example: "Dave"
 *               position:
 *                 type: string
 *                 minLength: 1
 *                 example: "Salesperson"
 *               department:
 *                 type: string
 *                 minLength: 1
 *                 example: "Sales"
 *               email:
 *                 type: string
 *                 minLength: 1
 *                 example: "dave.henry@sadcompany.com"
 *               phone:
 *                 type: string
 *                 minLength: 1
 *                 example: "222-222-2222"
 *               branchId:
 *                 type: string
 *                 minLength: 1
 *                 example: "363153325754"
 *     responses:
 *       200:
 *         description: Updated employee successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Employee'
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Error'
 *       404:
 *         description: Employee not found
 */
router.put("/employees/:id", validateRequest(employeeSchemas.update), employeeController.updateEmployee);

/**
 * @openapi
 * /employees/{id}:
 *   delete:
 *     summary: Deletes the employee with the specified ID
 *     tags: [Employees]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the desired employee
 *     responses:
 *       200:
 *         description: Deleted employee successfully
 *       404:
 *         description: Employee not found
 */
router.delete("/employees/:id", validateRequest(employeeSchemas.delete), employeeController.deleteEmployee);

export default router;