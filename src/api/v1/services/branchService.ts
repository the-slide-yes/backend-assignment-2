import { DocumentData, DocumentSnapshot, FieldValue, QuerySnapshot } from "node_modules/firebase-admin/lib/firestore";
import { Branch } from "../models/branchModel";
import { createDocument, deleteDocument, getDocumentById, getDocuments, getDocumentsByFieldValues, updateDocument } from "../repositories/firestoreRepository";

const COLLECTION: string = "branches";

/**
 * Gets all branches.
 * @returns An array containing all branches.
 */
export const getAllBranches = async (): Promise<Branch[]> => {
    try {
        const snapshot: QuerySnapshot = await getDocuments(COLLECTION);

        const branches: Branch[] = snapshot.docs.map((doc) => {
            const data: DocumentData = doc.data();
            return {
                id: doc.id,
                ...data,
            } as Branch;
        });

        return branches;
    } catch (error: unknown) {
        throw error;
    }
};

/**
 * Gets the branch with the specified ID.
 * @param id - The ID of the intended branch.
 * @returns The branch with the matching ID.
 */
export const getBranchById = async (id: string): Promise<Branch> => {
    const doc: DocumentSnapshot | null = await getDocumentById(COLLECTION, id);

    if (!doc) {
        throw new Error(`Branch with ID ${id} not found`);
    }

    const data: DocumentData | undefined = doc.data();

    const branch: Branch = {
        id: doc.id,
        ...data,
    } as Branch;

    return structuredClone(branch);
};

/**
 * Creates a new branch.
 * @param branchData - Only the fields needed to create a branch.
 * @returns The created branch.
 */
export const createBranch = async (branchData: Omit<Branch, "id">): Promise<Branch> => {
    const branchId: string = await createDocument<Branch>(COLLECTION, branchData);

    return structuredClone({ id: branchId, ...branchData } as Branch);
};

/**
 * Updates an existing branch.
 * @param id The ID of the branch intended to be updated.
 * @param branchData - Only fields that can be updated.
 * @returns The updated branch.
 * @throws Error if a branch with the given ID is not found.
 */
export const updateBranch = async (id: string, branchData: {
    name?: string;
    address?: string;
    phone?: string;
}): Promise<Branch> => {
    try {
        const branch: Branch = await getBranchById(id);

        const updateBranch: Branch = {
            ...branch,
            ...branchData
        };

        await updateDocument<Branch>(COLLECTION, id, updateBranch);

        return structuredClone(updateBranch);
    } catch (error: unknown) {
        throw error;
    }
};

/**
 * Removes a branch.
 * @param id The ID of the branch intended to be removed.
 * @returns A message confirming the branch was successfully deleted.
 * @throws Error if a branch with the given ID is not found.
 */
export const deleteBranch = async (id: string): Promise<string> => {
    try {
        const branch: Branch = await getBranchById(id);

        await deleteDocument(COLLECTION, id);

        return "Branch deleted successfully";
    } catch (error: unknown) {
        throw error;
    }
};