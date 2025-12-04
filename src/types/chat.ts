export interface TransferCard {
  type: 'transfer'
  title: string
  amount: string
  from: string
}

export interface WpsCard {
  type: 'wps'
  title: string
  subtitle: string
  cover: string
  source: string
  time: string
}

export type Card = TransferCard | WpsCard

export interface MessageItem {
  id: number
  nickname: string
  avatarUrl: string
  content: string
  time: string
  isSelf: boolean
  card?: Card
}
