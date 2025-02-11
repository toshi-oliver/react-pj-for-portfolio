export type Task = {
  id: number
  menuTitle: string
  menuDetail: string
  createdAt: Date
  updatedAt: Date
}

export type TasksResponse = {
  tasks: Task[]
  currentPage: number
  lastPage: number
  totalCount: number
}

export type CsrfToken = {
  csrf_token: string
}
export type Credential = {
  email: string
  password: string
}
