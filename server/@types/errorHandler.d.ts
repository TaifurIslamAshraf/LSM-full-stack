export interface errorHandler {
  success: boolean;
  message: string;
  statusCode: number;
  error?: string;
}
