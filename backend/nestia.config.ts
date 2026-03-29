import { INestiaConfig } from "@nestia/sdk";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./src/app.module";
import { FastifyAdapter } from "@nestjs/platform-fastify";


const config: INestiaConfig = {
    input: () => NestFactory.create(AppModule, new FastifyAdapter()), 
    output: "../frontend/src/api",
    clone: true,
    primitive: true,
};

export default config;
