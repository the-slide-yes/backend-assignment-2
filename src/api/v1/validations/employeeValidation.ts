import Joi from "joi";
import { RequestSchema } from "../middleware/validate";

/**
 * @openapi
 * components:
 *   schemas:
 *     Employee:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - potition
 *         - department
 *         - email
 *         - phone
 *         - branchId
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for an Employee
 *           example: "G5gRYX36bllXVjaY6ESh"
 *         name:
 *           type: string
 *           description: The name of the Employee
 *           example: "Dave"
 *         position:
 *           type: string
 *           description: The job position of the Employee
 *           example: "Salesperson"
 *         department:
 *           type: string
 *           description: The department of the Employee
 *           example: "Sales"
 *         email:
 *           type: string
 *           format: email
 *           description: The work email of the Employee
 *           example: "dave.henry@sadcompany.com"
 *         phone:
 *           type: string
 *           description: The mobile phone number of the Employee
 *           example: "222-222-2222"
 *         branchId:
 *           type: string
 *           description: The ID of the Branch of the Employee
 *           example: "363153325754"
 */

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
            branchId: Joi.string().required().messages({
                "any.required": "Branch ID is required",
                "string.empty": "Branch ID cannot be empty",
            }),
        }).required().messages({
            "any.required": "Body is required",
        }),
    },

    // PUT /api/v1/employees/:id - Update Employee
    update: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Employee ID is required",
                "string.empty": "Employee ID cannot be empty",
            }),
        }).required().messages({
            "any.required": "Params is required",
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
            branchId: Joi.string().optional().messages({
                "string.empty": "Branch ID cannot be empty",
            }),
        }).required().messages({
            "any.required": "Body is required",
        }),
    },

    // GET /api/v1/employees/:id - Get Employee
    getById: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Employee ID is required",
                "string.empty": "Employee ID cannot be empty",
            }),
        }).required().messages({
            "any.required": "Params is required",
        }),
    },

    // GET /api/v1/employees/onBranch/:branchId - Get Employee
    getByBranchId: {
        params: Joi.object({
            branchId: Joi.string().required().messages({
                "any.required": "Branch ID is required",
                "string.empty": "Branch ID cannot be empty",
            }),
        }).required().messages({
            "any.required": "Params is required",
        }),
    },

    // GET /api/v1/employees/inDepartment/:department - Get Employee
    getByDepartment: {
        params: Joi.object({
            department: Joi.string().required().messages({
                "any.required": "Department is required",
                "string.empty": "Department cannot be empty",
            }),
        }).required().messages({
            "any.required": "Params is required",
        }),
    },

    // DELETE /api/v1/employees/:id - Delete Employee
    delete: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Employee ID is required",
                "string.empty": "Employee ID cannot be empty",
            }),
        }).required().messages({
            "any.required": "Params is required",
        }),
    },
};