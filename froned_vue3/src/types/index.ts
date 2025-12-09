// 奶茶数据结构定义
export interface Drink {
  /** 奶茶唯一标识 */
  id: string
  /** 奶茶名称 */
  name: string
  /** 价格 */
  price: number
  /** 图片地址 */
  image: string
  /** 描述信息 */
  description: string
  /** 所属店铺ID */
  shopId: string
}

// 店铺数据结构定义
export interface Shop {
  /** 店铺唯一标识 */
  id: string
  /** 店铺名称 */
  name: string
  /** 店铺Logo地址 */
  logo: string
  /** 店铺地址 */
  address: string
  /** 店铺提供的奶茶列表 */
  drinks: Drink[]
}

// 用户数据结构定义
export interface User {
  /** 用户ID */
  id: string
  /** 用户昵称 */
  nickname: string
  /** 用户头像地址 */
  avatar: string
}

// 应用状态结构定义
export interface AppState {
  /** 当前登录用户 */
  user: User
  /** 用户喜欢的奶茶列表 */
  favorites: Drink[]
  /** 用户喝过的奶茶历史记录 */
  history: Drink[]
  /** 当前首页展示的角色形象标识，例如 'doraemon' */
  currentCharacter: string
}
