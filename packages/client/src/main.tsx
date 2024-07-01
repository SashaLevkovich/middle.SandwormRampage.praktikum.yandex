import { userSlice } from 'app/redux/slice/user'
import { store } from 'app/redux/store'

import ReactDOM from 'react-dom/client'

import { userApi } from 'app/redux/api'
import { registerServiceWorker } from 'shared/utils/registerServiceWorker'

import { setLocalStorageUser } from 'shared/utils/userLocalStorage'
import AppProviders from './app/appProviders'
import './index.scss'

const rootElement = document.getElementById('root') as HTMLElement
ReactDOM.hydrateRoot(rootElement, <AppProviders />)

const init = async () => {
  try {
    const result = await store
      .dispatch(userApi.endpoints.getUser.initiate())
      .unwrap()

    if (result) {
      store.dispatch(userSlice.actions.setUser(result))

      setLocalStorageUser(result)
    }
  } catch (e) {
    console.log(e)
  }

  if (process.env.NODE_ENV === 'production') {
    registerServiceWorker()
  }
}

init()
