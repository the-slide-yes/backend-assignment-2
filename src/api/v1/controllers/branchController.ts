import { NextFunction, Request, Response } from "express";
import * as branchService from "../services/branchService";
import { Branch } from "../models/branchModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { errorResponse, successResponse } from "../models/responseModel";

/**
 * Manages requests and reponses to retrieve all Branches
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const getAllBranches = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const branches: Branch[] = await branchService.getAllBranches();

        res.status(HTTP_STATUS.OK).json(
            successResponse(branches, "Branches retrieved successfully")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Manages requests and reponses to retrieve one branch
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const getBranchById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id: string = req.params.id;

        const branch: Branch = await branchService.getBranchById(id);

        res.status(HTTP_STATUS.OK).json(
            successResponse(branch, "Branch retrieved successfully")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Manages requests, reponses, and validation to create a branch
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const createBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const branchData: Omit<Branch, "id"> = req.body;

        const newBranch: Branch = await branchService.createBranch(branchData);

        res.status(HTTP_STATUS.CREATED).json(
            successResponse(newBranch, "Branch created successfully")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Manages requests and reponses to update a branch
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const updateBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const updateData: {
            name?: string;
            address?: string;
            phone?: string;
        } = req.body;

        const id: string = req.params.id;

        const updatedBranch: Branch = await branchService.updateBranch(id, updateData);

        res.status(HTTP_STATUS.OK).json(
            successResponse(updatedBranch, "Branch updated successfully")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Manages requests and reponses to delete a branch
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const deleteBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id: string = req.params.id;

        const confirmationMessage: string = await branchService.deleteBranch(id);

        res.status(HTTP_STATUS.OK).json(
            successResponse(confirmationMessage)
        );
    } catch (error: unknown) {
        next(error);
    }
};