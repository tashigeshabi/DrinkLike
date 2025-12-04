// 地址相关类型定义

// 地址信息接口
export interface Address {
  id?: number
  userId?: number
  province: string // 省份
  city: string // 城市
  district: string // 县/区
  detail: string // 具体位置(门牌号)
  isDefault: number // 是否为默认地址
  receiverName: string // 收货人姓名
  receiverPhone: string // 收货人电话
  createdAt?: string
  updatedAt?: string
}

// 创建地址请求
export interface CreateAddressRequest {
  userId: number
  province: string
  city: string
  district: string
  detail: string
  isDefault: number // 0: 不是默认地址, 1: 是默认地址
  receiverName: string
  receiverPhone: string
}

// 更新地址请求
export interface UpdateAddressRequest {
  id: number
  province?: string
  city?: string
  district?: string
  detail?: string
  isDefault?: number
  receiverName?: string
  receiverPhone?: string
}

// 地址列表响应
export interface AddressListResponse {
  code: number
  data: Address[]
  msg: string
}

// 省市区数据结构
export interface RegionData {
  code: string
  name: string
  children?: RegionData[]
}

// 地址选择器数据
export interface AddressPickerData {
  provinces: RegionData[]
  cities: RegionData[]
  districts: RegionData[]
}
