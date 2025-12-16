---
sidebar_position: 3
title: "Best Practices"
description: "Industry-standard best practices for TypeScript development. Advanced type manipulation, architectural patterns, and professional development guidelines."
keywords: [typescript best practices, advanced patterns, architectural patterns, professional development, type manipulation]
---

# Best Practices

This comprehensive guide outlines industry-standard best practices for TypeScript development within the ts-playground project, designed to align with professional backend development standards.

## TypeScript Advanced Best Practices

### Advanced Type Manipulation

**Conditional Types for Dynamic Behavior:**
```typescript
type IsString<T> = T extends string ? true : false;
type StringStatus = IsString<"hello">; // true

// Advanced utility for API response handling
type ApiResponse<T> = {
  success: true;
  data: T;
} | {
  success: false;
  error: string;
};
```

**Generic Constraints with Multiple Bounds:**
```typescript
interface Lengthwise {
  length: number;
}

function getProperty<T extends object, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
```

### Discriminated Unions for Type Safety
```typescript
interface LoadingState {
  status: 'loading';
  progress?: number;
}

interface SuccessState<T> {
  status: 'success';
  data: T;
  timestamp: Date;
}

interface ErrorState {
  status: 'error';
  error: Error;
}

type ApiState<T> = LoadingState | SuccessState<T> | ErrorState;

function handleApiState<T>(state: ApiState<T>) {
  switch (state.status) {
    case 'loading':
      console.log(`Loading: ${state.progress || 0}%`);
      break;
    case 'success':
      console.log(`Success at ${state.timestamp}`);
      break;
    case 'error':
      console.error(state.error.message);
      break;
  }
}
```

### Const Assertions for Immutable Data
```typescript
const API_CONFIG = {
  endpoints: {
    users: '/api/users',
    posts: '/api/posts',
  },
  timeout: 5000,
} as const;

// Results in:
// - API_CONFIG.endpoints.users being of type '/api/users' (not string)
// - All properties becoming readonly
```

## Architectural Best Practices

### Layered Architecture Pattern
```typescript
// Domain Layer: Pure business logic
class UserDomain {
  constructor(private readonly validationRules: ValidationRules) {}

  async validate(user: Partial<User>): Promise<ValidationResult> {
    return this.validationRules.validate(user);
  }
}

// Application Layer: Orchestrates domain and infrastructure
class UserService {
  constructor(
    private readonly userDomain: UserDomain,
    private readonly userRepository: UserRepository,
    private readonly logger: Logger
  ) {}

  async createUser(userData: UserCreationRequest): Promise<User> {
    try {
      const validation = await this.userDomain.validate(userData);
      if (!validation.isValid) throw new ValidationError(validation.errors);

      const user = await this.userRepository.create(userData);
      this.logger.info(`User created: ${user.id}`);
      return user;
    } catch (error) {
      this.logger.error('User creation failed', error);
      throw error;
    }
  }
}

// Infrastructure Layer: External integrations
interface UserRepository {
  create(data: UserCreationRequest): Promise<User>;
  findById(id: string): Promise<User | null>;
}
```

### Dependency Injection Implementation
```typescript
// Using a simple DI container or constructor injection
interface DependencyContainer {
  resolve<T>(token: Token<T>): T;
}

class UserService {
  constructor(
    private readonly container: DependencyContainer
  ) {}

  async processUser(userId: string): Promise<void> {
    const userRepository = this.container.resolve<UserRepository>('userRepository');
    const emailService = this.container.resolve<EmailService>('emailService');
    const user = await userRepository.findById(userId);

    if (user) {
      await emailService.sendWelcomeEmail(user.email);
    }
  }
}
```

### Configuration Management
```typescript
interface AppConfig {
  readonly database: {
    readonly host: string;
    readonly port: number;
    readonly name: string;
  };
  readonly api: {
    readonly port: number;
    readonly cors: {
      readonly origin: string[];
    };
  };
}

class ConfigService {
  private static instance: ConfigService;
  private readonly config: AppConfig;

  private constructor() {
    this.config = {
      database: {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432'),
        name: process.env.DB_NAME || 'ts_playground',
      },
      api: {
        port: parseInt(process.env.API_PORT || '3000'),
        cors: {
          origin: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000'],
        },
      },
    };
  }

  static getInstance(): ConfigService {
    if (!ConfigService.instance) {
      ConfigService.instance = new ConfigService();
    }
    return ConfigService.instance;
  }

  get<T extends keyof AppConfig>(key: T): AppConfig[T] {
    return this.config[key];
  }
}
```

## Performance & Memory Management Best Practices

### Efficient Data Structures
```typescript
// Use Maps for frequent lookups instead of array.find()
const userMap = new Map<string, User>();
userMap.set('user1', { id: 'user1', name: 'John' });
const user = userMap.get('user1'); // O(1) complexity

// Use Sets for unique collections
const uniquePermissions = new Set<string>(['read', 'write', 'delete']);
```

### Async Operation Optimization
```typescript
// Concurrent execution when possible
async function fetchUserDataConcurrently(userId: string) {
  const [profile, permissions, notifications] = await Promise.all([
    profileService.getProfile(userId),
    permissionService.getUserPermissions(userId),
    notificationService.getUnreadCount(userId)
  ]);

  return { profile, permissions, notifications };
}

// Sequential execution when order matters
async function processUserRegistration(userData: UserRegistration) {
  const validatedUser = await validationService.validate(userData);
  const createdUser = await userRepository.create(validatedUser);
  await emailService.sendWelcomeEmail(createdUser.email);
  await analyticsService.trackEvent('user_registered', createdUser.id);

  return createdUser;
}
```

### Memory Management
```typescript
// Proper cleanup for event emitters and subscriptions
class ServiceWithCleanup {
  private disposables: Array<() => void> = [];

  async initialize() {
    const subscription = eventBus.subscribe('user.created', this.handleUserCreated);
    this.disposables.push(() => subscription.unsubscribe());

    const timer = setInterval(() => this.cleanup(), 30000);
    this.disposables.push(() => clearInterval(timer));
  }

  async cleanup() {
    for (const dispose of this.disposables) {
      try {
        dispose();
      } catch (error) {
        logger.warn('Error during cleanup', error);
      }
    }
    this.disposables = [];
  }
}
```

## Security Best Practices

### Input Validation & Sanitization
```typescript
import validator from 'validator';

class InputValidator {
  static validateEmail(email: string): ValidationResult {
    if (!validator.isEmail(email)) {
      return { isValid: false, error: 'Invalid email format' };
    }
    return { isValid: true };
  }

  static sanitizeString(input: string): string {
    return validator.escape(validator.trim(input));
  }

  static validatePassword(password: string): ValidationResult {
    if (password.length < 8) {
      return { isValid: false, error: 'Password must be at least 8 characters' };
    }
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return { isValid: false, error: 'Password must contain uppercase, lowercase, and number' };
    }
    return { isValid: true };
  }
}
```

### Authentication & Authorization
```typescript
interface AuthenticatedRequest extends Request {
  user: User;
}

const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      throw new AuthenticationError('Access token required');
    }

    const decoded = jwt.verify(token, config.jwt.secret);
    const user = await userService.findById(decoded.userId);
    if (!user) throw new AuthenticationError('Invalid token');

    (req as AuthenticatedRequest).user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Authentication failed' });
  }
};

const requirePermission = (permission: string) =>
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user.permissions.includes(permission)) {
      res.status(403).json({ error: 'Insufficient permissions' });
      return;
    }
    next();
  };
```

## Testing Best Practices

### Comprehensive Test Strategy
```typescript
// Integration test example
describe('User Registration Integration', () => {
  let app: Express;
  let testServer: Server;

  beforeAll(async () => {
    app = createApp();
    testServer = app.listen(0); // Random available port
  });

  afterAll(async () => {
    await testServer.close();
  });

  beforeEach(async () => {
    await cleanupTestDatabase(); // Clean state for each test
  });

  it('should register user and send welcome email', async () => {
    // Arrange
    const newUser = { email: 'test@example.com', name: 'Test User' };
    const response = await request(app)
      .post('/api/users/register')
      .send(newUser);

    // Assert
    expect(response.status).toBe(201);
    expect(response.body.email).toBe(newUser.email);

    // Verify side effects
    const user = await User.findOne({ email: newUser.email });
    expect(user).toBeDefined();

    // Verify email was sent (using email mock/stub)
    expect(emailService.sendWelcomeEmail).toHaveBeenCalledWith(newUser.email);
  });
});
```

### Property-Based Testing Concepts
```typescript
// Using property-based testing for validation
function testValidationProperty(input: string, expected: boolean) {
  const result = InputValidator.validateEmail(input);
  expect(result.isValid).toBe(expected);
}

// Test with various inputs to ensure robustness
const testCases = [
  { input: 'valid@example.com', expected: true },
  { input: 'invalid-email', expected: false },
  { input: 'test@domain.co.uk', expected: true },
  { input: '', expected: false },
];

testCases.forEach(({ input, expected }) => {
  test(`Email validation for: ${input}`, () => {
    testValidationProperty(input, expected);
  });
});
```

## Production Readiness Best Practices

### Observability & Monitoring
```typescript
interface Logger {
  info(message: string, meta?: any): void;
  error(message: string, error?: Error): void;
  warn(message: string, meta?: any): void;
  debug(message: string, meta?: any): void;
}

class UserService {
  constructor(private readonly logger: Logger) {}

  async createUser(userData: UserCreationRequest): Promise<User> {
    const startTime = Date.now();

    try {
      this.logger.info('Creating user', { email: userData.email });

      const user = await this.userRepository.create(userData);

      this.logger.info('User created successfully', {
        userId: user.id,
        duration: Date.now() - startTime
      });

      return user;
    } catch (error) {
      this.logger.error('User creation failed', error);
      throw new UserServiceError('Failed to create user', error);
    }
  }
}
```

### Health Checks & Monitoring
```typescript
interface HealthIndicator {
  isHealthy(): Promise<boolean>;
  getDetails(): Promise<HealthDetails>;
}

class DatabaseHealthIndicator implements HealthIndicator {
  constructor(private readonly connection: DatabaseConnection) {}

  async isHealthy(): Promise<boolean> {
    try {
      await this.connection.query('SELECT 1');
      return true;
    } catch (error) {
      return false;
    }
  }

  async getDetails(): Promise<HealthDetails> {
    const startTime = Date.now();
    const healthy = await this.isHealthy();
    const responseTime = Date.now() - startTime;

    return {
      name: 'database',
      status: healthy ? 'up' : 'down',
      responseTime,
      timestamp: new Date().toISOString(),
    };
  }
}
```

These professional best practices ensure that code developed in the ts-playground environment aligns with industry standards and prepares developers for real-world backend development challenges.