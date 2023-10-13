import pino from 'pino';

interface LoggerInterface {
  logRequest: (message: string) => void;
  logError: (message: string) => void;
}

class PinoLogger implements LoggerInterface {
  private readonly logger: pino.Logger;

  constructor() {
    this.logger = pino({
      level: process.env.ENV_STAGE === 'prod' ? 'error' : 'info',
    });
  }

  logRequest(message: string) {
    this.logger.info(message);
  }

  logError(message: string) {
    this.logger.error(message);
  }
}

const pinoLogger = new PinoLogger();

export { pinoLogger };
