/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "auth.v1alpha";

export interface User {
  id?: number;
  email?: string;
}

export interface RegisterRequest {
  password?: string;
  email?: string;
}

export interface RegisterResponse {
  user?: User;
}

export interface FindAllRequest {
}

export interface FindRequest {
  id?: number;
}

export interface FindAllResponse {
  users?: User[];
}

export interface FindResponse {
  user?: User;
}

export interface CheckTokenRequest {
  token?: string;
}

export interface CheckTokenResponse {
  user?: User;
}

export enum CheckTokenResponse_STATUS {
  OK = 0,
  WRONG_PASSWORD = 1,
  NOT_FOUND = 2,
  INTERNAL = 3,
  UNRECOGNIZED = -1,
}

export const AUTH_V1ALPHA_PACKAGE_NAME = "auth.v1alpha";

export interface UserServiceClient {
  findAll(request: FindAllRequest, metadata?: Metadata): Observable<FindAllResponse>;

  find(request: FindRequest, metadata?: Metadata): Observable<FindResponse>;

  checkToken(request: CheckTokenRequest, metadata?: Metadata): Observable<CheckTokenResponse>;

  register(request: RegisterRequest, metadata?: Metadata): Observable<RegisterResponse>;
}

export interface UserServiceController {
  findAll(
    request: FindAllRequest,
    metadata?: Metadata,
  ): Promise<FindAllResponse> | Observable<FindAllResponse> | FindAllResponse;

  find(request: FindRequest, metadata?: Metadata): Promise<FindResponse> | Observable<FindResponse> | FindResponse;

  checkToken(
    request: CheckTokenRequest,
    metadata?: Metadata,
  ): Promise<CheckTokenResponse> | Observable<CheckTokenResponse> | CheckTokenResponse;

  register(
    request: RegisterRequest,
    metadata?: Metadata,
  ): Promise<RegisterResponse> | Observable<RegisterResponse> | RegisterResponse;
}

export function UserServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["findAll", "find", "checkToken", "register"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("UserService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const USER_SERVICE_NAME = "UserService";
