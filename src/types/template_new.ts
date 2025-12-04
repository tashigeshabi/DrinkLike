// 字段类型枚举
export type FieldType =
  | 'text'
  | 'number'
  | 'date'
  | 'image'
  | 'product'
  | 'single_choice'
  | 'multiple_choice'

// 基础字段配置接口
export interface BaseFieldConfig {
  id: string
  label: string
  required: boolean
}

// 文本字段配置
export interface TextFieldConfig extends BaseFieldConfig {
  type: 'text'
  placeholder?: string
  minLength?: number
  maxLength?: number
}

// 数字字段配置
export interface NumberFieldConfig extends BaseFieldConfig {
  type: 'number'
  placeholder?: string
  min?: number
  max?: number
}

// 日期字段配置
export interface DateFieldConfig extends BaseFieldConfig {
  type: 'date'
  placeholder?: string
  mode?: 'date' | 'datetime' | 'time'
  minDate?: string
  maxDate?: string
}

// 图片字段配置
export interface ImageFieldConfig extends BaseFieldConfig {
  type: 'image'
  maxCount?: number
  maxSize?: number // KB
  allowedTypes?: string[]
}

// 商品规格接口 - 与product.ts保持一致
export interface ProductSpec {
  id?: number
  name: string // 规格值名称，如"红色大号"、"蓝色小号"
  price: number // 该规格的价格
  stock: number // 该规格的库存
  unit: string // 库存单位，如"g"、"kg"、"ml"、"个"
}

// 商品数据接口 - 与product.ts的ProductInfo保持一致
export interface ProductData {
  userId?: number
  id: number
  name: string // 商品名称
  description?: string // 商品描述
  images: string // 商品图片列表
  categories: string // 商品分类
  specifications: readonly ProductSpec[] // 商品规格列表
  status: 'active' | 'inactive' // 商品状态
  isRecommended: boolean // 是否推荐
  quantity?: number // 商品数量，用于模板字段中的商品选择
  createdAt?: string // 创建时间
  updatedAt?: string // 更新时间
}

// 模板商品接口 - 用于模板创建时的商品管理
export interface TemplateProduct {
  id: string
  templateId: string
  name: string // 商品名称
  description?: string // 商品描述
  images: string // 商品图片列表
  categories: string // 商品分类
  specifications: ProductSpec[] // 商品规格列表
  status: 'active' | 'inactive' // 商品状态
  isRecommended?: boolean // 是否推荐
  createdAt: string
  updatedAt: string
}

// 创建模板商品的请求接口
export interface CreateTemplateProductRequest {
  templateId: string
  name: string // 商品名称
  description?: string // 商品描述
  images: string // 商品图片列表
  categories: string // 商品分类
  specifications: ProductSpec[] // 商品规格列表
  status: 'active' | 'inactive' // 商品状态
  isRecommended?: boolean // 是否推荐
}

// 更新模板商品的请求接口
export interface UpdateTemplateProductRequest {
  id: string
  name?: string // 商品名称
  description?: string // 商品描述
  images?: string // 商品图片列表
  categories?: string // 商品分类ID
  specifications?: ProductSpec[] // 商品规格列表
  status?: 'active' | 'inactive' // 商品状态
  isRecommended?: boolean // 是否推荐
}

// 模板商品列表查询参数
export interface TemplateProductListParams {
  templateId: string
  keyword?: string
  page?: number
  pageSize?: number
}

// 商品字段配置
export interface ProductFieldConfig extends BaseFieldConfig {
  type: 'product'
  showStock?: boolean
  showDescription?: boolean
  showImage?: boolean
  showSpecs?: boolean
  selectedProducts?: ProductData[] // 预选的商品列表
  maxSelectCount?: number // 最大选择数量
  allowMultiple?: boolean // 是否允许多选
  allowQuantity?: boolean // 是否允许调整数量
  maxQuantity?: number // 最大数量限制
}

// 选择项接口
export interface ChoiceOption {
  id: string
  label: string
  value: string
  isOther?: boolean
}

// 单选字段配置
export interface SingleChoiceFieldConfig extends BaseFieldConfig {
  type: 'single_choice'
  options: ChoiceOption[]
  allowOther?: boolean
}

// 多选字段配置
export interface MultipleChoiceFieldConfig extends BaseFieldConfig {
  type: 'multiple_choice'
  options: ChoiceOption[]
  allowOther?: boolean
  minCount?: number
  maxCount?: number
}

// 字段配置联合类型
export type FieldConfig =
  | TextFieldConfig
  | NumberFieldConfig
  | DateFieldConfig
  | ImageFieldConfig
  | ProductFieldConfig
  | SingleChoiceFieldConfig
  | MultipleChoiceFieldConfig

// 字段接口
export interface Field {
  id: string
  type: FieldType
  config: FieldConfig
  order: number
}

// 模板信息接口
export interface TemplateInfo {
  name: string
  description: string
  coverImage?: string
  goods?: number[] // 商品ID数组，用于存储选中的商品
}

// 模板数据接口
export interface TemplateData {
  info: TemplateInfo
  fields: Field[]
}

// 图片项接口
export interface ImageItem {
  url: string
  name?: string
  size?: number
}

// 上传文件接口 - uni-app版本
export interface UploadFileParams {
  filePath: string
  fileName?: string
}

// 上传文件接口 - 兼容版本
export interface UploadFileCompatParams {
  file: File
}

// 上传响应接口
export interface UploadResponse {
  code: number
  message: string
  data: {
    url: string
    filename: string
    size: number
  }
}

// 上传接口定义
export interface UploadAPI {
  uploadFile(filePath: string, fileName?: string): Promise<UploadResponse>
  uploadFileCompat(file: File): Promise<UploadResponse>
}

// 组件通用Props接口
export interface BaseFieldProps<T = any> {
  config: FieldConfig
  modelValue?: T
  readonly?: boolean
  editMode?: boolean
}

// 组件通用Emits接口
export interface BaseFieldEmits<T = any> {
  (e: 'update:modelValue', value: T): void
  (e: 'validate', isValid: boolean): void
}

// 注意：ProductData接口已在上方定义，此处为重复定义，已移除

// 模板实例状态类型
export type TemplateInstanceStatus = 'active' | 'completed' | 'paused' | 'cancelled'

// 基础模板接口
export interface Template {
  id: number
  name: string
  description: string
  coverImage?: string
  fields?: Field[]
  createdAt: string
  updatedAt: string
}

// 模板实例接口
export interface TemplateInstance {
  id: number
  templateId: number
  userId: number
  instanceName: string
  startDate: string
  endDate?: string
  remarks?: string
  status: TemplateInstanceStatus
  formData?: Record<string, any> | string
  images: string
  isFill?: 'yes' | 'no' | null
  template?: Template
  createdAt: string
  updatedAt: string
}

// 创建模板实例请求接口
export interface CreateTemplateInstanceRequest {
  userId: number
  templateId: number
  instanceName: string
  startDate: string
  endDate?: string
  remarks?: string
  formData?: Record<string, any>
  images?: string
  isFill?: 'yes' | 'no'
}

// 更新模板实例请求接口
export interface UpdateTemplateInstanceRequest {
  id: number
  instanceName?: string
  startDate?: string
  endDate?: string
  remarks?: string
  status?: TemplateInstanceStatus
  formData?: Record<string, any>
}

// 模板实例列表查询参数
export interface TemplateInstanceListParams {
  templateId?: number
  userId?: number
  status?: TemplateInstanceStatus
  keyword?: string
  page?: number
  pageSize?: number
  isFill?: 'yes' | 'no'
}

// 分发模板请求接口
export interface ShareTemplateRequest {
  templateId: number
  instanceName: string
  startDate: string
  endDate?: string
  remarks?: string
  shareToUsers?: number[] // 分发给特定用户
  isPublic?: boolean // 是否公开分发
}
