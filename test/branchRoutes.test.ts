import request from "supertest";
import app from "../src/app";
import * as branchController from "../src/api/v1/controllers/branchController";
import { HTTP_STATUS } from "../src/constants/httpConstants";
import { Branch } from "../src/api/v1/models/branchModel";

jest.mock("../src/api/v1/controllers/branchController", () => ({
    getAllBranches: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    getBranchById: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    createBranch: jest.fn((req, res) => res.status(HTTP_STATUS.CREATED).send()),
    updateBranch: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
    deleteBranch: jest.fn((req, res) => res.status(HTTP_STATUS.OK).send()),
}));

describe("Branch Routes", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("GET /api/vi/branches/", () => {
        it("should call getAllBranches controller", async () => {
            // Act
            await request(app).get("/api/v1/branches");
            // Assert
            expect(branchController.getAllBranches).toHaveBeenCalled();
        });
    });
    
    describe("GET /api/vi/branches/:id", () => {
        it("should call getBranchById controller", async () => {
            // Act
            await request(app).get("/api/v1/branches/1");
            // Assert
            expect(branchController.getBranchById).toHaveBeenCalled();
        });
    });

    describe("POST /api/vi/branches/", () => {
        it("should call createBranch controller with valid data", async () => {
            // Arrange
            const mockBranch: Omit<Branch, "id"> = {
                name: "Bingleburg Branch",
                address: "2 Tanning St, Bingleburg, AUS, 444 222",
                phone: "231-535-8335",
            };
            // Act
            await request(app).post("/api/v1/branches").send(mockBranch);
            // Assert
            expect(branchController.createBranch).toHaveBeenCalled();
        });
    });

    describe("PUT /api/vi/branches/:id", () => {
        it("should call updateBranch controller with valid data", async () => {
            // Arrange
            const mockBranch: Omit<Branch, "id"> = {
                name: "Bingleburg Branch",
                address: "2 Tanning St, Bingleburg, AUS, 444 222",
                phone: "231-535-8335",
            };
            // Act
            await request(app).put("/api/v1/branches/1").send(mockBranch);
            // Assert
            expect(branchController.updateBranch).toHaveBeenCalled();
        });
    });

    describe("DELETE /api/vi/branches/:id", () => {
        it("should call deleteBranch controller with valid data", async () => {
            // Act
            await request(app).delete("/api/v1/branches/1");
            // Assert
            expect(branchController.deleteBranch).toHaveBeenCalled();
        });
    });
});