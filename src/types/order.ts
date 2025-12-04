// 订单相关类型定义

// 模板信息接口
export interface TemplateInfo {
  id?: string
  name: string
  description?: string
  [key: string]: any
}

// 商品信息接口
export interface ProductInfo {
  id: string
  name: string
  specification?: string
  price: number
  quantity: number
  image?: string
  productId?: string
  productName?: string
  productImage?: string
  specId?: string
  specName?: string
  subtotal?: number
  unit?: string
  [key: string]: any
}

// 订单数据接口
export interface OrderData {
  id?: number
  orderNo?: string
  templateId: number
  instanceId: number
  products: ProductInfo[]
  contactName: string
  contactPhone: string
  recipientName: string
  recipientPhone: string
  address: string
  expectedDate: string
  timeSlot: string
  remark: string
  deliveryFee: number
  totalAmount: number
  productTotal: number
  templateInstanceId: number
  templateInfo: TemplateInfo | null
  formData: any
  createTime: string
  isPay: boolean
  userId?: number
  status?: OrderStatus
  payTime?: string
  updateTime?: string
  merchantId?: number
}

// 订单状态枚举
export enum OrderStatus {
  PENDING = 'PENDING', // 待支付
  PAID = 'PAID', // 已支付
  PROCESSING = 'PROCESSING', // 处理中
  SHIPPING = 'SHIPPING', // 已发货
  COMPLETED = 'COMPLETED', // 已完成
  CANCELLED = 'CANCELLED', // 已取消
  DELIVERED = 'DELIVERED', // 已发货
  REFUNDED = 'REFUNDED', // 已退款
}

// 创建订单请求接口
export interface CreateOrderRequest {
  userId: number
  templateId: number
  instanceId: number
  templateInfo: TemplateInfo
  formData: any
  products: ProductInfo[]
  recipientName: string
  recipientPhone: string
  address: string
  contactName: string
  contactPhone: string
  expectedDate: string
  timeSlot: string
  remark?: string
  totalAmount: number
  productTotal: number
  deliveryFee: number
  templateInstanceId: number
  merchantId?: number
}

// 订单响应接口
export interface OrderResponse {
  id: number
  orderNo: string
  status: OrderStatus
  createTime: string
  totalAmount: number
  [key: string]: any
}

// 订单列表查询参数
export interface OrderListQuery {
  page?: number
  size?: number
  status?: OrderStatus
  startDate?: string
  endDate?: string
  keyword?: string
  userId?: number
  merchantId?: number
}

// 订单列表响应
export interface OrderListResponse {
  records: OrderData[]
  total: number
  page: number
  size: number
}

// 更新订单状态请求接口
export interface UpdateOrderStatusRequest {
  orderId: number
  status: OrderStatus
  remark?: string
}

// 后端返回订单信息
export interface OrderInfo {
  appId: string
  partnerId: string
  prepayId: string
  packageVal: string
  nonceStr: string
  timestamp: string
  paySign: string
  signType: string
  templateId?: number
  templateName?: string
  instanceId?: number
  totalAmount?: number
  merchantId?: number
}

export interface PaymentData {
  package: string
  nonceStr: string
  timeStamp: string
  signType: string
  paySign: string
}

// 商家订单管理相关类型定义

// 收货地址信息
export interface ShippingAddress {
  id: string
  receiverName: string
  receiverPhone: string
  province: string
  city: string
  district: string
  detail: string
  isDefault: boolean
}

// 订单商品项（商家视角）
export interface OrderItem {
  id: string
  productId: string
  name: string
  image: string
  price: number
  quantity: number
  specification?: string
}

// 商家订单状态类型
export type MerchantOrderStatus = 'pending' | 'processing' | 'completed' | 'cancelled'

// 商家订单信息
export interface Order {
  id: string
  orderNumber: string
  customerId: string
  customerName: string
  customerPhone: string
  status: MerchantOrderStatus
  totalAmount: number
  createdAt: string
  updatedAt: string
  items: OrderItem[]
  shippingAddress: ShippingAddress
  remark?: string
}

// 订单统计信息
export interface OrderStats {
  total: number
  pending: number
  processing: number
  completed: number
  cancelled: number
}
