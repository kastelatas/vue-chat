import _ from 'lodash'

export interface IConf {
  readonly domain: string,
  readonly host: string,
  readonly media: string,
  readonly api: {
    readonly domain: string,
    readonly host: string,
  }
  readonly chat: {
    readonly domain: string,
    readonly host: string,
    readonly url: string,
  }
}

class Conf implements IConf {
  constructor() {
    const domain = process.env.DOMAIN ?? 'dev.hugword.com';
    const schema = process.client ? location.protocol.substr(0, location.protocol.length - 1) : 'http';
    _.extend(this, {
      domain: domain,
      host: schema + '://' + domain,
      media: schema + '://' + 'api.' + domain + '/media',
      api: {
        domain: 'api.' + domain,
        host: schema + '://api.' + domain,
      },
      chat: {
        domain: 'api2.' + domain,
        host: schema + '://api2.' + domain,
        url: (schema == 'http' ? 'ws' : 'wss') + '://api2.' + domain + '/ws/',
      }
    })
  }

  domain;
  host;
  media;
  api;
  chat;
}

export default new Conf();
