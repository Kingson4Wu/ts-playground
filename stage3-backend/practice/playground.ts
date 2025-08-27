// Simple playground file for Stage 3 exercises
// console.log('Stage 3: Backend API Development');

// Example API code structure
interface APIRequest {
  method: string;
  url: string;
  headers: Record<string, string>;
  body?: unknown;
}

interface APIResponse {
  status: number;
  headers: Record<string, string>;
  body?: unknown;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
class SimpleAPIHandler {
  public handleRequest(req: APIRequest): APIResponse {
    switch (req.method) {
      case 'GET':
        return this.handleGET(req);
      case 'POST':
        return this.handlePOST(req);
      default:
        return {
          status: 405,
          headers: { 'Content-Type': 'application/json' },
          body: { error: 'Method not allowed' },
        };
    }
  }

  private handleGET(req: APIRequest): APIResponse {
    return {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
      body: { message: 'GET request received', url: req.url },
    };
  }

  private handlePOST(req: APIRequest): APIResponse {
    return {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
      body: { message: 'POST request received', data: req.body },
    };
  }
}

// console.log('API Handler initialized');
