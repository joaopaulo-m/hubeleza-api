import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'MaxLeads',
      version: '1.0.0',
      description: 'Documentação da API do MaxLeads',
    },
  },
  apis: ['./routes/express/*.js'],
});
