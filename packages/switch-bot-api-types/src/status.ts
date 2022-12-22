import type { Device } from '.';

type Base<
  T extends Device.Base,
  K extends keyof T = 'deviceId' | 'deviceType' | 'hubDeviceId'
> = Pick<T, K>;

export interface Bot extends Base<Device.Bot> {
  /** ON/OFF state */
  power: 'ON' | 'OFF';
}

export interface Curtain extends Base<Device.Curtain> {
  /**
   * determines if the open position and the close position of a device
   * have been properly calibrated or not
   */
  calibrate: boolean;
  /**
   * determines if a Curtain is paired with or grouped with another Curtain or not
   */
  group: boolean;
  /**
   * determines if a Curtain is moving or not
   */
  moving: boolean;
  /**
   * the percentage of the distance between the calibrated
   * open position and closed position that Curtain has traversed
   */
  slidePosition: number;
}

interface BaseMeter {
  /** temparature in celsius */
  temperature: number;
  /** humidity percentage */
  humidity: number;
}

export interface Meter extends Base<Device.Meter>, BaseMeter {}

export interface MeterPlus extends Base<Device.MeterPlus>, BaseMeter {}

export interface Lock extends Base<Device.Lock> {
  /** determines if locked or not */
  lockState: string; // TODO: survey for literal typing
  /** determines if the door is closed or not */
  doorState: string; // TODO: survey for literal typing
  /** determines if Lock has been calibrated or not */
  calibrate: boolean;
}

export interface Keypad extends Base<Device.Keypad> {}

export interface KeypadTouch extends Base<Device.KeypadTouch> {}

interface BaseSensor {
  /** the ambient brightness picked up by the sensor. bright or dim */
  brightness: 'bright' | 'dim';
}

export interface MotionSensor extends Base<Device.MotionSensor>, BaseSensor {
  /** determines if motion is detected */
  motionDetected: boolean;
}

export interface ContactSensor extends Base<Device.ContactSensor>, BaseSensor {
  /** determines if motion is detected */
  moveDetected: boolean;
  /** the open state of the sensor */
  openState: 'open' | 'close' | 'timeOutNotClose';
}

interface BaseCeilingLight {
  /** ON/OFF state */
  power: 'ON' | 'OFF';
  /** the brightness value, range from 1 to 100 */
  brightness: number;
  /** the color temparature value, range from 2700 to 6500 */
  colorTemperature: number;
}

export interface CeilingLight
  extends Base<Device.CeilingLight>,
    BaseCeilingLight {}

export interface CeilingLightPro
  extends Base<Device.CeilingLightPro>,
    BaseCeilingLight {}

interface BasePlug {
  /** the voltage of the device, measured in Volt */
  voltage: number;
  /** the power consumed in a day, measured in Watts */
  weight: number;
  /** the duration that the device has been used during a day, measured in minutes */
  electricityOfDay: number;
  /** the current of the device at the moment, measured in Amp */
  electricCurrent: number;
}

export interface PlugMiniUS extends Base<Device.PlugMiniUS>, BasePlug {}

export interface PlugMiniJP extends Base<Device.PlugMiniJP>, BasePlug {}

export interface Plug extends Base<Device.Plug> {
  /** ON/OFF state */
  power: 'ON' | 'OFF';
}

interface BaseLight {
  /** ON/OFF state */
  power: 'ON' | 'OFF';
  /** the brightness value, range from 1 to 100 */
  brightness: number;
  /** the color value, RGB `255:255:255` */
  color: `${number}:${number}:${number}`;
}

export interface StripLight extends Base<Device.StripLight>, BaseLight {}

export interface ColorBulb
  extends Base<Device.ColorBulb>,
    BaseLight,
    BaseCeilingLight {}

interface BaseRobotVacuumCleanerS1 {
  /** the working status of the device */
  workingStatus:
    | 'StandBy'
    | 'Clearing'
    | 'Paused'
    | 'GotoChargeBase'
    | 'Charging'
    | 'ChargeDone'
    | 'Dormant'
    | 'InTrouble'
    | 'InRemoteControl'
    | 'InDustCollecting';
  /** the connection status of the device */
  onlineStatus: 'online' | 'offline';
  /** the current battery level */
  battery: number;
}

export interface RobotVacuumCleanerS1
  extends Base<Device.RobotVacuumCleanerS1>,
    BaseRobotVacuumCleanerS1 {}

export interface RobotVacuumCleanerS1Plus
  extends Base<
      Device.RobotVacuumCleanerS1Plus,
      'deviceId' | 'deviceType' | 'hubDeviceId' | 'deviceName'
    >,
    BaseRobotVacuumCleanerS1 {}

export interface Humidifier extends Base<Device.Humidifier>, BaseMeter {
  /** ON/OFF state */
  power: 'ON' | 'OFF';
  /** atomization efficiency in percentage */
  nebulizationEfficiency: number;
  /** determines if a Humidifier is in Auto Mode or not */
  auto: boolean;
  /** determines if a Humidifier's safety lock is on or not */
  childLock: boolean;
  /** determines if a Humidifier is muted or not */
  sound: boolean;
  /** determines if the water tank is empty or not */
  lackWater: boolean;
}

export type All =
  | Bot
  | Curtain
  | Meter
  | MeterPlus
  | Lock
  | Keypad
  | KeypadTouch
  | MotionSensor
  | ContactSensor
  | CeilingLight
  | CeilingLightPro
  | PlugMiniUS
  | PlugMiniJP
  | Plug
  | StripLight
  | ColorBulb
  | RobotVacuumCleanerS1
  | RobotVacuumCleanerS1Plus
  | Humidifier;
