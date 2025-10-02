import { branches } from "../../../data/branches";
import { Branch } from "../models/branchModel";

/**
 * Gets all branches.
 * @returns An array containing all branches.
 */
export const getAllBranches = async (): Promise<Branch[]> => {
    return structuredClone(branches);
};

/**
 * Gets the branch with the specified ID.
 * @param id - The ID of the intended branch.
 * @returns The branch with the matching ID.
 */
export const getBranchById = async (id: number): Promise<Branch> => {
    const selectedBranchIndex: number = branches.findIndex((branch: Branch) => branch.id === id);

    if(selectedBranchIndex === -1){
        throw new Error(`Error finding branch: No branch exists with an id of [${id}].`);
    }

    return structuredClone(branches[selectedBranchIndex]);
};

/**
 * Creates a new branch.
 * @param branchData - Only the fields needed to create a branch.
 * @returns The created branch.
 */
export const createBranch = async (branchData: Omit<Branch, "id">): Promise<Branch> => {
    const newBranch: Branch = {
        id: Date.now(),
        ...branchData
    };

    branches.push(newBranch);

    return newBranch;
};

/**
 * Updates an existing branch.
 * @param id The ID of the branch intended to be updated.
 * @param branchData - Only fields that can be updated.
 * @returns The updated branch.
 * @throws Error if a branch with the given ID is not found.
 */
export const updateBranch = async (id: number, branchData: {
            name?: string;
            address?: string;
            phone?: string;
        }): Promise<Branch> => {
    const selectedBranchIndex: number = branches.findIndex((branch: Branch) => branch.id === id);

    if(selectedBranchIndex === -1){
        throw new Error(`Error updating branch: No branch exists with an id of [${id}].`);
    }

    branches[selectedBranchIndex] = {
        ...branches[selectedBranchIndex],
        ...branchData
    };

    return structuredClone(branches[selectedBranchIndex]);
};

/**
 * Removes a branch.
 * @param id The ID of the branch intended to be removed.
 * @returns A message confirming the branch was successfully deleted.
 * @throws Error if a branch with the given ID is not found.
 */
export const deleteBranch = async (id: number): Promise<string> => {
    const selectedBranchIndex: number = branches.findIndex((branch: Branch) => branch.id === id);

    if(selectedBranchIndex === -1){
        throw new Error(`Error deleting branch: No branch exists with an id of [${id}].`);
    }
    
    branches.splice(selectedBranchIndex, 1);

    return "Branch removed successfully.";
};