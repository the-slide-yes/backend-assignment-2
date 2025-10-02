import express, { Router } from "express";
import * as branchController from "../controllers/branchController";
import { validateRequest } from "../middleware/validate";
import { branchSchemas } from "../validations/branchValidation";

const router: Router = express.Router();

router.get("/branches", branchController.getAllBranches);
router.get("/branches/:id", validateRequest(branchSchemas.get), branchController.getBranchById);
router.post("/branches", validateRequest(branchSchemas.create), branchController.createBranch);
router.put("/branches/:id", validateRequest(branchSchemas.update), branchController.updateBranch);
router.delete("/branches/:id", validateRequest(branchSchemas.delete), branchController.deleteBranch);

export default router;