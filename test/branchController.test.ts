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
                    id: "1",
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
                status: "success",
            });
        });
    });

    describe("getBranchById", () => {
        it("should get one branch", async () => {
            // Arrange
            const mockBranch: Branch = {
                id: "1",
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
                status: "success",
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
                id: "1",
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
                status: "success",
            });
        });
    });

    describe("updateBranch", () => {
        it("should handle updating successfully", async () => {
            // Arrange
            const mockBody: Partial<Branch> = {
                name: "Main Branch",
            };

            const mockBranch: Branch = {
                id: "1",
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
                status: "success",
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
                data: mockConfirmation,
                status: "success",
            });
        });
    });
});