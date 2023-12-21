/*
* Copyright (c) 2023 Thorsten von Eicken
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

declare module "embedded:network/http/server" {

  export interface ServerOptions {
    io: any
    port?:number
    onConnect?: (connection: Connection) => void
  }

  export default class HTTPServer {
    constructor(options: ServerOptions)
    close(): void
  }

  export interface Connection {
    accept(route: RouteOptions): void
    close(): void
    detach(): any
    read(count:number ): ArrayBuffer | undefined // undefined=>no data available
    write(buf: ArrayBuffer | undefined): number // undefined=>end of response body
    respond(res: Response): void
    get route(): RouteOptions
    set route(value: RouteOptions)
  }

  export interface RouteOptions {
    onRequest?: (this: Connection, info: {method:string, path:string, headers:Headers}) => void
    onReadable?: (this: Connection, count: number) => void
    onWritable?: (this: Connection, count: number) => void
    onResponse?: (this: Connection, options: {status:number, headers:{}}) => void
    onDone?: (this: Connection) => void
    onError?: (this: Connection, error: Error) => void
  }

  export type Headers = Map<string, string>
  export type Response = {status:number, headers:Map<string,string>}
}
