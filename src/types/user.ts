export interface User {
  /** 用户ID */
  id: number
  /** 全局唯一标识符 */
  uuid: string
  /** 用户角色 */
  role: string
  /** 用户名 */
  username: string
  /** 密码哈希 */
  password: string
  /** 手机号 */
  phone: string
  /** 邮箱 */
  email: string
  /** 头像URL */
  avatarUrl: string
  /** 账户状态 */
  status: string
  /** 创建时间 */
  createdAt: string // LocalDateTime 建议用 string
  /** 更新时间 */
  updatedAt: string
  /** 最后一次登录时间 */
  lastLogin: string
  /** 地址 */
  address?: string
  /** 个性签名 */
  signature?: string
  /** 性别 */
  sex?: number
  /** 生日 */
  age?: number
  /**
   * openid
   */
  openid?: string
  /**
   * unionid */
  unionid?: string
}
// 注册请求体
export interface RegisterUser {
  phone: string

  username: string

  password: string

  code: string
}
