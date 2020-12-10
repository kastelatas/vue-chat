import {IConf} from '~/plugins/services/conf'
import {IGlob} from '~/plugins/services/glob'
import {IWs} from '~/plugins/services/ws'
import {UUID} from 'vue-uuid'

declare module 'vue/types/vue' {
  export interface Vue {
    $uuid: UUID
    $conf: IConf
    $glob: IGlob
    $ws: IWs
    $wait: { (check: { () }, timeout?: number) }
  }
}
