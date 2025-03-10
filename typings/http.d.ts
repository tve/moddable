/*
* Copyright (c) 2019-2020 Bradley Farias
*
*   This file is part of the Moddable SDK Tools.
*
*   The Moddable SDK Tools is free software: you can redistribute it and/or modify
*   it under the terms of the GNU General Public License as published by
*   the Free Software Foundation, either version 3 of the License, or
*   (at your option) any later version.
*
*   The Moddable SDK Tools is distributed in the hope that it will be useful,
*   but WITHOUT ANY WARRANTY; without even the implied warranty of
*   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*   GNU General Public License for more details.
*
*   You should have received a copy of the GNU General Public License
*   along with the Moddable SDK Tools.  If not, see <http://www.gnu.org/licenses/>.
*
*/

declare module "http" {
  import type {TCPSocketOptions, ListenerOptions} from "socket";

  // HTTP client types

  type RequestError = -1;
  type RequestBodyFragment = 0;
  type RequestStatusCode = 1;
  type RequestHeaderReceived = 2;
  type RequestAllHeaders = 3;
  type RequestResponseFragment = 4;
  type RequestAllResponse = 5;

  export type RequestStatus = (
    RequestError |
    RequestBodyFragment |
    RequestStatusCode |
    RequestHeaderReceived |
    RequestAllHeaders |
    RequestResponseFragment |
    RequestAllResponse
  );

  export type HTTPRequestOptions = TCPSocketOptions | {
    host?: string,
    address?: string,
    port?: number,
    path?: string,
    method?: string,
    headers?: (string | number)[],
    body?: boolean | string | ArrayBuffer,
    response?: typeof String | typeof ArrayBuffer
  }

  // TODO: better
  export type HTTPRequestCallback = (
    message: RequestStatus,
    val1?: any,
    val2?: any
  ) => void | number | boolean | string | ArrayBuffer;

  export class Request {
    constructor(options: HTTPRequestOptions);
    close(): void;
    read(): number;
    read<T extends typeof String | typeof ArrayBuffer>(
      type: T,
      until?: number
    ): T extends typeof String ? string : ArrayBuffer;
    callback: HTTPRequestCallback

    static readonly requestFragment: RequestBodyFragment;
    static readonly status: RequestStatusCode;
    static readonly header: RequestHeaderReceived;
    static readonly headersComplete: RequestAllHeaders;
    static readonly responseFragment: RequestAllHeaders;
    static readonly responseComplete: RequestAllResponse;
    static readonly error: RequestError;
  }

  // HTTP Server types

  type ServerConnection = 1;
  type ServerStatus = 2;
  type ServerHeader = 3;
  type ServerHeadersComplete = 4;
  type ServerRequestFragment = 5;
  type ServerRequestComplete = 6;
  type ServerPrepareResponse = 8;
  type ServerResponseFragment = 9;
  type ServerResponseComplete = 10;
  type ServerError = -1;
  export type ServerMessages = (
    ServerConnection |
    ServerStatus |
    ServerHeader |
    ServerHeadersComplete |
    ServerRequestFragment |
    ServerRequestComplete |
    ServerPrepareResponse |
    ServerResponseFragment |
    ServerResponseComplete |
    ServerError
  );

  export type HTTPServerOptions = ListenerOptions;

  export interface HTTPServerResponse {
    status?: number;
    reason?: string; // text version of status code
    headers?: string[];
    body?: true | string | ArrayBuffer;
  }

  export interface HTTPServerRequest extends Record<string, any> { // handlers can add props!
    close(): void;
    read(): number;
    read<T extends typeof String | typeof ArrayBuffer>(
      type: T,
      until?: number
    ): T extends typeof String ? string : ArrayBuffer;
    callback: HTTPServerCallback;
    server: Server;
    state: number; // private use
  }

  // TODO: better
  export type HTTPServerCallback = (
    this: HTTPServerRequest,
    message: ServerMessages,
    val1?: any,
    val2?: any
  ) => void | number | boolean | string | ArrayBuffer | HTTPServerResponse;

  export class Server {
    constructor(
      options?: HTTPServerOptions
    );
    close(connections: boolean): void;
    detach(connection: HTTPServerRequest): void;
    callback: HTTPServerCallback

    static readonly connection: ServerConnection;
    static readonly status: ServerStatus;
    static readonly header: ServerHeader;
    static readonly headersComplete: ServerHeadersComplete;
    static readonly requestFragment: ServerRequestFragment;
    static readonly requestComplete: ServerRequestComplete;
    static readonly prepareResponse: ServerPrepareResponse;
    static readonly responseFragment: ServerResponseFragment;
    static readonly responseComplete: ServerResponseComplete;
    static readonly error: ServerError;
  }
}
