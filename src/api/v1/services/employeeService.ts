import { DocumentData, DocumentSnapshot, FieldValue, QuerySnapshot } from "node_modules/firebase-admin/lib/firestore";
import { Employee } from "../models/employeeModel";
import { createDocument, deleteDocument, getDocumentById, getDocuments, getDocumentsByFieldValues, updateDocument } from "../repositories/firestoreRepository";

const COLLECTION: string = "employees";

/**
 * Gets all employees.
 * @returns An array containing all employees.
 */
export const getAllEmployees = async (): Promise<Employee[]> => {
    try {
        const snapshot: QuerySnapshot = await getDocuments(COLLECTION);

        const employees: Employee[] = snapshot.docs.map((doc) => {
            const data: DocumentData = doc.data();
            return {
                id: doc.id,
                ...data,
            } as Employee;
        });

        return employees;
    } catch (error: unknown) {
        throw error;
    }
};

/**
 * Gets the employee with the specified ID.
 * @param id - The ID of the intended employee.
 * @returns The employee with the matching ID.
 */
export const getEmployeeById = async (id: string): Promise<Employee> => {
    const doc: DocumentSnapshot | null = await getDocumentById(COLLECTION, id);

    if (!doc) {
        throw new Error(`Employee with ID ${id} not found`);
    }

    const data: DocumentData | undefined = doc.data();

    const employee: Employee = {
        id: doc.id,
        ...data,
    } as Employee;

    return structuredClone(employee);
};

/**
 * Gets all employees with the specified branch ID.
 * @param branchId - The branch ID of the intended employee.
 * @returns The employees with the matching branch ID.
 */
export const getEmployeesByBranch = async (branchId: string): Promise<Employee[]> => {
    try {
        const snapshot: QuerySnapshot = await getDocumentsByFieldValues(COLLECTION, [{
            fieldName: "branchId",
            fieldValue: branchId
        }]);

        const employees: Employee[] = snapshot.docs.map((doc) => {
            const data: DocumentData = doc.data();

            return {
                id: doc.id,
                ...data,
            } as Employee;
        });

        return employees;
    } catch (error: unknown) {
        throw error;
    }
};

/**
 * Gets all employees in the specified department.
 * @param department - The department of the intended employee.
 * @returns The employees with the matching department.
 */
export const getEmployeesByDepartment = async (department: string): Promise<Employee[]> => {
    try {
        const snapshot: QuerySnapshot = await getDocumentsByFieldValues(COLLECTION, [{
            fieldName: "department",
            fieldValue: department
        }]);

        const employees: Employee[] = snapshot.docs.map((doc) => {
            const data: DocumentData = doc.data();

            return {
                id: doc.id,
                ...data,
            } as Employee;
        });

        return employees;
    } catch (error: unknown) {
        throw error;
    }
};

/**
 * Creates a new employee.
 * @param employeeData - Only the fields needed to create an employee.
 * @returns The created employee.
 */
export const createEmployee = async (employeeData: Omit<Employee, "id">): Promise<Employee> => {
    const employeeId: string = await createDocument<Employee>(COLLECTION, employeeData);

    return structuredClone({ id: employeeId, ...employeeData } as Employee);
};

/**
 * Updates an existing employee.
 * @param id The ID of the employee intended to be updated.
 * @param employeeData - Only fields that can be updated.
 * @returns The updated employee.
 * @throws Error if an employee with the given ID is not found.
 */
export const updateEmployee = async (id: string, employeeData: {
    name?: string;
    position?: string;
    department?: string;
    email?: string;
    phone?: string;
    branchId?: string;
}): Promise<Employee> => {
    try {
        const employee: Employee = await getEmployeeById(id);

        const updateEmployee: Employee = {
            ...employee,
            ...employeeData
        };

        await updateDocument<Employee>(COLLECTION, id, updateEmployee);

        return structuredClone(updateEmployee);
    } catch (error: unknown) {
        throw error;
    }
};

/**
 * Removes an employee.
 * @param id The ID of the employee intended to be removed.
 * @returns A message confirming the employee was successfully deleted.
 * @throws Error if an employee with the given ID is not found.
 */
export const deleteEmployee = async (id: string): Promise<string> => {
    try {
        const employee: Employee = await getEmployeeById(id);

        await deleteDocument(COLLECTION, id);

        return "Employee deleted successfully";
    } catch (error: unknown) {
        throw error;
    }
};