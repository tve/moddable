/*
* Copyright (c) 2022 Shinya Ishikawa
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

declare module "embedded:io/spi" {
  import { Buffer, PinSpecifier, PortSpecifier } from "embedded:io/_common";
  export interface Options {
    out?: PinSpecifier;
    in?: PinSpecifier;
    clock: PinSpecifier;
    select?: PinSpecifier;
    active?: 1 | 0;
    hz: number;
    mode?: number;
    port?: PortSpecifier;
    format?: "buffer";
    target?: any;
  }
  class SPI {
    constructor(options: Options);
    read(byteLength: number): ArrayBuffer;
    read(buffer: Buffer): void;
    write(buffer: Buffer): void;
    transfer(buffer: Buffer): void;
    flush(deselect?: boolean): void;
    get format(): "buffer";
    set format(value: "buffer");
  }
  export default SPI;
}
