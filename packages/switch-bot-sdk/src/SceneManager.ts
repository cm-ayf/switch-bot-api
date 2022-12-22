import type { Client } from './Client';
import type { Scene } from 'switch-bot-api-types';

export class SceneManager {
  constructor(public readonly client: Client) {}

  /**
   * get the list of scenes
   */
  async get() {
    return this.client.request({
      path: '/scenes',
      method: 'get',
    });
  }

  /**
   * execute a scene
   * @param sceneId id of the scene
   */
  async execute(sceneId: string): Promise<{}>;
  /**
   * execute a scene
   * @param scene scene object
   */
  async execute(scene: Scene): Promise<{}>;
  async execute(scene: string | Scene) {
    const sceneId = typeof scene === 'string' ? scene : scene.sceneId;
    return this.client.request({
      path: '/scenes/{sceneId}/execute',
      method: 'post',
      params: { sceneId },
    });
  }
}
