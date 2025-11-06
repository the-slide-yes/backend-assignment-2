import Joi from "joi";
import { RequestSchema } from "../middleware/validate";

/**
 * @openapi
 * components:
 *   schemas:
 *     Branch:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - adress
 *         - phone
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for a Branch
 *           example: "G5gRYX36bllXVjaY6ESh"
 *         name:
 *           type: string
 *           description: The name of the Branch
 *           example: "James Branch"
 *         address:
 *           type: string
 *           description: The physical address of the Branch
 *           example: "308 Negra Arroyo Lane, Albuquerque, New Mexico"
 *         phone:
 *           type: string
 *           description: The office phone for the Branch
 *           example: "222-222-2222"
 */

/**
 * Branch schema organised by request type
 */
export const branchSchemas: Record<string, RequestSchema> = {
    // POST /api/v1/branches - Create new Branch
    create: {
        body: Joi.object({
            name: Joi.string().required().messages({
                "any.required": "Name is required",
                "string.empty": "Name cannot be empty",
            }),
            address: Joi.string().required().messages({
                "any.required": "Address is required",
                "string.empty": "Address cannot be empty",
            }),
            phone: Joi.string().required().messages({
                "any.required": "Phone number is required",
                "string.empty": "Phone number cannot be empty",
            }),
        }).required().messages({
            "any.required": "Body is required",
        }),
    },

    // PUT /api/v1/branches/:id - Update Branch
    update: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Branch ID is required",
                "string.empty": "Branch ID cannot be empty",
            }),
        }).required().messages({
            "any.required": "Params is required",
        }),
        body: Joi.object({
            name: Joi.string().optional().messages({
                "string.empty": "Name cannot be empty",
            }),
            address: Joi.string().optional().messages({
                "string.empty": "Address cannot be empty",
            }),
            phone: Joi.string().optional().messages({
                "string.empty": "Phone number cannot be empty",
            }),
        }).required().messages({
            "any.required": "Body is required",
        }),
    },

    // GET /api/v1/branches/:id - Get Branch
    get: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Branch ID is required",
                "string.empty": "Branch ID cannot be empty",
            }),
        }).required().messages({
            "any.required": "Params is required",
        }),
    },

    // DELETE /api/v1/branches/:id - Delete Branch
    delete: {
        params: Joi.object({
            id: Joi.string().required().messages({
                "any.required": "Branch ID is required",
                "string.empty": "Branch ID cannot be empty",
            }),
        }).required().messages({
            "any.required": "Params is required",
        }),
    },
};

/**
 * @openapi
 * components:
 *   schemas:
 *     Error:
 *       type: object
 *       required:
 *         - error
 *         - message
 *       properties:
 *         error:
 *           type: string
 *           description: Error type or code
 *           example: "VALIDATION_ERROR"
 *         message:
 *           type: string
 *           description: Human-readable error message
 *           example: "The email field is required"
 *         details:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               field:
 *                 type: string
 *                 example: "name"
 *               issue:
 *                 type: string
 *                 example: "must not be empty"
 */