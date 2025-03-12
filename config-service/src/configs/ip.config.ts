import { registerAs } from '@nestjs/config';

export const IP_CONFIG = 'ip';

export default registerAs(IP_CONFIG, () => ({
  serviceRegistry: {
    logging: [
      process.env.LOGGING_1,
      process.env.LOGGING_2,
      process.env.LOGGING_3,
    ],
    messages: [process.env.MESSAGES_1],
  },
}));
