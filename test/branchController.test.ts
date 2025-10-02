import * as branchController from "../src/api/v1/controllers/branchController";
import { HTTP_STATUS } from "../src/constants/httpConstants";
import { Branch } from "../src/api/v1/models/branchModel";
import * as branchService from "../src/api/v1/services/branchService";
import { NextFunction, Request, Response } from "express";

jest.mock("../src/api/v1/services/branchService");

describe("Branch controller", () => {
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

    describe("getAllBranches", () => {
        it("should get all branches", async () => {
            // Arrange
            const mockBranches: Branch[] = [
                {
                    id: 1,
                    name: "Bingleburg Branch",
                    address: "2 Tanning St, Bingleburg, AUS, 444 222",
                    phone: "231-535-8335",
                },
            ];
            (branchService.getAllBranches as jest.Mock).mockReturnValue(mockBranches);

            // Act
            await branchController.getAllBranches(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Branches retrieved successfully",
                data: mockBranches,
            });
        });

        it("should handle errors", async () => {
            // Arrange
            const mockError: Error = new Error("I AM AN EGG");
            
            (branchService.getAllBranches as jest.Mock).mockImplementation(() => {
                throw mockError;
            });

            // Act
            await branchController.getAllBranches(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            // Assert
            expect(mockNext).toHaveBeenCalledWith(mockError);
        });
    });

    describe("getBranchById", () => {
        it("should get one branch", async () => {
            // Arrange
            const mockBranch: Branch = {
                id: 1,
                name: "Bingleburg Branch",
                address: "2 Tanning St, Bingleburg, AUS, 444 222",
                phone: "231-535-8335",
            };
            mockReq.params = { id: "1" };
            (branchService.getBranchById as jest.Mock).mockReturnValue(mockBranch);

            // Act
            await branchController.getBranchById(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Branch retrieved successfully",
                data: mockBranch,
            });
        });

        it("should return bad request when id is invalid", async () => {
            // Arrange
            const mockBranch: Branch = {
                id: 1,
                name: "Bingleburg Branch",
                address: "2 Tanning St, Bingleburg, AUS, 444 222",
                phone: "231-535-8335",
            };
            mockReq.params = {id: "Gaming"};
            (branchService.getBranchById as jest.Mock).mockReturnValue(mockBranch);
            
            // Act
            await branchController.getBranchById(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );
            
            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "ID must be a number"
            });
        });
    });

    describe("createBranch", () => {
        it("should handle successful creation", async () => {
            // Arrange
            const mockBody: Omit<Branch, "id"> = {
                name: "Bingleburg Branch",
                address: "2 Tanning St, Bingleburg, AUS, 444 222",
                phone: "231-535-8335",
            };

            const mockBranch: Branch = {
                id: 1,
                ...mockBody
            };

            mockReq.body = mockBody;
            (branchService.createBranch as jest.Mock).mockReturnValue(mockBranch);

            // Act
            await branchController.createBranch(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.CREATED);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Branch created successfully",
                data: mockBranch,
            });
        });

        it("should return bad request when missing name", async () => {
            // Arrange
            const mockBody: Omit<Branch, "id" | "name"> = {
                address: "2 Tanning St, Bingleburg, AUS, 444 222",
                phone: "231-535-8335",
            };

            mockReq.body = mockBody;

            // Act
            await branchController.createBranch(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Branch name is required",
            });
        });
    });

    describe("updateBranch", () => {
        it("should handle updating successfully", async () => {
            // Arrange
            const mockBody: Partial<Branch> = {
                phone: "333-333-3333",
            };

            const mockBranch: Branch = {
                id: 1,
                name: "Bingleburg Branch",
                address: "2 Tanning St, Bingleburg, AUS, 444 222",
                phone: "231-535-8335",
                ...mockBody
            };

            mockReq.body = mockBody;
            mockReq.params = { id: "1" };
            (branchService.updateBranch as jest.Mock).mockReturnValue(mockBranch);

            // Act
            await branchController.updateBranch(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "Branch updated successfully",
                data: mockBranch,
            });
        });

        it("should return bad request with missing parameters", async () => {
            // Arrange
            const mockBody: Partial<Branch> = {
                phone: "222-222-2222",
            };

            const mockBranch: Branch = {
                id: 1,
                name: "Bingleburg Branch",
                address: "2 Tanning St, Bingleburg, AUS, 444 222",
                phone: "231-535-8335",
                ...mockBody
            };

            mockReq.body = mockBody;
            (branchService.updateBranch as jest.Mock).mockReturnValue(mockBranch);

            // Act
            await branchController.updateBranch(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "ID must be a number"
            });
        });
    });

    describe("deleteBranch", () => {
        it("should handle successful deletion", async () => {
            // Arrange
            const mockConfirmation: string = "Yipee!";

            mockReq.params = { id: "1" };
            (branchService.deleteBranch as jest.Mock).mockReturnValue(mockConfirmation);

            // Act
            await branchController.deleteBranch(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.OK);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: mockConfirmation
            });
        });

        it("should return bad request when no branch with matching ID", async () => {
            // Arrange
            const mockErrorMessage: string = "Error deleting branch";

            mockReq.params = { id: "1" };
            (branchService.deleteBranch as jest.Mock).mockImplementation((id: number) => { throw new Error(mockErrorMessage); });

            // Act
            await branchController.deleteBranch(
                mockReq as Request,
                mockRes as Response,
                mockNext
            );

            // Assert
            expect(mockRes.status).toHaveBeenCalledWith(HTTP_STATUS.BAD_REQUEST);
            expect(mockRes.json).toHaveBeenCalledWith({
                message: "ID doesn't match any existing branch"
            });
        });
    });
});