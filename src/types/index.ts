export interface Device {
  bright: number;
  connected: boolean;
  firmware: string;
  host: string;
  hsb: { h: string; s: string; b: string };
  id: string;
  mac: string;
  messageId: number;
  messages: object;
  model: string;
  name: string;
  port: number;
  power: boolean;
  rgb: { r: string; g: string; b: string };
}
