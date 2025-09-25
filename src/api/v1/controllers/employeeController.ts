import { NextFunction, Request, Response } from "express";
import * as employeeService from "../services/employeeService";
import { Employee } from "../models/employeeModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";

/**
 * Manages requests and reponses to retrieve all Employees
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const getAllEmployees = async (
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    try {
        const employees: Employee[] = await employeeService.getAllEmployees();

        res.status(HTTP_STATUS.OK).json({ 
            message: "Employees retrieved successfully", 
            data: employees 
        });
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Manages requests and reponses to retrieve one Employee
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const getEmployeeById = async (
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
            const employee: Employee = await employeeService.getEmployeeById(id);

            res.status(HTTP_STATUS.OK).json({
                message: "Employee retrieved successfully",
                data: employee
            });
        }
    } catch (error: unknown) {
        if ((error as Error).message.startsWith("Error finding employee")) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "ID doesn't match any existing employee"
            });
        } else {
            next(error);
        }
    }
};

/**
 * Manages requests, reponses, and validation to create an Employee
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const createEmployee = async (
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    try {
        const {
            name,
            position,
            department,
            email,
            phone,
            branchId
        }: {
            name: string | undefined;
            position: string | undefined;
            department: string | undefined;
            email: string | undefined;
            phone: string | undefined;
            branchId: number | undefined;
        } = req.body;

        if (!name) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Employee name is required"
            });
        } else if (!position) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Employee position is required"
            });
        } else if (!department) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Employee department is required"
            });
        } else if (!email) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Employee email is required"
            });
        } else if (!phone) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Employee phone number is required"
            });
        } else if (!branchId) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "Employee branch ID is required"
            });
        } else {
            const employeeData: {
                name: string;
                position: string;
                department: string;
                email: string;
                phone: string;
                branchId: number;
            } = {
                name,
                position,
                department,
                email,
                phone,
                branchId
            };

            const newEmployee: Employee = await employeeService.createEmployee(employeeData);

            res.status(HTTP_STATUS.CREATED).json({
                message: "Employee created successfully",
                data: newEmployee
            });
        }
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Manages requests and reponses to update an Employee
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const updateEmployee = async (
    req: Request, 
    res: Response, 
    next: NextFunction
): Promise<void> => {
    try {
        const updateData: {
            name?: string;
            position?: string;
            department?: string;
            email?: string;
            phone?: string;
            branchId?: number;
        } = req.body;

        const id: number = Number(req.params.id);

        if (isNaN(id)) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "ID must be a number"
            });
        } else {
            const updatedEmployee: Employee = await employeeService.updateEmployee(id, updateData);

            res.status(HTTP_STATUS.OK).json({
                message: "Employee updated successfully",
                data: updatedEmployee
            });
        }
    } catch (error: unknown) {
        if ((error as Error).message.startsWith("Error updating employee")) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "ID doesn't match any existing employee"
            });
        } else {
            next(error);
        }
    }
};

/**
 * Manages requests and reponses to delete an Employee
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const deleteEmployee = async (
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
            const confirmationMessage: string = await employeeService.deleteEmployee(id);

            res.status(HTTP_STATUS.OK).json({
                message: confirmationMessage
            });
        }
    } catch (error: unknown) {
        if ((error as Error).message.startsWith("Error deleting employee")) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "ID doesn't match any existing employee"
            });
        } else {
            next(error)
        }
    }
};