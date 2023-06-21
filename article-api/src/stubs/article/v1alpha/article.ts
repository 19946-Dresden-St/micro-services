/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "article.v1alpha";

export interface Article {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
}

/** GET */
export interface GetRequest {
  id?: number;
  name?: string;
}

export interface GetResponse {
  articles?: Article[];
}

/** ADD */
export interface AddRequest {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
}

export interface AddResponse {
  article?: Article;
}

/** UPDATE */
export interface UpdateRequest {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
}

export interface UpdateResponse {
  article?: Article;
}

/** DELETE */
export interface DeleteRequest {
  id?: number;
}

export interface DeleteResponse {
  article?: Article;
}

export const ARTICLE_V1ALPHA_PACKAGE_NAME = "article.v1alpha";

export interface ArticleCRUDServiceClient {
  get(request: GetRequest, metadata?: Metadata): Observable<GetResponse>;

  add(request: AddRequest, metadata?: Metadata): Observable<AddResponse>;

  update(request: UpdateRequest, metadata?: Metadata): Observable<UpdateResponse>;

  delete(request: DeleteRequest, metadata?: Metadata): Observable<DeleteResponse>;
}

export interface ArticleCRUDServiceController {
  get(request: GetRequest, metadata?: Metadata): Promise<GetResponse> | Observable<GetResponse> | GetResponse;

  add(request: AddRequest, metadata?: Metadata): Promise<AddResponse> | Observable<AddResponse> | AddResponse;

  update(
    request: UpdateRequest,
    metadata?: Metadata,
  ): Promise<UpdateResponse> | Observable<UpdateResponse> | UpdateResponse;

  delete(
    request: DeleteRequest,
    metadata?: Metadata,
  ): Promise<DeleteResponse> | Observable<DeleteResponse> | DeleteResponse;
}

export function ArticleCRUDServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["get", "add", "update", "delete"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("ArticleCRUDService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("ArticleCRUDService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const ARTICLE_CR_UD_SERVICE_NAME = "ArticleCRUDService";
