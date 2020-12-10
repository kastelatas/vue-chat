// Types

export interface TMap<T> {
  [key: string]: T
}

export interface TList<T> {
  map()

  [index: number]: T
}

export interface TSMap extends TMap<string> {
}

export interface TSList extends TList<string> {
}

export interface TSListMap extends TMap<TSList> {
}

export interface TSMapList extends TList<TSMap> {
}

// Functions

export function rand(min: number, max: number) {
  return Math.random() * (max - min) + min;
}

// Infrastructure

export interface ILightBoxImage {
  thumb?: string,
  src: string,
  caption?: string,
  srcset?: string
}

export interface IPromise extends Promise<any> {
  done(): number | null
}

// Domain

export enum EUserGender {
  Male = 1,
  Female = 2
}

export enum EUserType {
  Client = 1,
  Ambassador = 2
}

export interface ISort {
  attribute: string
  reverse: boolean
}

export interface IResponse {
  success: boolean
  data: any
  errors: any
}

export interface IAuth {
  id: number | null
  token: string | null
  identity: IClient | IAmbassador | null
  user?: IUser | null // TODO remove property
}

export interface IIdent {
  id: number | null
  type: EUserType | null
}

export interface ISettings {
  notification_news: boolean,
  notification_comments: boolean,
  notification_achievements: boolean,
  notification_reactions: boolean,
  notification_birthdays: boolean,
  email_news: boolean,
  email_achievements: boolean,
  email_financial_transactions: boolean,
  email_monthly_analytics: boolean,
}

export interface IUser {
  id: number
  type: number
  status: number
  email: string
  talkens: number,
  bonuses: number,
  profile: IProfile
  setting: ISettings
  state: { online: boolean, favorite: boolean }
}

export interface INews {
  content: string
  description: string
  id: number
  photo_id: number
  preview: { id: number, path: string }
  preview_id: number
  published_at: number
  slug: string
  title: string
}

export interface IProfile {
  readonly id: number
  name: string
  gender: number | null
  description: string
  avatar: IImage
  cover: IImage
  photos: IProfilePhoto[]
  topics: IProfileTopic[]
  rankTitle?: string
}

export interface IClientProfile extends IProfile {

}

export interface IClient extends IUser {
  profile: IClientProfile
}

export interface IAmbassador extends IUser {
  profile: IAmbassadorProfile
  invite: IInvite | null
}

export interface IAmbassadorProfile extends IProfile {
  price: number
  state: { reviewed: boolean }
  videos: IProfilePhoto[]
  rating: IAmbassadorProfileRating
  comments: IAmbassadorProfileComment[]
}

export interface IAmbassadorProfileRating {
  readonly count: number
  readonly rating: number
}

export interface IAmbassadorProfileComment {
  id: number
  client: IClient
  message: string
  created_at: number
  rating: number
}

export interface ITopic {
  id: number
  slug: string
  title: string
  video: IVideo
  ambassadorsCount: number
}

export interface IFaq {
  id: number
  slug: string
  title: string
  content: string
}

export interface IProfilePhoto {
  id?: number
  image_id: number
  image: IImage
}

export interface IProfileTopic {
  id?: number
  topic_id: number
  topic: ITopic
}

export interface IProfileVideo {
  id?: number
  video_id: number
  video: IVideo
}

export interface IImage {
  id: number
  image_id?: number
  path: string
}

export interface IVideo {
  id: number
  path: string
  sources: TSMap
}

export interface IInvite {
  id: number
  ambassador_id: number
  topic_id: number
  text: string
  status: number
  created_at: number
  target_all: boolean
  target_contacts: boolean
  topic: ITopic
}

export interface IPage {
  id: number,
  title: string,
  description: string,
  content: string,
}
