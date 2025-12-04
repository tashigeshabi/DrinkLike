// 商品规格值接口
export interface ProductSpecValue {
  id: string
  name: string // 规格值名称，如"红色"、"L码"
  price: number // 该规格值的价格
  stock: number // 该规格值的库存
  unit: string // 库存单位，如"g"、"kg"、"ml"、"个"
}

// 商品规格接口
export interface ProductSpecification {
  id: string
  name: string // 规格名称，如"颜色"、"尺寸"
  values: ProductSpecValue[] // 规格值列表
}

// 原有商品规格接口（保持兼容性）
export interface ProductSpec {
  id: string
  name: string // 规格名称，如"500ml"、"1斤"、"大号"
  price: number // 该规格的价格
  stock: number // 该规格的库存
  unit: string // 单位，如"ml"、"斤"、"个"
}

// 商品接口
export interface Product {
  id: string
  name: string // 商品名称
  description: string // 商品描述
  image?: string // 商品主图片（保持兼容性）
  images: string // 商品图片列表
  price: number // 销售价格
  originalPrice?: number // 原价
  stock: number // 库存
  sales?: number // 销量
  category?: string // 商品分类
  categoryId?: string // 商品分类ID
  specs?: ProductSpec[] // 商品规格列表（原有）
  specifications?: ProductSpecification[] // 商品规格列表（新）
  defaultSpecId?: string // 默认规格ID
  status: 'active' | 'inactive' // 商品状态
  isAvailable?: boolean // 是否可售（保持兼容性）
  isRecommended?: boolean // 是否推荐
  createdAt: string
  updatedAt: string
}

// 购物车商品项接口
export interface CartItem {
  id: string
  productId: string
  product: Product
  specId: string // 选中的规格ID
  spec: ProductSpec // 选中的规格信息
  quantity: number // 数量
  addedAt: string
}

// 购物车接口
export interface Cart {
  items: CartItem[]
  totalAmount: number // 总金额
  totalQuantity: number // 总数量
}

// 订单状态枚举
export enum OrderStatus {
  PENDING = 'pending', // 待支付
  PAID = 'paid', // 已支付
  SHIPPED = 'shipped', // 已发货
  DELIVERED = 'delivered', // 已送达
  CANCELLED = 'cancelled', // 已取消
  REFUNDED = 'refunded', // 已退款
}

// 订单项接口
export interface OrderItem {
  id: string
  productId: string
  productName: string
  productImage: string
  specId: string
  specName: string
  price: number // 下单时的价格
  unit: string // 库存单位
  quantity: number
  subtotal: number // 小计
}

// 订单接口
export interface Order {
  id: string
  userId: string
  items: OrderItem[]
  totalAmount: number
  status: OrderStatus
  createdAt: string
  updatedAt: string
  paidAt?: string
  shippedAt?: string
  deliveredAt?: string
}

// 商家信息接口
export interface MerchantInfo {
  id: string
  userId: string
  shopName: string // 店铺名称
  shopDescription: string // 店铺描述
  shopLogo: string // 店铺logo
  contactPhone: string // 联系电话
  address: string // 店铺地址
  isVerified: boolean // 是否已认证
  createdAt: string
  updatedAt: string
}
