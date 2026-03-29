import { AppModule } from "./app.module";
import cors from "@fastify/cors";
import { INestiaConfig, NestiaSwaggerComposer } from "@nestia/sdk";
import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";
import { OpenAPIObject, SwaggerModule } from "@nestjs/swagger";


async function bootstrap() {
  // Setup Fastify adapter
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule, 
    new FastifyAdapter(),
  );

  // Logging
  const logger = new Logger("HTTP");
  const fastifyInstance = app.getHttpAdapter().getInstance();
  fastifyInstance.addHook("onResponse", (req, res, done) => {
    logger.log(`${req.ip} "${req.method} ${req.url}" ${res.statusCode}`);
    done();
  });

  // Swagger
  const config: Omit<INestiaConfig.ISwaggerConfig, "output"> = {
    openapi: "3.1",
    info: {
      title: "Monorepo Template",
      summary: "Шаблон для fullstack-приложения NestJs + React.",
      version: "1.0",
    },
    servers: [{ url: "http://localhost:3000", description: "Localhost" }],
  };
  
  const document = await NestiaSwaggerComposer.document(app, config);
  SwaggerModule.setup("docs", app, document as OpenAPIObject);

  await app.register(cors);

  await app.listen(3000, "0.0.0.0");
}

void bootstrap();