import { Request, Response, NextFunction } from "express";
import { validateRequest } from "../src/api/v1/middleware/validate";
import { employeeSchemas } from "../src/api/v1/validations/employeeValidation";
import { MiddlewareFunction } from "../src/api/v1/types/express";
import { HTTP_STATUS } from "../src/constants/httpConstants";
import { branchSchemas } from "../src/api/v1/validations/branchValidation";

describe("Validation Middleware", () => {
    let mockReq: Partial<Request>;
    let mockRes: Partial<Response>;
    let mockNext: NextFunction;

    beforeEach(() => {
        mockReq = {
            body: {},
            params: {},
            query: {},
        };
        mockRes = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
        mockNext = jest.fn();
    });

    describe("employeeValidation", () => {
        describe("create", () => {
            it("should fail validation when name is empty string", () => {
                // Arrange
                mockReq.body = {
                    name: "",
                    position: "Egg",
                    department: "Poultry location",
                    phone: "222-222-2222",
                    email: "egg@chicken.com",
                    branchId: "yes",
                };
                const middleware: MiddlewareFunction = validateRequest(
                    employeeSchemas.create
                );

                // Act
                middleware(mockReq as Request, mockRes as Response, mockNext);

                // Assert
                expect(mockNext).not.toHaveBeenCalled();
                expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
                expect(mockRes.json).toHaveBeenCalledWith({
                    error: "Validation error: Body: Name cannot be empty",
                });
            });

            it("should fail validation when body is undefined", () => {
                // Arrange
                mockReq.body = undefined;
                const middleware: MiddlewareFunction = validateRequest(
                    employeeSchemas.create
                );

                // Act
                middleware(mockReq as Request, mockRes as Response, mockNext);

                // Assert
                expect(mockNext).not.toHaveBeenCalled();
                expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
                expect(mockRes.json).toHaveBeenCalledWith({
                    error: "Validation error: Body: Body is required",
                });
            });
        });

        describe("update", () => {
            it("should fail validation when name is empty string", () => {
                // Arrange
                mockReq.params = { id: "cone" };
                mockReq.body = {
                    name: "",
                    position: "Egg",
                    department: "Poultry location",
                    phone: "222-222-2222",
                    email: "egg@chicken.com",
                    branchId: "yes",
                };
                const middleware: MiddlewareFunction = validateRequest(
                    employeeSchemas.update
                );

                // Act
                middleware(mockReq as Request, mockRes as Response, mockNext);

                // Assert
                expect(mockNext).not.toHaveBeenCalled();
                expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
                expect(mockRes.json).toHaveBeenCalledWith({
                    error: "Validation error: Body: Name cannot be empty",
                });
            });
        });

        describe("getById", () => {
            it("should fail validation when id is empty string", () => {
                // Arrange
                mockReq.params = { id: "" };

                const middleware: MiddlewareFunction = validateRequest(
                    employeeSchemas.getById
                );

                // Act
                middleware(mockReq as Request, mockRes as Response, mockNext);

                // Assert
                expect(mockNext).not.toHaveBeenCalled();
                expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
                expect(mockRes.json).toHaveBeenCalledWith({
                    error: "Validation error: Params: Employee ID cannot be empty",
                });
            });
        });

        describe("getByBranch", () => {
            it("should fail validation when branchId is empty string", () => {
                // Arrange
                mockReq.params = { branchId: "" };

                const middleware: MiddlewareFunction = validateRequest(
                    employeeSchemas.getByBranchId
                );

                // Act
                middleware(mockReq as Request, mockRes as Response, mockNext);

                // Assert
                expect(mockNext).not.toHaveBeenCalled();
                expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
                expect(mockRes.json).toHaveBeenCalledWith({
                    error: "Validation error: Params: Branch ID cannot be empty",
                });
            });
        });

        describe("getByDepartment", () => {
            it("should fail validation when department is empty string", () => {
                // Arrange
                mockReq.params = { department: "" };

                const middleware: MiddlewareFunction = validateRequest(
                    employeeSchemas.getByDepartment
                );

                // Act
                middleware(mockReq as Request, mockRes as Response, mockNext);

                // Assert
                expect(mockNext).not.toHaveBeenCalled();
                expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
                expect(mockRes.json).toHaveBeenCalledWith({
                    error: "Validation error: Params: Department cannot be empty",
                });
            });
        });

        describe("delete", () => {
            it("should fail validation when id is empty string", () => {
                // Arrange
                mockReq.params = { id: "" };

                const middleware: MiddlewareFunction = validateRequest(
                    employeeSchemas.delete
                );

                // Act
                middleware(mockReq as Request, mockRes as Response, mockNext);

                // Assert
                expect(mockNext).not.toHaveBeenCalled();
                expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
                expect(mockRes.json).toHaveBeenCalledWith({
                    error: "Validation error: Params: Employee ID cannot be empty",
                });
            });
        });

    });

    describe("branchValidation", () => {
        describe("create", () => {
            it("should fail validation when name is empty string", () => {
                // Arrange
                mockReq.body = {
                    name: "",
                    address: "inside a lamp",
                    phone: "222-222-2222",
                };
                const middleware: MiddlewareFunction = validateRequest(
                    branchSchemas.create
                );

                // Act
                middleware(mockReq as Request, mockRes as Response, mockNext);

                // Assert
                expect(mockNext).not.toHaveBeenCalled();
                expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
                expect(mockRes.json).toHaveBeenCalledWith({
                    error: "Validation error: Body: Name cannot be empty",
                });
            });
        });

        describe("update", () => {
            it("should fail validation when name is empty string", () => {
                // Arrange
                mockReq.params = { id: "cone" };
                mockReq.body = {
                    name: "",
                    address: "inside a lamp",
                    phone: "222-222-2222",
                };
                const middleware: MiddlewareFunction = validateRequest(
                    branchSchemas.update
                );

                // Act
                middleware(mockReq as Request, mockRes as Response, mockNext);

                // Assert
                expect(mockNext).not.toHaveBeenCalled();
                expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
                expect(mockRes.json).toHaveBeenCalledWith({
                    error: "Validation error: Body: Name cannot be empty",
                });
            });
        });

        describe("get", () => {
            it("should fail validation when id is empty string", () => {
                // Arrange
                mockReq.params = { id: "" };

                const middleware: MiddlewareFunction = validateRequest(
                    branchSchemas.get
                );

                // Act
                middleware(mockReq as Request, mockRes as Response, mockNext);

                // Assert
                expect(mockNext).not.toHaveBeenCalled();
                expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
                expect(mockRes.json).toHaveBeenCalledWith({
                    error: "Validation error: Params: Branch ID cannot be empty",
                });
            });
        });

        describe("delete", () => {
            it("should fail validation when id is empty string", () => {
                // Arrange
                mockReq.params = { id: "" };

                const middleware: MiddlewareFunction = validateRequest(
                    branchSchemas.delete
                );

                // Act
                middleware(mockReq as Request, mockRes as Response, mockNext);

                // Assert
                expect(mockNext).not.toHaveBeenCalled();
                expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
                expect(mockRes.json).toHaveBeenCalledWith({
                    error: "Validation error: Params: Branch ID cannot be empty",
                });
            });
        });
    });
});