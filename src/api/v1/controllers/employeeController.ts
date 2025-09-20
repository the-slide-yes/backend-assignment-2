import { Request, Response } from "express";
import * as employeeService from "../services/employeeService";
import { Employee } from "../models/employeeModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";

export const getAllEmployees = async (req: Request, res: Response): Promise<void> => {
    try {
        const employees: Employee[] = await employeeService.getAllEmployees();

        res.status(HTTP_STATUS.OK).json({ 
            message: "Got all employees", 
            data: employees 
        });
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Failed to get employees"
        });
    }
};

export const getEmployeeById = async (req: Request, res: Response): Promise<void> => {
    try {
        const id: number = Number(req.params.id);

        if (isNaN(id)) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "ID must be a number"
            });
        } else {
            const employee: Employee = await employeeService.getEmployeeById(id);

            res.status(HTTP_STATUS.OK).json({
                message: `Got employee with id: ${id}`,
                data: employee
            });
        }
    } catch (error) {
        if ((error as Error).message.startsWith("Error finding employee")) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "ID doesn't match any existing employee"
            });
        } else {
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                message: "Failed to get employees"
            });
        }
    }
};

export const createEmployee = async (req: Request, res: Response): Promise<void> => {
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
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Failed to create employee"
        });
    }
};

export const updateEmployee = async (req: Request, res: Response): Promise<void> => {
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
    } catch (error) {
        if ((error as Error).message.startsWith("Error updating employee")) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "ID doesn't match any existing employee"
            });
        } else {
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                message: "Failed to update employee"
            });
        }
    }
};

export const deleteEmployee = async (req: Request, res: Response): Promise<void> => {
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
    } catch (error) {
        if ((error as Error).message.startsWith("Error finding employee")) {
            res.status(HTTP_STATUS.BAD_REQUEST).json({
                message: "ID doesn't match any existing employee"
            });
        } else {
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
                message: "Failed to delete employee"
            });
        }
    }
};