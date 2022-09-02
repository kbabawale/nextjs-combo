import { RequestsType } from './HttpRequest';
import { OTPField } from './OTPfield';

export interface LoginResponse {
  authToken: {
    access_token: string;
    refresh_token: string;
  };
}

export interface Distributor {
  _id: string;

  firstName: string;

  lastName: string;

  businessName: string;

  address: string;

  email: string;

  phone: string;

  password: string;

  profilePhoto: string;

  profilePhotoPublicID: string;

  profilePhotoSignature: string;

  twoFactorAuthentication: boolean;

  status: string;

  visible: boolean;

  firstPasswordReset: boolean;

  accessToken?: string;

  refreshToken?: string;

  otp?: OTPField;

  lastLoginTime?: Date;

  verified?: boolean;

  fcmToken?: string;
}

export interface AdminRequests<T> {
  _id: string;

  type: RequestsType;

  payload: T;

  status: string;

  approvedBy: string;

  approvalDate: Date;
}

export interface CloudinaryResponse {
  access_mode: string;
  asset_id: string;
  bytes: number;
  created_at: Date;
  etag: string;
  format: string;
  height: number;
  original_filename: string;
  placeholder: boolean;
  public_id: string;
  resource_type: string;
  secure_url: string;
  signature: string;
  tags: any[];
  type: string;
  url: string;
  version: number;
  width: number;
}
