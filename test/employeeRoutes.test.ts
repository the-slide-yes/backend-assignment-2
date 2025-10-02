import request from "supertest";
import app from "../src/app";
import * as employeeController from "../src/api/v1/controllers/employeeController";
import { HTTP_STATUS } from "../src/constants/httpConstants";
import { Employee } from "../src/api/v1/models/employeeModel";

jest.mock("../src/api/v1/controllers/employeeController", () => ({
    getAllEmployees: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    getEmployeeById: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    getEmployeesByBranch: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    getEmployeesByDepartment: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    createEmployee: jest.fn((req, res) => res.status(HTTP_STATUS.CREATED).send()),
    updateEmployee: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    deleteEmployee: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
}));

describe("Employee Routes", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /api/vi/employees/", () => {
        it("should call getAllEmployees controller", async () => {
            // Act
            await request(app).get("/api/v1/employees");
            // Assert
            expect(employeeController.getAllEmployees).toHaveBeenCalled();
        });
    });
    
    describe("GET /api/vi/employees/:id", () => {
        it("should call getEmployeeById controller", async () => {
            // Act
            await request(app).get("/api/v1/employees/1");
            // Assert
            expect(employeeController.getEmployeeById).toHaveBeenCalled();
        });
    });

    describe("GET /api/vi/employees/onBranch/:branchId", () => {
        it("should call getEmployeeByBranch controller", async () => {
            // Act
            await request(app).get("/api/v1/employees/onBranch/1");
            // Assert
            expect(employeeController.getEmployeesByBranch).toHaveBeenCalled();
        });
    });

    describe("GET /api/vi/employees/inDepartment/:department", () => {
        it("should call getEmployeeByDepartment controller", async () => {
            // Act
            await request(app).get("/api/v1/employees/inDepartment/1");
            // Assert
            expect(employeeController.getEmployeesByDepartment).toHaveBeenCalled();
        });
    });

    describe("POST /api/vi/employees/", () => {
        it("should call createEmployee controller with valid data", async () => {
            // Arrange
            const mockEmployee: Omit<Employee, "id"> = {
                name: "Chad McNotsad",
                department: "Advertisement",
                position: "Model",
                phone: "204-222-2222",
                email: "chadnotsad@model.roofingcompany.ca",
                branchId: 3
            };
            // Act
            await request(app).post("/api/v1/employees").send(mockEmployee);
            // Assert
            expect(employeeController.createEmployee).toHaveBeenCalled();
        });
    });

    describe("PUT /api/vi/employees/:id", () => {
        it("should call updateEmployee controller with valid data", async () => {
            // Arrange
            const mockEmployee: Omit<Employee, "id"> = {
                name: "Chad McNotsad",
                department: "Advertisement",
                position: "Model",
                phone: "204-222-2222",
                email: "chadnotsad@model.roofingcompany.ca",
                branchId: 3
            };
            // Act
            await request(app).put("/api/v1/employees/1").send(mockEmployee);
            // Assert
            expect(employeeController.updateEmployee).toHaveBeenCalled();
        });
    });

    describe("DELETE /api/vi/employees/:id", () => {
        it("should call deleteEmployee controller with valid data", async () => {
            // Act
            await request(app).delete("/api/v1/employees/1");
            // Assert
            expect(employeeController.deleteEmployee).toHaveBeenCalled();
        });
    });
});