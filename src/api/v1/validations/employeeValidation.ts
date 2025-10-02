import Joi from "joi";
import { RequestSchema } from "../middleware/validate";

/**
 * Employee schema organised by request type
 */
export const employeeSchemas: Record<string, RequestSchema> = {
    // POST /api/v1/employees - Create new Employee
    create: {
        body: Joi.object({
            name: Joi.string().required().messages({
                "any.required": "Name is required",
                "string.empty": "Name cannot be empty",
            }),
            position: Joi.string().required().messages({
                "any.required": "Position is required",
                "string.empty": "Potition cannot be empty",
            }),
            email: Joi.string().required().email().messages({
                "any.required": "Email is required",
                "string.empty": "Email cannot be empty",
                "string.email": "Email must be valid"
            }),
            department: Joi.string().required().messages({
                "any.required": "Department is required",
                "string.empty": "Department cannot be empty",
            }),
            phone: Joi.string().required().messages({
                "any.required": "Phone number is required",
                "string.empty": "Phone number cannot be empty",
            }),
            branchId: Joi.number().required().messages({
                "any.required": "Branch ID is required",
            }),
        }),
    },

    // PUT /api/v1/employees/:id - Update Employee
    update: {
        params: Joi.object({
            id: Joi.number().required().messages({
                "any.required": "Employee ID is required",
            }),
        }),
        body: Joi.object({
            name: Joi.string().optional().messages({
                "string.empty": "Name cannot be empty",
            }),
            position: Joi.string().optional().messages({
                "string.empty": "Potition cannot be empty",
            }),
            email: Joi.string().optional().email().messages({
                "string.empty": "Email cannot be empty",
                "string.email": "Email must be valid"
            }),
            department: Joi.string().optional().messages({
                "string.empty": "Department cannot be empty",
            }),
            phone: Joi.string().optional().messages({
                "string.empty": "Phone number cannot be empty",
            }),
        }),
    },

    // GET /api/v1/employees/:id - Get Employee
    getById: {
        params: Joi.object({
            id: Joi.number().required().messages({
                "any.required": "Employee ID is required",
            }),
        }),
    },

    // GET /api/v1/employees/onBranch/:branchId - Get Employee
    getByBranchID: {
        params: Joi.object({
            branchId: Joi.number().required().messages({
                "any.required": "Branch ID is required",
            }),
        }),
    },

    // GET /api/v1/employees/inDepartment/:department - Update Employee
    getByDepartment: {
        params: Joi.object({
            department: Joi.string().required().messages({
                "any.required": "Department is required",
                "string.empty": "Department cannot be empty",
            }),
        }),
    },

    // GET /api/v1/employees/:id - Update Employee
    delete: {
        params: Joi.object({
            id: Joi.number().required().messages({
                "any.required": "Employee ID is required",
            }),
        }),
    },
};