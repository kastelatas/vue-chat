import {load} from "~/store/index";
import * as core from '~/types/core'

export const actions = {
  async uploadImage(ctx, payload: string): Promise<core.IImage> { // base64 upload
    return load(ctx, null, '/image/upload', {method: 'post', data: {data: payload}}, {auth: true});
  },
  async uploadVideo(ctx, payload: FormData): Promise<core.IImage> {
    return load(ctx, null, '/media/video-upload', {method: 'post', data: payload}, {auth: true});
  }
}

export default {
  namespaced: true,
  actions
};
