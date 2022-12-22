import type { Key as KeypadKey } from './keypad';

export interface Base {
  /** device ID */
  deviceId: string;
  /** device name */
  deviceName: string;
  /** device type */
  deviceType: string;
  /**
   * device's parent Hub ID.
   * `000000000000` when the device itself is a Hub
   * or it is connected through Wi-Fi
   */
  hubDeviceId: string;
  /**
   * determines if Cloud Serviceis enabled or not
   * for the current device
   */
  enableCloudService: boolean;
}

export interface Bot extends Base {
  deviceType: 'Bot';
}

export interface Curtain extends Base {
  deviceType: 'Curtain';
  /**
   * determines if a Curtain is paired with
   * or grouped with another Curtain or not
   */
  group: boolean;
  /**
   * determines if a Curtain is the master device or not
   * when paired with or grouped with another Curtain
   */
  master: boolean;
  /**
   * a list of Curtain device IDs such that
   * the Curtain devices are being paired or grouped
   */
  curtainDeviceIds: string[];
  /**
   * determines if the open position and the close position of a device
   * have been properly calibrated or not
   */
  calibrate: boolean;
  /** he opening direction of a Curtain */
  openDirection: string; // TODO: survey for literal typing
}

export interface Hub extends Base {
  deviceType: 'Hub';
}
export interface HubPlus extends Base {
  deviceType: 'Hub Plus';
}
export interface HubMini extends Base {
  deviceType: 'Hub Mini';
}

export interface Meter extends Base {
  deviceType: 'Meter';
}

export interface MeterPlus extends Base {
  deviceType: 'Meter Plus';
}

export interface Lock extends Base {
  deviceType: 'Smart Lock';
  /** determines if a Lock is grouped with another Lock or not */
  group: boolean;
  /**
   * determines if a Lock is the master device or not
   * when grouped with another Lock in Dual Lock mode
   */
  master: boolean;
  /** the name of the Lock group */
  groupName: boolean; // TODO: check if really boolean
  /**
   * a list of Lock device IDs such that
   * the Lock devices are being grouped in Dual Lock Mode
   */
  lockDeviceIds: string[];
}

interface BaseKeypad extends Base {
  /** MAC address of the Lock that the current device is paired with */
  lockDeviceId: string;
  /** a list of passcodes */
  keyList: KeypadKey[]; // TODO: check if really array
}

export interface Keypad extends BaseKeypad {
  deviceType: 'Keypad';
}

export interface KeypadTouch extends BaseKeypad {
  deviceType: 'Keypad Touch';
}

export interface Remote extends Base {
  deviceType: 'Remote';
}

export interface MotionSensor extends Base {
  deviceType: 'Motion Sensor';
}

export interface ContactSensor extends Base {
  deviceType: 'Contact Sensor';
}

export interface CeilingLight extends Base {
  deviceType: 'Ceiling Light';
}

export interface CeilingLightPro extends Base {
  deviceType: 'Ceiling Light Pro';
}

export interface PlugMiniUS extends Base {
  deviceType: 'Plug Mini (US)';
}

export interface PlugMiniJP extends Base {
  deviceType: 'Plug Mini (JP)';
}

export interface Plug extends Base {
  deviceType: 'Plug';
}

export interface StripLight extends Base {
  deviceType: 'Strip Light';
}

export interface ColorBulb extends Base {
  deviceType: 'Color Bulb';
}

export interface RobotVacuumCleanerS1 extends Base {
  deviceType: 'Robot Vacuum Cleaner S1';
}

export interface RobotVacuumCleanerS1Plus extends Base {
  deviceType: 'Robot Vacuum Cleaner S1 Plus';
}

export interface Humidifier extends Base {
  deviceType: 'Humidifier';
}

export interface IndoorCam extends Base {
  deviceType: 'Indoor Cam';
}

export interface PanTiltCam extends Base {
  deviceType: 'Pan/Tilt Cam';
}

export interface PanTiltCam2K extends Base {
  deviceType: 'Pan/Tilt Cam 2K';
}

export type All =
  | Bot
  | Curtain
  | Hub
  | HubPlus
  | HubMini
  | Meter
  | MeterPlus
  | Lock
  | Keypad
  | KeypadTouch
  | Remote
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
  | Humidifier
  | IndoorCam
  | PanTiltCam
  | PanTiltCam2K;

export interface VirtualInfraredRemote
  extends Pick<Base, 'deviceId' | 'deviceName' | 'hubDeviceId'> {
  /** device type */
  remoteType: string; // TODO: survey for literal typing
}
