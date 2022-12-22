export interface Webhook {
  /** the url where all the events are sent to */
  url: string;
  createTime: number;
  lastUpdateTime: number;
  /** the list of device ids, currently only supports 'ALL */
  deviceList: 'ALL'; // TODO: any update here?
  enable: boolean;
}

export type CreateWebhook = Pick<Webhook, 'url' | 'deviceList'>;

export type UpdateWebhook = Partial<Pick<Webhook, 'url' | 'enable'>>;
