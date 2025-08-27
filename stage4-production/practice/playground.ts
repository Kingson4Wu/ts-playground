// Simple playground file for Stage 4 exercises
console.log('Stage 4: Production Readiness & Optimization');

// Example production-ready code structure
interface Config {
  port: number;
  databaseUrl: string;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
}

class Application {
  private config: Config;

  constructor(config: Config) {
    this.config = config;
  }

  public async start(): Promise<void> {
    console.log(`Starting application on port ${this.config.port}`);
    // In a real application, you would initialize your server here
  }

  public async stop(): Promise<void> {
    console.log('Stopping application');
    // In a real application, you would clean up resources here
  }
}

// Default configuration
const defaultConfig: Config = {
  port: 3000,
  databaseUrl: 'sqlite://localhost:database.db',
  logLevel: 'info',
};

console.log('Application class defined with default config:', defaultConfig);
