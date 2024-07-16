import { rootApi } from 'app/api'
import jwt from 'jsonwebtoken'

export interface ITopic {
  id: number
  title: string
  content: string
}

class TopicsRequests {
  private static baseUrl: string
  private readonly token: string

  constructor() {
    // TODO: remove /api when the environment is set up
    TopicsRequests.baseUrl = '/api/topics'
    this.token = jwt.sign({ id: 887 }, 'myjwtsecretkey', { expiresIn: '240h' })
  }

  getTopics() {
    return rootApi.get<ITopic[]>(`${TopicsRequests.baseUrl}`, this.getHeaders())
  }

  createTopic(data: Partial<ITopic>) {
    return rootApi.post(`${TopicsRequests.baseUrl}`, data, this.getHeaders())
  }

  updateTopic(id: number, data: ITopic) {
    return rootApi.put(
      `${TopicsRequests.baseUrl}/${id}`,
      data,
      this.getHeaders()
    )
  }

  deleteTopic(id: number) {
    return rootApi.delete(`${TopicsRequests.baseUrl}/${id}`, this.getHeaders())
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

export default TopicsRequests
