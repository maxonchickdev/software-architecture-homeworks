import { Module } from '@nestjs/common';
import { ConfigModule as CoreConfigModule } from '@nestjs/config';
import Joi from 'joi';

@Module({
  imports: [
    CoreConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: Joi.object({
        FACADE_SERVICE_HOST: Joi.string().hostname().default('localhost'),
        FACADE_SERVICE_PORT: Joi.number()
          .integer()
          .min(1)
          .max(65535)
          .default(3000),

        MESSAGES_SERVICE_HOST_1: Joi.string().hostname().default('localhost'),
        MESSAGES_SERVICE_PORT_1: Joi.number()
          .integer()
          .min(1)
          .max(65535)
          .default(3001),
        MESSAGES_SERVICE_HOST_2: Joi.string().hostname().default('localhost'),
        MESSAGES_SERVICE_PORT_2: Joi.number()
          .integer()
          .min(1)
          .max(65535)
          .default(3002),

        LOGGING_SERVICE_HOST: Joi.string().hostname().default('localhost'),
        LOGGING_SERVICE_PORT_1: Joi.number()
          .integer()
          .min(1)
          .max(65535)
          .default(3003),
        LOGGING_SERVICE_PORT_2: Joi.number()
          .integer()
          .min(1)
          .max(65535)
          .default(3004),
        LOGGING_SERVICE_PORT_3: Joi.number()
          .integer()
          .min(1)
          .max(65535)
          .default(3005),

        KAFKA_HOST_1: Joi.string().hostname().default('localhost'),
        KAFKA_PORT_1: Joi.number().integer().min(1).max(65535).default(9092),
        KAFKA_HOST_2: Joi.string().hostname().default('localhost'),
        KAFKA_PORT_2: Joi.number().integer().min(1).max(65535).default(9093),
        KAFKA_HOST_3: Joi.string().hostname().default('localhost'),
        KAFKA_PORT_3: Joi.number().integer().min(1).max(65535).default(9094),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
  ],
})
export class ConfigModule {}
