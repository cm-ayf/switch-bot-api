import type { CreateKey as CreateKeypadKey } from './keypad';

export interface Base {
  commandType?: string;
  command: string;
  parameter?: unknown;
}

interface BaseCommand extends Base {
  commandType?: 'command';
}

interface BaseCommandDefault<Command extends string> extends BaseCommand {
  command: Command;
  parameter?: 'default';
}

namespace Common {
  /** set to OFF state */
  export type TurnOff = BaseCommandDefault<'turnOff'>;
  /** set to ON state */
  export type TurnOn = BaseCommandDefault<'turnOn'>;
  /** toggle state */
  export type Toggle = BaseCommandDefault<'toggle'>;

  /** set brightness */
  export interface SetBrightness extends BaseCommand {
    command: 'setBrightness';
    /** 1-100 */
    parameter: `${number}`;
  }

  /** set RGB color value */
  export interface SetColor extends BaseCommand {
    command: 'setColor';
    /** "{0-255}:{0-255}:{0-255}" */
    parameter: `${number}:${number}:${number}`;
  }

  /** set color temparature */
  export interface SetColorTemparature extends BaseCommand {
    command: 'setColorTemparature';
    /** 2700-6500 */
    parameter: `${number}`;
  }
}

export namespace Bot {
  export type TurnOff = Common.TurnOff;
  export type TurnOn = Common.TurnOn;

  /** trigger press */
  export type Press = BaseCommandDefault<'press'>;
}

export type Bot = Bot.Press | Bot.TurnOn | Bot.TurnOff;

export namespace Curtain {
  /** set the position */
  export interface SetPosition extends BaseCommand {
    command: 'setPosition';
    /**
     * ```ts
     * `${index},${mode},${position}`
     * ```
     * mode:
     * - 0: Performance Mode
     * - 1: Silent Mode
     * - ff: default mode
     * position: 0-100 (0 means opened, 100: means closed)
     */
    parameter: `${number},${'0' | '1' | 'ff'},${number}`;
  }

  /** equivalent to set position to 100 */
  export type TurnOff = BaseCommandDefault<'turnOff'>;

  /** equivalent to set position to 0 */
  export type TurnOn = BaseCommandDefault<'turnOn'>;
}

export type Curtain = Curtain.SetPosition | Curtain.TurnOff | Curtain.TurnOn;

export namespace Lock {
  /** rotate to locked position */
  export type Lock = BaseCommandDefault<'lock'>;

  /** rotate to unlocked position */
  export type Unlock = BaseCommandDefault<'unlock'>;
}

export type Lock = Lock.Lock | Lock.Unlock;

export namespace Humidifier {
  export type TurnOff = Common.TurnOff;
  export type TurnOn = Common.TurnOn;

  /** set the mode */
  export interface SetMode extends BaseCommand {
    command: 'setMode';
    /**
     * - auto: set to Auto mode
     * - 101: set atomization eficiency to 34%
     * - 102: set atomization eficiency to 67%
     * - 103: set atomization eficiency to 100%
     * - 0-100: set atomization eficiency to the value
     */
    parameter: 'auto' | `${number}`;
  }
}

export type Humidifier =
  | Humidifier.SetMode
  | Humidifier.TurnOff
  | Humidifier.TurnOn;

export namespace Plug {
  export type TurnOff = Common.TurnOff;
  export type TurnOn = Common.TurnOn;
}

export type Plug = Plug.TurnOff | Plug.TurnOn;

export namespace PlugMiniUS {
  export type TurnOff = Common.TurnOff;
  export type TurnOn = Common.TurnOn;
  export type Toggle = Common.Toggle;
}

export type PlugMiniUS =
  | PlugMiniUS.TurnOff
  | PlugMiniUS.TurnOn
  | PlugMiniUS.Toggle;

export namespace PlugMiniJP {
  export type TurnOff = Common.TurnOff;
  export type TurnOn = Common.TurnOn;
  export type Toggle = Common.Toggle;
}

export type PlugMiniJP =
  | PlugMiniJP.TurnOff
  | PlugMiniJP.TurnOn
  | PlugMiniJP.Toggle;

export namespace ColorBulb {
  export type TurnOff = Common.TurnOff;
  export type TurnOn = Common.TurnOn;
  export type Toggle = Common.Toggle;
  export type SetBrightness = Common.SetBrightness;
  export type SetColor = Common.SetColor;
  export type SetColorTemparature = Common.SetColorTemparature;
}

export type ColorBulb =
  | ColorBulb.TurnOff
  | ColorBulb.TurnOn
  | ColorBulb.Toggle
  | ColorBulb.SetBrightness
  | ColorBulb.SetColor
  | ColorBulb.SetColorTemparature;

export namespace StripLight {
  export type TurnOff = Common.TurnOff;
  export type TurnOn = Common.TurnOn;
  export type Toggle = Common.Toggle;
  export type SetBrightness = Common.SetBrightness;
  export type SetColor = Common.SetColor;
}

export type StripLight =
  | StripLight.TurnOff
  | StripLight.TurnOn
  | StripLight.Toggle
  | StripLight.SetBrightness
  | StripLight.SetColor;

export namespace RobotVacuumCleanerS1 {
  /** start vacuuming */
  export type Start = BaseCommandDefault<'start'>;
  /** stop vacuuming */
  export type Stop = BaseCommandDefault<'stop'>;
  /** return to charging dock */
  export type Dock = BaseCommandDefault<'dock'>;
  /** set sunction power level */
  export interface PowLevel extends BaseCommand {
    command: 'powLevel';
    /**
     * - 0: Quiet
     * - 1: Standard
     * - 2: Strong
     * - 3: Max
     */
    parameter: `${0 | 1 | 2 | 3}`;
  }
}

export type RobotVacuumCleanerS1 =
  | RobotVacuumCleanerS1.Start
  | RobotVacuumCleanerS1.Stop
  | RobotVacuumCleanerS1.Dock
  | RobotVacuumCleanerS1.PowLevel;

export { RobotVacuumCleanerS1 as RobotVacuumCleanerS1Plus };

export namespace CeilingLight {
  export type TurnOff = Common.TurnOff;
  export type TurnOn = Common.TurnOn;
  export type Toggle = Common.Toggle;
  export type SetBrightness = Common.SetBrightness;
  export type SetColorTemparature = Common.SetColorTemparature;
}

export type CeilingLight =
  | CeilingLight.TurnOff
  | CeilingLight.TurnOn
  | CeilingLight.Toggle
  | CeilingLight.SetBrightness
  | CeilingLight.SetColorTemparature;

export { CeilingLight as CeilingLightPro };

export namespace Keypad {
  export interface CreateKey extends BaseCommand {
    command: 'createKey';
    parameter: CreateKeypadKey;
  }

  export interface DeleteKey extends BaseCommand {
    command: 'deleteKey';
    parameter: DeleteKey;
  }
}

export type Keypad = Keypad.CreateKey | Keypad.DeleteKey;

export { Keypad as KeypadTouch };

export namespace Remote {
  /** every home appliance can be turned on by default */
  export interface TurnOn extends Base {
    commandType: ''; // check if really empty
    command: 'turnOn';
    parameter: 'default';
  }

  /** every home appliance can be turned off by default */
  export type TurnOff = Common.TurnOff;

  /**
   * all user-defined buttons must be configured with commandType 'customize'
   */
  export interface UserDefined extends Base {
    commandType: 'customize';
    /** user-defined button name */
    command: string;
    parameter: 'default';
  }

  export namespace AirConditioner {
    export type TurnOff = Remote.TurnOff;
    export type TurnOn = Remote.TurnOn;
    /**
     * set all parameters for an air conditioner
     */
    export interface SetAll extends BaseCommand {
      command: 'setAll';
      /**
       * ```ts
       * `${temparature},${mode},${fanSpeed},${powerState}`
       * ```
       * temparature: in celsuis
       *
       * mode:
       * - 1: auto
       * - 2: cool
       * - 3: dry
       * - 4: fan
       * - 5: heat
       *
       * fanSpeed:
       * - 1: auto
       * - 2: low
       * - 3: medium
       * - 4: high
       *
       * powerState:
       * - on
       * - off
       */
      parameter: `${number},${1 | 2 | 3 | 4 | 5},${1 | 2 | 3 | 4},${
        | 'on'
        | 'off'}`;
    }
  }

  export type AirConditioner = AirConditioner.SetAll | TurnOn | TurnOff;

  export namespace TV {
    export type TurnOff = Remote.TurnOff;
    export type TurnOn = Remote.TurnOn;

    /**
     * set the TV channel to switch to
     */
    export interface SetChannel extends BaseCommand {
      command: 'SetChannel';
      /** channel number */
      parameter: `${number}`;
    }

    /** volume up */
    export type VolumeAdd = BaseCommandDefault<'volumeAdd'>;
    /** volume down */
    export type VolumeSub = BaseCommandDefault<'volumeSub'>;
    /** next channel */
    export type ChannelAdd = BaseCommandDefault<'channelAdd'>;
    /** previous channel */
    export type ChannelSub = BaseCommandDefault<'channelSub'>;
  }

  export type TV =
    | TV.SetChannel
    | TV.VolumeAdd
    | TV.VolumeSub
    | TV.ChannelAdd
    | TV.ChannelSub
    | TV.TurnOn
    | TV.TurnOff;

  export namespace Speaker {
    export type TurnOff = Remote.TurnOff;
    export type TurnOn = Remote.TurnOn;
    /** mute/unmute */
    export type SetMute = BaseCommandDefault<'setMute'>;
    /** fast forward */
    export type FastForward = BaseCommandDefault<'FastForward'>;
    /** rewind */
    export type Rewind = BaseCommandDefault<'Rewind'>;
    /** next track */
    export type Next = BaseCommandDefault<'Next'>;
    /** last track */
    export type Previous = BaseCommandDefault<'Previous'>;
    /** pause */
    export type Pause = BaseCommandDefault<'Pause'>;
    /** play */
    export type Play = BaseCommandDefault<'Play'>;
    /** stop */
    export type Stop = BaseCommandDefault<'Stop'>;
    /** volume up */
    export type VolumeAdd = BaseCommandDefault<'volumeAdd'>;
    /** volume down */
    export type VolumeSub = BaseCommandDefault<'volumeSub'>;
  }

  export type Speaker =
    | Speaker.SetMute
    | Speaker.FastForward
    | Speaker.Rewind
    | Speaker.Next
    | Speaker.Previous
    | Speaker.Pause
    | Speaker.Play
    | Speaker.Stop
    | Speaker.VolumeAdd
    | Speaker.VolumeSub
    | Speaker.TurnOn
    | Speaker.TurnOff;

  export namespace Fan {
    export type TurnOff = Remote.TurnOff;
    export type TurnOn = Remote.TurnOn;
    /** swing */
    export type Swing = BaseCommandDefault<'swing'>;
    /** set timer */
    export type Timer = BaseCommandDefault<'timer'>;
    /** set fan speed to low */
    export type LowSpeed = BaseCommandDefault<'lowSpeed'>;
    /** set fan speed to medium */
    export type MiddleSpeed = BaseCommandDefault<'middleSpeed'>;
    /** set fan speed to high */
    export type HighSpeed = BaseCommandDefault<'highSpeed'>;
    /** brightness up */
  }

  export type Fan =
    | Fan.Swing
    | Fan.Timer
    | Fan.LowSpeed
    | Fan.MiddleSpeed
    | Fan.HighSpeed
    | Fan.TurnOn
    | Fan.TurnOff;

  export namespace Light {
    export type TurnOff = Remote.TurnOff;
    export type TurnOn = Remote.TurnOn;
    export type BrightnessUp = BaseCommandDefault<'brightnessUp'>;
    /** brightness down */
    export type BrightnessDown = BaseCommandDefault<'brightnessDown'>;
  }

  export type Light =
    | Light.BrightnessUp
    | Light.BrightnessDown
    | Light.TurnOn
    | Light.TurnOff;
}

export type Remote =
  | Remote.AirConditioner
  | Remote.TV
  | Remote.Speaker
  | Remote.Fan
  | Remote.Light
  | Remote.UserDefined;

export type All =
  | Bot
  | Curtain
  | Lock
  | Humidifier
  | Plug
  | PlugMiniUS
  | PlugMiniJP
  | ColorBulb
  | StripLight
  | RobotVacuumCleanerS1
  | CeilingLight
  | Keypad
  | Remote;
