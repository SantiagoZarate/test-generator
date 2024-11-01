import path from "node:path";
import swaggerUi from "swagger-ui-express";
import yaml from "yamljs";

const swaggerSpecs = yaml.load(
  path.resolve(__dirname, "../src/docs/build/swagger.yaml")
);

export { swaggerSpecs, swaggerUi };
