export interface Group {
  id: number
  ownerId: number
  name: string
  sortOrder: number
  createdAt: string
  groupNotice: string
  status: number
  joinType: number
  alias: string
  groupAvatar: string
  templateId: number
  contactIds: number[]
}

export interface addGroup {
  ownerId: number
  name: string
  sortOrder: number
  groupNotice: string
  status: number
  joinType: number
  alias: string
  groupAvatar: string
  templateId: number
  contactIds: number[]
}
