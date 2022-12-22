import type { Client } from './Client';
import type { Response } from './helper';
import type { Endpoint, UpdateWebhook } from 'switch-bot-api-types';

export class WebhookManager {
  constructor(public readonly client: Client) {}

  /**
   *
   * @param webhook
   * @returns
   */
  async create(url: string) {
    return this.client.request({
      path: '/webhook/setupWebhook',
      method: 'post',
      body: { action: 'setupWebhook', url, deviceList: 'ALL' },
    });
  }

  /**
   * get the list of webhooks in details
   * @param urls the list of webhook urls to get details of
   */
  async get(
    urls: string[]
  ): Promise<Response<Endpoint.GetWebhookConfiguration<'queryDetails'>>>;
  /**
   * get the list of webhooks
   */
  async get(): Promise<Response<Endpoint.GetWebhookConfiguration<'queryUrl'>>>;
  async get(urls?: string[]) {
    if (urls) {
      return this.client.request({
        path: '/webhook/queryWebhook',
        method: 'post',
        body: { action: 'queryDetails', urls },
      });
    } else {
      return this.client.request({
        path: '/webhook/queryWebhook',
        method: 'post',
        body: { action: 'queryUrl' },
      });
    }
  }

  /**
   * update a webhook
   * @param url the url of the webhook to update
   * @param webhook the new configuration of the webhook
   */
  async update(url: string, webhook: UpdateWebhook) {
    return this.client.request({
      path: '/webhook/queryWebhook',
      method: 'post',
      body: { action: 'updateWebhook', url, config: webhook },
    });
  }

  /**
   * delete a webhook
   * @param url the url of the webhook to delete
   */
  async delete(url: string) {
    return this.client.request({
      path: '/webhook/deleteWebhook',
      method: 'post',
      body: { action: 'deleteWebhook', url },
    });
  }
}
