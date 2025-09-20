import { Employees } from "src/data/employees";
import { Employee } from "../models/employeeModel";

/**
 * Gets all employees.
 * @returns An array containing all employees.
 */
export const getAllEmployees = async (): Promise<Employee[]> => {
    return structuredClone(Employees);
};

/**
 * Gets the employee with the specified ID.
 * @param id - The ID of the intended employee.
 * @returns The employee with the matching ID.
 */
export const getEmployeeById = async (id: number): Promise<Employee> => {
    const selectedEmployeeIndex: number = Employees.findIndex((employee: Employee) => employee.id === id);

    if(selectedEmployeeIndex === -1){
        throw new Error(`Error finding employee: No employee exists with an id of [${id}].`);
    }

    return structuredClone(Employees[selectedEmployeeIndex]);
};

/**
 * Creates a new employee.
 * @param employeeData - Only the fields needed to create an employee.
 * @returns The created employee.
 */
export const createEmployee = async (employeeData: Omit<Employee, "id">): Promise<Employee> => {
    const newEmployee: Employee = {
        id: Date.now(),
        ...employeeData
    };

    Employees.push(newEmployee);

    return newEmployee;
};

/**
 * Updates an existing employee.
 * @param id The ID of the employee intended to be updated.
 * @param employeeData - Only fields that can be updated.
 * @returns The updated employee.
 * @throws Error if an employee with the given ID is not found.
 */
export const updateEmployee = async (id: number, employeeData: {
            name?: string;
            position?: string;
            department?: string;
            email?: string;
            phone?: string;
            branchId?: number;
        }): Promise<Employee> => {
    const selectedEmployeeIndex: number = Employees.findIndex((employee: Employee) => employee.id === id);

    if(selectedEmployeeIndex === -1){
        throw new Error(`Error updating employee: No employee exists with an id of [${id}].`);
    }

    Employees[selectedEmployeeIndex] = {
        ...Employees[selectedEmployeeIndex],
        ...employeeData
    };

    return structuredClone(Employees[selectedEmployeeIndex]);
};

/**
 * Removes an employee.
 * @param id The ID of the employee intended to be removed.
 * @returns A message confirming the employee was successfully deleted.
 * @throws Error if an employee with the given ID is not found.
 */
export const deleteEmployee = async (id: number): Promise<string> => {
    const selectedEmployeeIndex: number = Employees.findIndex((employee: Employee) => employee.id === id);

    if(selectedEmployeeIndex === -1){
        throw new Error(`Error deleting employee: No employee exists with an id of [${id}].`);
    }
    
    Employees.splice(selectedEmployeeIndex, 1);

    return "Employee removed successfully.";
};