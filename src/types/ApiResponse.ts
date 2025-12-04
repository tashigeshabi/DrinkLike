// 通用响应结构
export interface ApiResponse<T> {
  code: number
  msg: string
  data: T
  error: string | null
}
