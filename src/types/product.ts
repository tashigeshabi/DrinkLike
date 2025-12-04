// 商品添加请求接口
export interface ProductsReq {
  userId: number
  name: string // 商品名称
  description?: string // 商品描述
  images: string // 商品图片列表
  categories: string // 商品分类
  specifications: ProductSpecificationReq[] // 商品规格列表
  status: 'active' | 'inactive' // 商品状态
  isRecommended?: boolean // 是否推荐
}

// 商品规格请求接口
export interface ProductSpecificationReq {
  id?: number
  name: string // 规格值名称，如"红色大号"、"蓝色小号"
  price: number // 该规格的价格
  stock: number // 该规格的库存
  unit: string // 库存单位，如"g"、"kg"、"ml"、"个"
}

// 商品添加响应接口
export interface ProductAddResponse {
  msg: string
  data: Object
  code: number
}

// 商品列表查询请求接口
export interface ProductListQuery {
  userId: number
  page?: number // 页码
  pageSize?: number // 每页数量
  categories: string // 分类ID
  keyword?: string // 搜索关键词
  status?: 'active' | 'inactive' // 商品状态
  isRecommended?: boolean // 是否推荐
}

// 商品列表响应接口
export interface ProductListResponse {
  list: ProductInfo[]
  total: number
  page: number
  pageSize: number
}

// 商品信息接口
export interface ProductInfo {
  id: number
  name: string // 商品名称
  description?: string // 商品描述
  images: string // 商品图片列表
  categories: string // 商品分类
  specifications: readonly ProductSpecificationReq[] // 商品规格列表
  status: 'active' | 'inactive' // 商品状态
  isRecommended: boolean // 是否推荐
  createdAt: string // 创建时间
  updatedAt: string // 更新时间
}

// 模板提交商品信息接口
export interface TemplateSubmitProductReq {
  templateId: number
  userId: number
  instanceId: number
  id: number
  name: string // 商品名称
  description?: string // 商品描述
  images: string // 商品图片列表
  categories: string // 商品分类
  status: 'active' | 'inactive' // 商品状态
  isRecommended: boolean // 是否推荐
  createdAt: string // 创建时间
  updatedAt: string // 更新时间
  specsId?: number
  specsName: string // 规格值名称，如"红色大号"、"蓝色小号"
  price: number // 该规格的价格
  stock: number // 该规格的库存
  unit: string // 库存单位，如"g"、"kg"、"ml"、"个"
  quantity: number //数量
}

// 商品更新请求接口
export interface ProductUpdateReq {
  id: number
  name?: string // 商品名称
  description?: string // 商品描述
  images?: string // 商品图片列表
  categories?: string // 商品分类ID
  specifications?: ProductSpecificationReq[] // 商品规格列表
  status?: 'active' | 'inactive' // 商品状态
  isRecommended?: boolean // 是否推荐
}

// 商品删除请求接口
export interface ProductDeleteReq {
  id: number
}

// 商品状态更新请求接口
export interface ProductStatusUpdateReq {
  id: number
  status: 'active' | 'inactive'
}
