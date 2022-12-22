import type { Command, Device, Endpoint } from 'switch-bot-api-types';

export type Request<T = Endpoint.All> = T extends unknown
  ? Omit<T, 'response'>
  : never;

export type Response<R extends Request> = Extract<Endpoint.All, R> extends {
  response: Endpoint.Response<infer Body, number>;
}
  ? Body
  : unknown;

export interface AvailableCommands {
  Bot: Command.Bot;
  Curtain: Command.Curtain;
  'Smart Lock': Command.Lock;
  Humidifier: Command.Humidifier;
  Plug: Command.Plug;
  'Plug Mini (US)': Command.PlugMiniJP;
  'Plug Mini (JP)': Command.PlugMiniUS;
  'Color Bulb': Command.ColorBulb;
  'Strip Light': Command.StripLight;
  'Robot Vacuum Cleaner S1': Command.RobotVacuumCleanerS1;
  'Robot Vacuum Cleaner S1 Plus': Command.RobotVacuumCleanerS1Plus;
  'Ceiling Light': Command.CeilingLight;
  'Ceiling Light Pro': Command.CeilingLightPro;
  Keypad: Command.Keypad;
  'Keypad Touch': Command.KeypadTouch;
  Remote: Command.Remote;
}

export type DeviceWithCommand = Extract<
  Device.All,
  { deviceType: keyof AvailableCommands }
>;
