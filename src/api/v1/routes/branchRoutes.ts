import express, { Router } from "express";
import * as branchController from "../controllers/branchController";
import { validateRequest } from "../middleware/validate";
import { branchSchemas } from "../validations/branchValidation";

const router: Router = express.Router();

/**
 * @openapi
 * /branches:
 *   get:
 *     summary: Retrieves a list of branches
 *     tags: [Branches]
 *     responses:
 *       200:
 *         description: A list of Branches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               branchs:
 *                 $ref: '#/components/schemas/Branch'
 */
router.get("/branches", branchController.getAllBranches);

/**
 * @openapi
 * /branches/{id}:
 *   get:
 *     summary: Retrieves one branch with the specified ID
 *     tags: [Branches]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the desired branch
 *     responses:
 *       200:
 *         description: Retrieved branch successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Branch'
 *       404:
 *         description: Branch not found
 */
router.get("/branches/:id", validateRequest(branchSchemas.get), branchController.getBranchById);

/**
 * @openapi
 * /branches:
 *   post:
 *     summary: Create a new Branch
 *     tags: [Branches]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - address
 *               - phone
 *             properties:
 *               name:
 *                 type: string
 *                 minLength: 1
 *                 example: "Scranton Branch"
 *               address:
 *                 type: string
 *                 minLength: 1
 *                 example: "308 Negra Arroyo Lane, Albuquerque, New Mexico"
 *               phone:
 *                 type: string
 *                 minLength: 1
 *                 example: "222-222-2222"
 *     responses:
 *       201:
 *         description: Branch created successfully
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Branch'
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Error'
 */
router.post("/branches", validateRequest(branchSchemas.create), branchController.createBranch);

/**
 * @openapi
 * /branches/{id}:
 *   put:
 *     summary: Updates a branch with new data
 *     tags: [Branches]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the desired branch
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
 *                 example: "Scranton Branch"
 *               address:
 *                 type: string
 *                 minLength: 1
 *                 example: "308 Negra Arroyo Lane, Albuquerque, New Mexico"
 *               phone:
 *                 type: string
 *                 minLength: 1
 *                 example: "222-222-2222"
 *     responses:
 *       200:
 *         description: Updated branch successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Branch'
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/Error'
 *       404:
 *         description: Branch not found
 */
router.put("/branches/:id", validateRequest(branchSchemas.update), branchController.updateBranch);

/**
 * @openapi
 * /branches/{id}:
 *   delete:
 *     summary: Deletes the branch with the specified ID
 *     tags: [Branches]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the desired branch
 *     responses:
 *       200:
 *         description: Deleted branch successfully
 *       404:
 *         description: Branch not found
 */
router.delete("/branches/:id", validateRequest(branchSchemas.delete), branchController.deleteBranch);

export default router;