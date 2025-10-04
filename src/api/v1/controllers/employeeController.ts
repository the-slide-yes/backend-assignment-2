import { NextFunction, Request, Response } from "express";
import * as employeeService from "../services/employeeService";
import { Employee } from "../models/employeeModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";
import { errorResponse, successResponse } from "../models/responseModel";

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

        res.status(HTTP_STATUS.OK).json(
            successResponse(employees, "Employees successfully retrieved")
        );
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
        const id: string = req.params.id;

        const employee: Employee = await employeeService.getEmployeeById(id);

        res.status(HTTP_STATUS.OK).json(
            successResponse(employee, "Employee retrieved successfully")
        );
    } catch (error: unknown) {
        if ((error as Error).message.startsWith("Error finding employee")) {
            res.status(HTTP_STATUS.BAD_REQUEST).json(
                errorResponse("ID doesn't match any existing employee")
            );
        } else {
            next(error);
        }
    }
};

/**
 * Manages requests and reponses to retrieve all Employees on a branch
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const getEmployeesByBranch = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const branchId: string = req.params.branchId;

        const employees: Employee[] = await employeeService.getEmployeesByBranch(branchId);

        res.status(HTTP_STATUS.OK).json(
            successResponse(employees, "Employees retrieved successfully")
        );
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Manages requests and reponses to retrieve all Employees in a department
 * @param req - The express Request
 * @param res  - The express Response
 * @param next - The express middleware chaining function
 */
export const getEmployeesByDepartment = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const department: string = req.params.department;

        const employees: Employee[] = await employeeService.getEmployeesByDepartment(department);

        res.status(HTTP_STATUS.OK).json(
            successResponse(employees, "Employees retrieved successfully")
        );
    } catch (error: unknown) {
        next(error);
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
        const employeeData: Omit<Employee, "id"> = req.body;

        const newEmployee: Employee = await employeeService.createEmployee(employeeData);

        res.status(HTTP_STATUS.CREATED).json(
            successResponse(newEmployee, "Employee created successfully")
        );
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

        const id: string = req.params.id;

        const updatedEmployee: Employee = await employeeService.updateEmployee(id, updateData);

        res.status(HTTP_STATUS.OK).json(
            successResponse(updatedEmployee, "Employee updated successfully")
        );
    } catch (error: unknown) {
        if ((error as Error).message.startsWith("Error updating employee")) {
            res.status(HTTP_STATUS.BAD_REQUEST).json(
                errorResponse("ID doesn't match any existing employee")
            );
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
        const id: string = req.params.id;

        const confirmationMessage: string = await employeeService.deleteEmployee(id);

        res.status(HTTP_STATUS.OK).json(
            successResponse(confirmationMessage)
        );
    } catch (error: unknown) {
        if ((error as Error).message.startsWith("Error deleting employee")) {
            res.status(HTTP_STATUS.BAD_REQUEST).json(
                errorResponse("ID doesn't match any existing employee")
            );
        } else {
            next(error)
        }
    }
};