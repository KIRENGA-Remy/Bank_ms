import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from 'swagger-ui-express'

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Bank Management System API',
            version: '1.0.0',
            description: 'API documentation for the Bank Management System'
        },
        servers: [
            {
                url: 'http://localhost:4321',
                description: 'Development server'
            }
        ]
    },
    // Paths to API files
    apis: ['./src/routes/*.ts']
}

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);
export { swaggerUi, swaggerSpec};
