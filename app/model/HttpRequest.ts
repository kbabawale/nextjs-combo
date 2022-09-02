export interface LoginRequest {
  email: string;
  password: string;
  platform?: string;
}
export interface LogoutRequest {
  id: string;
  platform: string;
  refreshtoken?: string;
}
export interface ChangePasswordRequest {
  password: string;
  platform: string;
  id: string;
}
export interface RegenerateTokenRequest {
  refreshToken: string;
  platform: string;
}
export interface PaginatedResponse<T> {
  total: number;
  data: T;
  limit: number;
  skip: number;
}
export enum RequestsType {
  'UPDATEEMAIL' = 'UPDATEEMAIL',
}
export interface RequestsRequest<T> {
  type: RequestsType;
  payload?: T;
  status?: string;
  approvedBy?: string;
  approvalDate?: Date;
}
export interface ChangeEmailPayload {
  newEmail: string;
  userId: string;
}
