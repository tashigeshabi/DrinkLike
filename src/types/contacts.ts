export interface Contact {
  /** 通讯录ID */
  id: number
  /** 所有人ID */
  ownerId: number
  /** 联系人ID */
  contactId: number
  /** 联系人名称 */
  contactName: string
  /** 联系人类型 */
  contactType: string
  /** 关系类型 */
  relationType: string
  /** 备注 */
  alias: string
  /** 最后登录时间 */
  lastContactTime: string
  /** 用户名 */
  username: string
  /** 手机号 */
  phone: string
  /** 头像URL */
  avatarUrl: string
  /** 邮箱 */
  email: string
  /** 地址 */
  address: string
}
// 添加联系人/群聊
export interface AddContactRequest {
  /** 所有人ID */
  ownerId: number
  /** 所有人名称 */
  ownerName: string
  /** 联系人ID */
  contactId: number
  /** 联系人名称 */
  contactName: string
  /** 联系人类型 */
  contactType: string
  /** 关系类型 */
  relationType: string
  /** 备注 */
  alias: string
  /** 联系人头像 */
  contactAvatar: string
  /** 所有人头像 */
  ownerAvatar: string
}
