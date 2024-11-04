import path from 'node:path';
import swaggerUi, { SwaggerUiOptions } from 'swagger-ui-express';
import yaml from 'yamljs';

const swaggerSpecs = yaml.load(
  path.resolve(__dirname, '../src/docs/build/swagger.yaml'),
);

const SwaggerUiOptions: SwaggerUiOptions = {
  customCssUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css',
  customCss:
    '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
};

export { swaggerSpecs, swaggerUi, SwaggerUiOptions };
