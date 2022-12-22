import axios, { AxiosInstance } from 'axios';
import { createHmac, randomUUID } from 'crypto';
import type { Request, Response } from './helper';
import { DeviceManager } from './DeviceManager';
import { SceneManager } from './SceneManager';
import { WebhookManager } from './WebhookManager';

export interface ClientOptions {
  secretKey: string;
  openToken: string;
  version?: 'v1.1';
}

export class Client {
  private secretKey: string;
  private openToken: string;
  public readonly version: string;
  private axios: AxiosInstance;

  public readonly devices: DeviceManager;
  public readonly scenes: SceneManager;
  public readonly webhook: WebhookManager;

  constructor(options: ClientOptions) {
    this.secretKey = options.secretKey;
    this.openToken = options.openToken;
    this.version = options.version ?? 'v1.1';
    this.axios = axios.create({
      baseURL: `https://api.switch-bot.com/${this.version}`,
      headers: {
        Authorization: this.openToken,
      },
    });

    this.devices = new DeviceManager(this);
    this.scenes = new SceneManager(this);
    this.webhook = new WebhookManager(this);
  }

  /** @internal */
  async request<R extends Request>({
    path,
    method,
    params,
    body,
  }: R): Promise<Response<R>> {
    const response = await this.axios.request({
      url: path.replace(/\/{(\w+)}/g, (_, key) => {
        // @ts-expect-error ensured by typing
        return params[key];
      }),
      method,
      headers: {
        ...this.createRequestHeaders(),
        ...(body ? { 'Content-Type': 'application/json' } : {}),
      },
      data: body,
    });

    if (response.status === 200 && response.data.statusCode === 100) {
      return response.data.body;
    } else {
      throw new Error(response.data.message); // TODO: better error
    }
  }

  private createRequestHeaders() {
    const t = Date.now();
    const nonce = randomUUID();
    const data = `${this.openToken}${t}${nonce}`;
    const sign = createHmac('sha256', this.secretKey)
      .update(data)
      .digest('base64');
    return { sign, nonce, t };
  }
}
