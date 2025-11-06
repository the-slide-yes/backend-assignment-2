import swaggerJsdoc from "swagger-jsdoc";

const serverUrl: string =
    process.env.SWAGGER_SERVER_URL || "http://localhost:3000/api/v1";

const swaggerOptions: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Employee Tracking application API Documentation",
            version: "1.0.0",
            description:
                "This is the API documentation for the Employee Tracking application which tracks employees.",
        },
        servers: [
            {
                url: serverUrl,
                description: process.env.NODE_ENV,
            },
        ],
    },
    // Path to the API docs and schemas
    apis: ["./src/api/v1/routes/*.ts", "./src/api/v1/validations/*.ts"],
};

export const generateSwaggerSpec: () => object = (): object => {
    return swaggerJsdoc(swaggerOptions);
};