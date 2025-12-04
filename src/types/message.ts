export interface ChatMessage {
  messageId: number
  sendUserId: number
  sendUserNickName: string
  contactId: number
  messageType: number
  messageContent: string
  contactType: number // 0,单聊
  sendTime: string
  isRead: boolean
  sessionId: string // 会话id
  status: number // 0,未发送 1,已发送 2,已接收 3,已读取
  memberCount: number // 会话成员数
  templateId?: string // 模板ID（当messageType为1时使用）
  templateData?: any // 模板数据（当messageType为1时使用）
  contactAvatar: string
  sendUserAvatar: string
  contactName: string
}

export interface ChatSession {
  sessionId: string
  userId: number
  contactId: number
  contactName: string
  lastMessage: string
  lastReceiveTime: string
  unreadCount: number
  sessionType: number // 0,单聊 1,群聊
  contactAvatar: string
  lastMessageId: number
}
export interface MessageListParams {
  sessionId: string
  page?: number
  limit?: number
  lastMessageId?: number
}

// 消息类型常量
export const MESSAGE_TYPE = {
  NORMAL: 0, // 普通消息
  TEMPLATE: 1, // 模板消息
  // 其他类型待定
} as const

export type MessageType = (typeof MESSAGE_TYPE)[keyof typeof MESSAGE_TYPE]
