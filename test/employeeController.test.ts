import * as employeeController from "../src/api/v1/controllers/employeeController";
import { HTTP_STATUS } from "../src/constants/httpConstants";
import { Employee } from "../src/api/v1/models/employeeModel";
import * as employeeService from "../src/api/v1/services/employeeService";
import { NextFunction, Request, Response } from "express";

jest.mock("../src/api/v1/services/employeeService");

describe("Employee controller", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        mockReq = { params: {}, body: {} };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
        mockNext = jest.fn();
    });

    describe("getAllEmployees", () => {
        it("should get all employees", async () => {
            // Arrange
            const mockEmployees: Employee[] = [
                {
                    id: "1",
                    name: "Chad McNotsad",
                    department: "Advertisement",
                    position: "Model",
                    phone: "204-222-2222",
                    email: "chadnotsad@model.roofingcompany.ca",
                    branchId: "3"
                },
            ];
            (employeeService.getAllEmployees as jest.Mock).mockReturnValue(mockEmployees);

            // Act
            await employeeController.getAllEmployees(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employees successfully retrieved",
                data: mockEmployees,
                status: "success",
            });
        });
    });

    describe("getEmployeeById", () => {
        it("should get one employee", async () => {
            // Arrange
            const mockEmployee: Employee = {
                id: "1",
                name: "Chad McNotsad",
                department: "Advertisement",
                position: "Model",
                phone: "204-222-2222",
                email: "chadnotsad@model.roofingcompany.ca",
                branchId: "3"
            };
            mockReq.params = { id: "1" };
            (employeeService.getEmployeeById as jest.Mock).mockReturnValue(mockEmployee);

            // Act
            await employeeController.getEmployeeById(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employee retrieved successfully",
                data: mockEmployee,
                status: "success",
            });
        });
    });

    describe("getEmployeeByBranch", () => {
        it("should get employees", async () => {
            // Arrange
            const mockEmployees: Employee[] = [
                {
                    id: "1",
                    name: "Chad McNotsad",
                    department: "Advertisement",
                    position: "Model",
                    phone: "204-222-2222",
                    email: "chadnotsad@model.roofingcompany.ca",
                    branchId: "3"
                },
            ];
            mockReq.params = { branchId: "3" };
            (employeeService.getEmployeesByBranch as jest.Mock).mockReturnValue(mockEmployees);

            // Act
            await employeeController.getEmployeesByBranch(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employees retrieved successfully",
                data: mockEmployees,
                status: "success",
            });
        });
    });

    describe("getEmployeeByDepartment", () => {
        it("should get employees", async () => {
            // Arrange
            const mockEmployees: Employee[] = [
                {
                    id: "1",
                    name: "Chad McNotsad",
                    department: "Advertisement",
                    position: "Model",
                    phone: "204-222-2222",
                    email: "chadnotsad@model.roofingcompany.ca",
                    branchId: "3"
                },
            ];
            mockReq.params = { department: "Advertisement" };
            (employeeService.getEmployeesByDepartment as jest.Mock).mockReturnValue(mockEmployees);

            // Act
            await employeeController.getEmployeesByDepartment(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employees retrieved successfully",
                data: mockEmployees,
                status: "success",
            });
        });
    });

    describe("createEmployee", () => {
        it("should handle successful creation", async () => {
            // Arrange
            const mockBody: Omit<Employee, "id"> = {
                name: "Chad McNotsad",
                department: "Advertisement",
                position: "Model",
                phone: "204-222-2222",
                email: "chadnotsad@model.roofingcompany.ca",
                branchId: "3"
            };

            const mockEmployee: Employee = {
                id: "1",
                ...mockBody
            };

            mockReq.body = mockBody;
            (employeeService.createEmployee as jest.Mock).mockReturnValue(mockEmployee);

            // Act
            await employeeController.createEmployee(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employee created successfully",
                data: mockEmployee,
                status: "success",
            });
        });
    });

    describe("updateEmployee", () => {
        it("should handle updating successfully", async () => {
            // Arrange
            const mockBody: Partial<Employee> = {
                position: "Supermodel",
            };

            const mockEmployee: Employee = {
                id: "1",
                name: "Chad McNotsad",
                department: "Advertisement",
                position: "Model",
                phone: "204-222-2222",
                email: "chadnotsad@model.roofingcompany.ca",
                branchId: "3",
                ...mockBody
            };

            mockReq.body = mockBody;
            mockReq.params = { id: "1" };
            (employeeService.updateEmployee as jest.Mock).mockReturnValue(mockEmployee);

            // Act
            await employeeController.updateEmployee(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Employee updated successfully",
                data: mockEmployee,
                status: "success",
            });
        });
    });

    describe("deleteEmployee", () => {
        it("should handle successful deletion", async () => {
            // Arrange
            const mockConfirmation: string = "Yipee!";

            mockReq.params = { id: "1" };
            (employeeService.deleteEmployee as jest.Mock).mockReturnValue(mockConfirmation);

            // Act
            await employeeController.deleteEmployee(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                data: mockConfirmation,
                status: "success",
            });
        });
    });
});