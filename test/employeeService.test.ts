import * as employeeService from "../src/api/v1/services/employeeService";
import * as firestoreRepository from "../src/api/v1/repositories/firestoreRepository";
import { Employee } from "../src/api/v1/models/employeeModel";
import { DocumentData, DocumentSnapshot, QueryDocumentSnapshot, QuerySnapshot } from "node_modules/firebase-admin/lib/firestore";

// Mock the repository module
// jest.mock replaces the entire module with an auto-mocked version
jest.mock("../src/api/v1/repositories/firestoreRepository");

describe("Employee Service", () => {
    const mockEmployeeData: Omit<Employee, "id"> = {
        name: "Chad McNotsad",
        department: "Advertisement",
        position: "Model",
        phone: "204-222-2222",
        email: "chadnotsad@model.roofingcompany.ca",
        branchId: "3",
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });


    describe("getAllEmployees", () => {
        it("should return all employees successfully", async () => {
            // Arrange
            const mockEmployee: Employee = {
                id: "1",
                ...mockEmployeeData
            };
            const expectedEmployees: Employee[] = [mockEmployee];

            (firestoreRepository.getDocuments as jest.Mock).mockResolvedValue(
                {
                    docs: [{
                        id: mockEmployee.id,
                        data: () => mockEmployeeData,
                    }]
                }
            );

            // Act
            const result: Employee[] = await employeeService.getAllEmployees();

            // Assert
            expect(firestoreRepository.getDocuments).toHaveBeenCalledWith(
                "employees",
            );
            expect(result).toMatchObject(expectedEmployees);
        });
    });

    describe("getEmployeesByBranchId", () => {
        it("should return all employees successfully", async () => {
            // Arrange
            const mockEmployee: Employee = {
                id: "1",
                ...mockEmployeeData
            };
            const expectedEmployees: Employee[] = [mockEmployee];

            (firestoreRepository.getDocumentsByFieldValues as jest.Mock).mockResolvedValue(
                {
                    docs: [{
                        id: mockEmployee.id,
                        data: () => mockEmployeeData,
                    }]
                }
            );

            const mockBranchId: string = "Orange";

            // Act
            const result: Employee[] = await employeeService.getEmployeesByBranchId(mockBranchId);

            // Assert
            expect(firestoreRepository.getDocumentsByFieldValues).toHaveBeenCalledWith(
                "employees",
                [{
                    fieldName: "branchId",
                    fieldValue: mockBranchId
                }],
            );
            expect(result).toMatchObject(expectedEmployees);
        });
    });

    describe("getEmployeesByDepartment", () => {
        it("should return all employees successfully", async () => {
            // Arrange
            const mockEmployee: Employee = {
                id: "1",
                ...mockEmployeeData
            };
            const expectedEmployees: Employee[] = [mockEmployee];

            (firestoreRepository.getDocumentsByFieldValues as jest.Mock).mockResolvedValue(
                {
                    docs: [{
                        id: mockEmployee.id,
                        data: () => mockEmployeeData,
                    }]
                }
            );

            const mockDepartment: string = "Orange";

            // Act
            const result: Employee[] = await employeeService.getEmployeesByDepartment(mockDepartment);

            // Assert
            expect(firestoreRepository.getDocumentsByFieldValues).toHaveBeenCalledWith(
                "employees",
                [{
                    fieldName: "department",
                    fieldValue: mockDepartment
                }],
            );
            expect(result).toMatchObject(expectedEmployees);
        });
    });

    describe("getEmployeeById", () => {
        it("should return an employee successfully", async () => {
            // Arrange
            const mockDocumentId: string = "test-employee-id";
            const mockEmployee: Employee = {
                id: mockDocumentId,
                ...mockEmployeeData,
            };

            (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue(
                {
                    id: mockDocumentId,
                    data: () => mockEmployeeData,
                }
            );

            // Act
            const employee: Employee = await employeeService.getEmployeeById(mockDocumentId);

            // Assert
            expect(firestoreRepository.getDocumentById).toHaveBeenCalledWith(
                "employees",
                mockDocumentId
            );
            expect(employee).toMatchObject(mockEmployee);
        });
    });

    describe("createEmployee", () => {
        it("should create an employee successfully", async () => {
            // Arrange
            const mockDocumentId: string = "test-employee-id";

            (firestoreRepository.createDocument as jest.Mock).mockResolvedValue(
                mockDocumentId
            );

            // Act
            const result: Employee = await employeeService.createEmployee(mockEmployeeData);

            // Assert
            expect(firestoreRepository.createDocument).toHaveBeenCalledWith(
                "employees",
                expect.objectContaining({
                    name: mockEmployeeData.name,
                    department: mockEmployeeData.department,
                    position: mockEmployeeData.position,
                    phone: mockEmployeeData.phone,
                    email: mockEmployeeData.email,
                    branchId: mockEmployeeData.branchId,
                })
            );
            expect(result.id).toBe(mockDocumentId);
            expect(result.name).toBe(mockEmployeeData.name);
        });
    });

    describe("updateEmployee", () => {
        it("should update an employee successfully", async () => {
            // Arrange
            const mockDocumentId: string = "test-employee-id";
            const mockEmployee: Employee = {
                id: mockDocumentId,
                ...mockEmployeeData,
            };
            const mockUpdateData: Partial<Employee> = {
                name: "Chad Jeremy McNotsad",
            };
            const mockUpdatedEmployee: Employee = {
                ...mockEmployee,
                ...mockUpdateData,
            };

            jest.spyOn(employeeService, "getEmployeeById").mockResolvedValue(mockEmployee);

            (firestoreRepository.updateDocument as jest.Mock).mockResolvedValue(
                undefined
            );

            // Act
            const updatedEmployee: Employee = await employeeService.updateEmployee(mockDocumentId, mockUpdateData);

            // Assert
            expect(employeeService.getEmployeeById).toHaveBeenCalledWith(mockDocumentId);
            expect(firestoreRepository.updateDocument).toHaveBeenCalledWith(
                "employees",
                mockDocumentId,
                mockUpdatedEmployee,
            );
            expect(updatedEmployee).toMatchObject(mockUpdatedEmployee);
        });
    });

    describe("deleteEmployee", () => {
        it("should delete an employee successfully", async () => {
            // Arrange
            const mockDocumentId: string = "test-employee-id";
            const mockEmployee: Employee = {
                id: mockDocumentId,
                ...mockEmployeeData,
            };

            jest.spyOn(employeeService, "getEmployeeById").mockResolvedValue(mockEmployee);

            (firestoreRepository.deleteDocument as jest.Mock).mockResolvedValue(
                undefined
            );

            // Act
            await employeeService.deleteEmployee(mockDocumentId);

            // Assert
            expect(employeeService.getEmployeeById).toHaveBeenCalledWith(mockDocumentId);
            expect(firestoreRepository.deleteDocument).toHaveBeenCalledWith(
                "employees",
                mockDocumentId
            );
        });
    });
});