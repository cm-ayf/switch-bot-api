import type { Device, Status } from '.';
import type { Command } from './index';
import type { Scene } from './scene';
import type { CreateWebhook, UpdateWebhook, Webhook } from './webhook';

export type Response<Body, ErrorCode extends number = 190> =
  | {
      statusCode: 100;
      message: string;
      body: Body;
    }
  | {
      statusCode: ErrorCode;
      message: string;
    };

type GetParams<Path extends string> =
  Path extends `${string}/{${infer Param}}${infer Rest}`
    ? Param | GetParams<Rest>
    : never;

interface Base {
  path: string;
  method: 'get' | 'post';
  params?: Record<GetParams<this['path']>, string>;
  body?: unknown;
  response: Response<unknown, number>;
}

export interface GetDevicesResponseBody {
  /** a list of physical devices */
  deviceList: Device.All[];
  /** a list of virtual infrared remote devices */
  infraredRemoteList: Device.VirtualInfraredRemote[];
}

export interface GetDevices extends Base {
  path: '/devices';
  method: 'get';
  response: Response<GetDevicesResponseBody>;
}

export interface GetDeviceStatus extends Base {
  path: '/devices/{deviceId}/status';
  method: 'get';
  params: {
    /** device ID */
    deviceId: string;
  };
  response: Response<Status.All>;
}

export interface SendDeviceControlCommand<
  Body extends Command.All = Command.All
> extends Base {
  path: '/devices/{deviceId}/commands';
  method: 'post';
  params: {
    /** device ID */
    deviceId: string;
  };
  body: Body;
  response: Response<
    Record<string, unknown>,
    151 | 152 | 160 | 161 | 171 | 190
  >;
}

export interface GetSceneList extends Base {
  path: '/scenes';
  method: 'get';
  response: Response<Scene[]>;
}

export interface ExecuteScene extends Base {
  path: '/scenes/{sceneId}/execute';
  method: 'post';
  params: {
    /** scene ID */
    sceneId: string;
  };
  response: Response<{}>;
}

export interface ConfigureWebhook extends Base {
  path: '/webhook/setupWebhook';
  method: 'post';
  body: CreateWebhook & {
    action: 'setupWebhook';
  };
  response: Response<{}>;
}

type GetWebhookConfigurationBody =
  | { action: 'queryUrl' }
  | { action: 'queryDetails'; urls: string[] };

interface GetWebhookConfigurationResponseItem {
  queryUrl: { urls: string[] };
  queryDetails: Webhook[];
}

export interface GetWebhookConfiguration<
  Action extends GetWebhookConfigurationBody['action']
> extends Base {
  path: '/webhook/queryWebhook';
  method: 'post';
  body: Extract<GetWebhookConfigurationBody, { action: Action }>;
  response: Response<GetWebhookConfigurationResponseItem[Action]>;
}

export interface UpdateWebhookConfiguration extends Base {
  path: '/webhook/queryWebhook';
  method: 'post';
  body: {
    action: 'updateWebhook';
    config: UpdateWebhook;
  };
  response: Response<{}>;
}

export interface DeleteWebhookConfiguration extends Base {
  path: '/webhook/deleteWebhook';
  method: 'post';
  body: {
    action: 'deleteWebhook';
    url: string;
  };
  response: Response<{}>;
}

export type All =
  | GetDevices
  | GetDeviceStatus
  | SendDeviceControlCommand
  | GetSceneList
  | ExecuteScene
  | ConfigureWebhook
  | GetWebhookConfiguration<'queryUrl'>
  | GetWebhookConfiguration<'queryDetails'>
  | UpdateWebhookConfiguration
  | DeleteWebhookConfiguration;
