/*
* Copyright (c) 2019-2023 Bradley Farias
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

declare module "wifi" {
  export type WiFiOptions = {
    bssid?: string,
    ssid: string,
    password?: string
  }
  export type WiFiCallback = (
    this: WiFi,
    message: "connect" | "gotIP" | "lostIP" | "disconnect",
    code: number
    ) => void
  export type WiFiScanCallback = (item: {
    ssid: string,
    authentication: string,
    rssi: number,
    bssid: ArrayBuffer,
  } | null) => void;
  export type StationMode = 1;
  export type AccessPointMode = 2;
  export type ScanOptions = {hidden?: boolean, channel?: number}
  export type AccessPointOptions = {
    ssid: string,
    password?: string,
    channel?: number,
    hidden?: boolean,
    interval?: number,
    max?: number
  }

  class WiFi {
    static readonly gotIP: "gotIP";
    static readonly lostIP: "lostIP";
    static readonly connected: "connect";
    static readonly disconnected: "disconnect";
    
    constructor(options: WiFiOptions, callback?: WiFiCallback);
    close(): void;
    static scan(options: ScanOptions, callback: WiFiScanCallback): void;
    static mode: StationMode | AccessPointMode;
    static connect(options?: WiFiOptions): void;
    static disconnect(): void;
    static accessPoint(options: AccessPointOptions): void;
  }
  export {WiFi as default};
}
