import { NextFunction, Request, Response } from "express";
import * as branchService from "../services/branchService";
import { Branch } from "../models/branchModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";

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

        res.status(HTTP_STATUS.OK).json({ 
            message: "Branches retrieved successfully", 
            data: branches 
        });
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
        const id: number = Number(req.params.id);

        if (isNaN(id)) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "ID must be a number"
            });
        } else {
            const branch: Branch = await branchService.getBranchById(id);

            res.status(HTTP_STATUS.OK).json({
                message: "Branch retrieved successfully",
                data: branch
            });
        }
    } catch (error: unknown) {
        if ((error as Error).message.startsWith("Error finding branch")) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "ID doesn't match any existing branch"
            });
        } else {
            next(error);
        }
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
        const {
            name,
            address,
            phone,
        }: {
            name: string | undefined;
            address: string | undefined;
            phone: string | undefined;
        } = req.body;

        if (!name) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Branch name is required"
            });
        } else if (!address) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Branch address is required"
            });
        } else if (!phone) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Branch phone number is required"
            });
        } else {
            const branchData: {
                name: string;
                address: string;
                phone: string;
            } = {
                name,
                address,
                phone,
            };

            const newBranch: Branch = await branchService.createBranch(branchData);

            res.status(HTTP_STATUS.CREATED).json({
                message: "Branch created successfully",
                data: newBranch
            });
        }
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

        const id: number = Number(req.params.id);

        if (isNaN(id)) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "ID must be a number"
            });
        } else {
            const updatedBranch: Branch = await branchService.updateBranch(id, updateData);

            res.status(HTTP_STATUS.OK).json({
                message: "Branch updated successfully",
                data: updatedBranch
            });
        }
    } catch (error: unknown) {
        if ((error as Error).message.startsWith("Error updating branch")) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "ID doesn't match any existing branch"
            });
        } else {
            next(error);
        }
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
        const id: number = Number(req.params.id);

        if (isNaN(id)) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "ID must be a number"
            });
        } else {
            const confirmationMessage: string = await branchService.deleteBranch(id);

            res.status(HTTP_STATUS.OK).json({
                message: confirmationMessage
            });
        }
    } catch (error: unknown) {
        if ((error as Error).message.startsWith("Error deleting branch")) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "ID doesn't match any existing branch"
            });
        } else {
            next(error)
        }
    }
};