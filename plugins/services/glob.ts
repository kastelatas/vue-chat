import * as core from "~/types/core"

export interface IGlob {
  modals: IModals
  layout: {
    error: boolean
  },
  cache: {
    [key: string]: core.IPromise
  }
}

export interface IModals {
  login: {
    show: boolean,
    done: (() => void) | null
  },
  forgot: {
    show: boolean
  },
  verification: {
    show: boolean
  },
  talkens: {
    show: boolean
  },
  payment: {
    show: boolean
  },
}

export default new class implements IGlob {
  modals = {} as IModals
  cache = {}
  layout = {
    error: false
  }
}
