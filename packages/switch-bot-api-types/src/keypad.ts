export interface Key {
  /** passcode ID */
  id: number;
  /** name of the passcode */
  name: string;
  /**
   * type of the passcode
   * - `permanent`: a permanent passcode
   * - `timeLimit`: a temporary passcode
   * - `disposable`: a one-time passcode
   * - `urgent`: an emergency passcode
   */
  type: 'permanent' | 'timeLimit' | 'disposable' | 'urgent';
  /**
   * the passcode string encrypted with the developer secret key
   * using the AES-128-CBC algorithm
   */
  password: string;
  /** an arbitrary number used for encryption */
  iv: string;
  /**
   * validity of the passcode
   * - `normal`: the passcode is valid
   * - `expired`: the passcode is invalid
   */
  status: 'normal' | 'expired';
  /** the time when the passcode is generated */
  createTime: number;
}

interface BaseCreateKey extends Pick<Key, 'name' | 'type'> {
  /** a 6 to 12-digit passcode in plain text */
  password: string;
}

interface CreateLimitedKey extends BaseCreateKey {
  type: 'disposable' | 'timeLimit';
  /** a 6 to 12-digit passcode in plain text */
  password: string;
  /**
   * set the time the passcode becomes valid from,
   * mandatory for one-time passcode and temporary passcode.
   * a 10-digit timestamp.
   */
  startTime: number;
  /**
   * set the time the passcode becomes expired,
   * mandatory for one-time passcode and temporary passcode.
   * a 10-digit timestamp.
   */
  endTime: number;
}

interface CreateUnlimitedKey extends BaseCreateKey {
  type: 'disposable' | 'timeLimit';
}

export type CreateKey = CreateLimitedKey | CreateUnlimitedKey;

export type DeleteKey = Pick<Key, 'id'>; // TODO: check if really number
