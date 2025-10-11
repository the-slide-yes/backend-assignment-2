import * as branchService from "../src/api/v1/services/branchService";
import * as firestoreRepository from "../src/api/v1/repositories/firestoreRepository";
import { Branch } from "../src/api/v1/models/branchModel";
import { DocumentData } from "node_modules/firebase-admin/lib/firestore";

// Mock the repository module
// jest.mock replaces the entire module with an auto-mocked version
jest.mock("../src/api/v1/repositories/firestoreRepository");

describe("Branch Service", () => {
    const mockBranchData: Omit<Branch, "id"> = {
        name: "Anderson Branch",
        address: "The Matrix",
        phone: "204-222-2222",
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });


    describe("getAllBranches", () => {
        it("should return all branches successfully", async () => {
            // Arrange
            const mockBranch: Branch = {
                id: "1",
                ...mockBranchData
            };
            const expectedBranches: Branch[] = [mockBranch];

            (firestoreRepository.getDocuments as jest.Mock).mockResolvedValue(
                {
                    docs: [{
                        id: mockBranch.id,
                        data: (): DocumentData => mockBranchData,
                    }]
                }
            );

            // Act
            const result: Branch[] = await branchService.getAllBranches();

            // Assert
            expect(firestoreRepository.getDocuments).toHaveBeenCalledWith(
                "branches",
            );
            expect(result).toMatchObject(expectedBranches);
        });
    });

    describe("getBranchById", () => {
        it("should return a branch successfully", async () => {
            // Arrange
            const mockDocumentId: string = "test-branch-id";
            const mockBranch: Branch = {
                id: mockDocumentId,
                ...mockBranchData,
            };

            (firestoreRepository.getDocumentById as jest.Mock).mockResolvedValue(
                {
                    id: mockDocumentId,
                    data: () => mockBranchData,
                }
            );

            // Act
            const branch: Branch = await branchService.getBranchById(mockDocumentId);

            // Assert
            expect(firestoreRepository.getDocumentById).toHaveBeenCalledWith(
                "branches",
                mockDocumentId
            );
            expect(branch).toMatchObject(mockBranch);
        });
    });

    describe("createBranch", () => {
        it("should create a branch successfully", async () => {
            // Arrange
            const mockDocumentId: string = "test-branch-id";

            (firestoreRepository.createDocument as jest.Mock).mockResolvedValue(
                mockDocumentId
            );

            // Act
            const result: Branch = await branchService.createBranch(mockBranchData);

            // Assert
            expect(firestoreRepository.createDocument).toHaveBeenCalledWith(
                "branches",
                expect.objectContaining({
                    name: mockBranchData.name,
                    address: mockBranchData.address,
                    phone: mockBranchData.phone,
                })
            );
            expect(result.id).toBe(mockDocumentId);
            expect(result.name).toBe(mockBranchData.name);
        });
    });

    describe("updateBranch", () => {
        it("should update a branch successfully", async () => {
            // Arrange
            const mockDocumentId: string = "test-branch-id";
            const mockBranch: Branch = {
                id: mockDocumentId,
                ...mockBranchData,
            };
            const mockUpdateData: Partial<Branch> = {
                name: "Chad Jeremy McNotsad",
            };
            const mockUpdatedBranch: Branch = {
                ...mockBranch,
                ...mockUpdateData,
            };

            jest.spyOn(branchService, "getBranchById").mockResolvedValue(mockBranch);

            (firestoreRepository.updateDocument as jest.Mock).mockResolvedValue(
                undefined
            );

            // Act
            const updatedBranch: Branch = await branchService.updateBranch(mockDocumentId, mockUpdateData);

            // Assert
            expect(branchService.getBranchById).toHaveBeenCalledWith(mockDocumentId);
            expect(firestoreRepository.updateDocument).toHaveBeenCalledWith(
                "branches",
                mockDocumentId,
                mockUpdatedBranch,
            );
            expect(updatedBranch).toMatchObject(mockUpdatedBranch);
        });
    });

    describe("deleteBranch", () => {
        it("should delete a branch successfully", async () => {
            // Arrange
            const mockDocumentId: string = "test-branch-id";
            const mockBranch: Branch = {
                id: mockDocumentId,
                ...mockBranchData,
            };

            jest.spyOn(branchService, "getBranchById").mockResolvedValue(mockBranch);

            (firestoreRepository.deleteDocument as jest.Mock).mockResolvedValue(
                undefined
            );

            // Act
            await branchService.deleteBranch(mockDocumentId);

            // Assert
            expect(branchService.getBranchById).toHaveBeenCalledWith(mockDocumentId);
            expect(firestoreRepository.deleteDocument).toHaveBeenCalledWith(
                "branches",
                mockDocumentId
            );
        });
    });
});