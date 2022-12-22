import type { Client } from './Client';
import type { AvailableCommands, DeviceWithCommand } from './helper';
import type { Command, Device, Status } from 'switch-bot-api-types';

export class DeviceManager {
  constructor(public readonly client: Client) {}

  /**
   * get the list of devices
   */
  async get() {
    return this.client.request({
      path: '/devices',
      method: 'get',
    });
  }

  /**
   * get the status of a device
   * @param deviceId id of the device
   */
  async getStatus(deviceId: string): Promise<Status.All>;
  /**
   * get the status of a device.
   * assuming that the device type is known, the return type is narrowed down.
   * @param device device object
   */
  async getStatus<D extends Device.Base>(
    device: D | string
  ): Promise<Extract<Status.All, Pick<D, 'deviceType'>>>;
  async getStatus(device: string | Device.Base) {
    const deviceId = typeof device === 'string' ? device : device.deviceId;
    return this.client.request({
      path: `/devices/{deviceId}/status`,
      method: 'get',
      params: { deviceId },
    });
  }

  /**
   * execute a command on a device.
   * @param deviceId id of the device
   * @param command command object
   */
  async execute(deviceId: string, command: Command.All): Promise<{}>;
  /**
   * execute a command on a device.
   * assuming that the device type is known, the command type is narrowed down.
   * @param device device object
   * @param command command object, narrowed down by the device type
   */
  async execute<D extends DeviceWithCommand>(
    device: D,
    command: AvailableCommands[D['deviceType']]
  ): Promise<{}>;
  async execute(device: string | Device.Base, command: Command.All) {
    const deviceId = typeof device === 'string' ? device : device.deviceId;
    return this.client.request({
      path: `/devices/{deviceId}/commands`,
      method: 'post',
      params: { deviceId },
      body: command,
    });
  }
}
