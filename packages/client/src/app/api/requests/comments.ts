import { rootApi } from 'app/api'
import jwt from 'jsonwebtoken'

export interface IComment {
  topicId: number
  content: string
  id: number
  userId?: number
  createdAt?: string
}

class CommentsRequests {
  private static baseUrl: string
  private static baseUrlTopics: string
  private readonly token: string

  constructor() {
    CommentsRequests.baseUrl = '/comments'
    CommentsRequests.baseUrlTopics = '/topics'
    let id = 0
    if (typeof localStorage !== 'undefined') {
      const user = localStorage.getItem('user')!
      id = user && user !== 'undefined' ? JSON.parse(user)?.id : null
    }
    this.token = jwt.sign({ id }, 'myjwtsecretkey', { expiresIn: '240h' })
  }

  getComments(topicId: number) {
    return rootApi.get<IComment[]>(
      `${CommentsRequests.baseUrlTopics}/${topicId}/comments`,
      this.getHeaders()
    )
  }

  createComment(topicId: number, data: Partial<IComment>) {
    return rootApi.post(
      `${CommentsRequests.baseUrlTopics}/${topicId}/comments`,
      data,
      this.getHeaders()
    )
  }

  updateComment(id: number, data: IComment) {
    return rootApi.put(
      `${CommentsRequests.baseUrl}/${id}`,
      data,
      this.getHeaders()
    )
  }

  deleteComment(id: number) {
    return rootApi.delete(
      `${CommentsRequests.baseUrl}/${id}`,
      this.getHeaders()
    )
  }

  private getHeaders() {
    return {
      headers: {
        Authorization: `Bearer ${this.token}`,
        'Content-Type': 'application/json',
      },
    }
  }
}

export default CommentsRequests
