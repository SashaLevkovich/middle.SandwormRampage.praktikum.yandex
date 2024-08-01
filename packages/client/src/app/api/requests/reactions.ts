import { rootApi } from 'app/api'

type Reactions = {
  reactionsCount: number
  reactions: string
  user: string
}

type ReactionsRequestConfig = AxiosRequestConfig<Reactions>

class ReactionsRequests {
  private static baseUrl: string

  constructor() {
    ReactionsRequests.baseUrl = '/reactions'
  }

  getReaction() {
    return rootApi.get<Reactions>(`${ReactionsRequests.baseUrl}`)
  }

  addReactions({ params, config }: ReactionsRequestConfig) {
    return rootApi.post(`${ReactionsRequests.baseUrl}`, params, config)
  }
}

export default ReactionsRequests
