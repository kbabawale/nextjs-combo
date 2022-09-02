import { inject, injectable } from 'inversify';
import {
  ChangeEmailPayload,
  ChangePasswordRequest,
  LoginRequest,
  LogoutRequest,
  PaginatedResponse,
  RegenerateTokenRequest,
  RequestsRequest,
} from '../model/HttpRequest';
import {
  AdminRequests,
  CloudinaryResponse,
  Distributor,
  LoginResponse,
} from '../model/HttpResponse';
import { HttpServiceSymbol, IHttpService, ResponseObj } from './http.service';

export interface IAuthService {
  signIn(body: LoginRequest): Promise<ResponseObj<Distributor, LoginResponse>>;
  updateUser(
    id: string,
    body: Partial<Distributor>
  ): Promise<ResponseObj<Distributor>>;
  signOut(body: LogoutRequest): Promise<ResponseObj<boolean>>;
  changePassword(body: ChangePasswordRequest): Promise<ResponseObj<boolean>>;
  comparePassword(
    body: ChangePasswordRequest
  ): Promise<ResponseObj<boolean, string>>;
  syncMe(query: string): Promise<ResponseObj<PaginatedResponse<Distributor[]>>>;
  regenerateToken(
    body: RegenerateTokenRequest
  ): Promise<ResponseObj<boolean, LoginResponse>>;
  sendRequest(
    body: RequestsRequest<ChangeEmailPayload>
  ): Promise<ResponseObj<AdminRequests<ChangeEmailPayload>>>;
  fetchPendingEmailRequests(
    userid: string
  ): Promise<
    ResponseObj<PaginatedResponse<AdminRequests<ChangeEmailPayload>[]>>
  >;
  uploadToCloudinary(body: FormData): Promise<CloudinaryResponse>;
  deleteFromCloudinary(body: FormData): Promise<CloudinaryResponse>;
}

export const AuthServiceSymbol = Symbol.for('IAuthService');

@injectable()
export class AuthService implements IAuthService {
  @inject(HttpServiceSymbol) httpService!: IHttpService;

  async signIn(
    body: LoginRequest
  ): Promise<ResponseObj<Distributor, LoginResponse>> {
    return await this.httpService.post<Distributor, LoginResponse>(
      `${process.env.BASE_API}/api/v1/auth/login`,
      body
    );
  }

  async signOut(body: LogoutRequest): Promise<ResponseObj<boolean>> {
    return await this.httpService.post<boolean, null>(
      `${process.env.BASE_API}/api/v1/auth/logout`,
      body
    );
  }

  async changePassword(
    body: ChangePasswordRequest
  ): Promise<ResponseObj<boolean>> {
    return await this.httpService.post<boolean, null>(
      `${process.env.BASE_API}/api/v1/auth/password/setup`,
      body
    );
  }

  async updateUser(
    id: string,
    body: Partial<Distributor>
  ): Promise<ResponseObj<Distributor>> {
    return await this.httpService.put<Distributor, null>(
      `${process.env.BASE_API}/api/v1/auth/distributor/${id}`,
      body
    );
  }

  async comparePassword(
    body: ChangePasswordRequest
  ): Promise<ResponseObj<boolean, string>> {
    return await this.httpService.post<boolean, string>(
      `${process.env.BASE_API}/api/v1/auth/password/compare`,
      body
    );
  }

  async regenerateToken(
    body: RegenerateTokenRequest
  ): Promise<ResponseObj<boolean, LoginResponse>> {
    return await this.httpService.post<boolean, LoginResponse>(
      `${process.env.BASE_API}/api/v1/auth/password/token/generate`,
      body
    );
  }

  async syncMe(
    query: string
  ): Promise<ResponseObj<PaginatedResponse<Distributor[]>>> {
    return await this.httpService.get<PaginatedResponse<Distributor[]>, null>(
      `${process.env.BASE_API}/api/v1/auth?${query}`
    );
  }

  async fetchPendingEmailRequests(
    userid: string
  ): Promise<
    ResponseObj<PaginatedResponse<AdminRequests<ChangeEmailPayload>[]>>
  > {
    return await this.httpService.get<
      PaginatedResponse<AdminRequests<ChangeEmailPayload>[]>,
      null
    >(`${process.env.BASE_API}/api/v1/auth/admin/request/user?id=${userid}`);
  }

  async sendRequest(
    body: RequestsRequest<ChangeEmailPayload>
  ): Promise<ResponseObj<AdminRequests<ChangeEmailPayload>>> {
    return await this.httpService.post<AdminRequests<ChangeEmailPayload>, null>(
      `${process.env.BASE_API}/api/v1/auth/admin/request`,
      body
    );
  }

  async uploadToCloudinary(body: FormData): Promise<CloudinaryResponse> {
    const res: CloudinaryResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        body,
        method: 'POST',
      }
    ).then((r) => r.json());

    return res;
  }
  async deleteFromCloudinary(body: FormData): Promise<any> {
    const res: any = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/destroy`,
      {
        body,
        method: 'POST',
      }
    ).then((r) => r.json());

    return res;
  }
}
