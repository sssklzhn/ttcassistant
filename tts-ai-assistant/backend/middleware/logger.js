import fs from 'fs';
import path from 'path';

class Logger {
  constructor() {
    this.logDir = 'logs';
    this.ensureLogDirectory();
  }

  ensureLogDirectory() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }
  }

  getLogFileName() {
    const date = new Date().toISOString().split('T')[0];
    return path.join(this.logDir, `app-${date}.log`);
  }

  formatMessage(level, message, meta = {}) {
    const timestamp = new Date().toISOString();
    return JSON.stringify({
      timestamp,
      level,
      message,
      ...meta
    }) + '\n';
  }

  log(level, message, meta = {}) {
    const logMessage = this.formatMessage(level, message, meta);
    const logFile = this.getLogFileName();
    
    // Логируем в файл
    fs.appendFileSync(logFile, logMessage);
    
    // Также выводим в консоль для разработки
    console.log(`[${level.toUpperCase()}] ${message}`, meta);
  }

  info(message, meta = {}) {
    this.log('info', message, meta);
  }

  error(message, meta = {}) {
    this.log('error', message, meta);
  }

  warn(message, meta = {}) {
    this.log('warn', message, meta);
  }

  debug(message, meta = {}) {
    this.log('debug', message, meta);
  }
}

// Создаем глобальный логгер
const logger = new Logger();

// Middleware для логирования запросов
export const requestLogger = (req, res, next) => {
  const startTime = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const logMeta = {
      method: req.method,
      url: req.url,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      userAgent: req.get('User-Agent'),
      ip: req.ip
    };

    if (res.statusCode >= 400) {
      logger.warn('HTTP Request Error', logMeta);
    } else {
      logger.info('HTTP Request', logMeta);
    }
  });

  next();
};

// Middleware для логирования ошибок
export const errorLogger = (error, req, res, next) => {
  logger.error('Unhandled Error', {
    message: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method
  });
  next(error);
};

export default logger;