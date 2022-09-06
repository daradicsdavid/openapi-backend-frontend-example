/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import {Logger} from '@nestjs/common';
import {NestFactory} from '@nestjs/core';

import {AppModule} from './app/app.module';
import {execSync} from "child_process";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import * as fs from "fs";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const config = new DocumentBuilder()
    .setTitle("OpenAPI example")
    .setDescription("OpenAPI example API docs")
    .setVersion("1.0")
    .addTag("admin")
    .setBasePath("admin")
    .build();
  const document = SwaggerModule.createDocument(app, config, {operationIdFactory: (controllerKey: string, methodKey: string) => methodKey});
  SwaggerModule.setup("api-docs", app, document);


  // process.env.ENVIRONMENT === "LOCAL"
  if (true) {

    app.enableCors();
    Logger.log("CORS enabled!");

    const openApiDescriptionPath = "libs/backend-client/src/api-docs.json";
    const frontendApiOutputPath = "libs/backend-client/src";
    Logger.log("Generating api docs");
    fs.writeFileSync(
      openApiDescriptionPath,
      JSON.stringify(document)
    );
    execSync(`npx @openapitools/openapi-generator-cli generate -i ${openApiDescriptionPath} -g typescript-axios  -o ${frontendApiOutputPath}  --type-mappings=DateTime=Date --additional-properties=supportsES6=true`);
  }

  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
