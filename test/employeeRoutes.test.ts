import request from "supertest";
import app from "../src/app";
import * as employeeController from "../src/api/v1/controllers/employeeController";
import { HTTP_STATUS } from "../src/constants/httpConstants";
import { Employee } from "../src/api/v1/models/employeeModel";

jest.mock("../src/api/v1/controllers/employeeController", () => ({
    getAllEmployees: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    getEmployeeById: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    createEmployee: jest.fn((req, res) => res.status(HTTP_STATUS.CREATED).send()),
    updateEmployee: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    deleteEmployee: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
}));

describe("Employee API Endpoints", () => {
    it("should call getAllEmployees controller", async () => {
        await request(app).get("/api/v1/employees");
        expect(employeeController.getAllEmployees).toHaveBeenCalled();
    });

    it("should call getAllEmployees controller", async () => {
        await request(app).get("/api/v1/employees/1");
        expect(employeeController.getEmployeeById).toHaveBeenCalled();
    });

    it("should call createEmployee controller", async () => {
        const mockEmployee: Omit<Employee, "id"> = {
            name: "Chad McNotsad",
            department: "Advertisement",
            position: "Model",
            phone: "204-222-2222",
            email: "chadnotsad@model.roofingcompany.ca",
            branchId: 3
        };
        await request(app).post("/api/v1/employees").send(mockEmployee);
        expect(employeeController.createEmployee).toHaveBeenCalled();
    });

    it("should call updateEmployee controller", async () => {
        const mockEmployee: Omit<Employee, "id"> = {
            name: "Chad McNotsad",
            department: "Advertisement",
            position: "Model",
            phone: "204-222-2222",
            email: "chadnotsad@model.roofingcompany.ca",
            branchId: 3
        };
        await request(app).put("/api/v1/employees/1").send(mockEmployee);
        expect(employeeController.updateEmployee).toHaveBeenCalled();
    });

    it("should call deleteEmployee controller", async () => {
        await request(app).delete("/api/v1/employees/1");
        expect(employeeController.deleteEmployee).toHaveBeenCalled();
    });
});