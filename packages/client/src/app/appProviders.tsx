import { ConfigProvider, ThemeConfig } from 'antd'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import ErrorBoundary from 'shared/utils/error-boundary/ErrorBoundary'
import { appRouter } from './appRoutes'
import { store } from './redux/store'

const theme: ThemeConfig = {
  token: {
    fontFamily: 'Kumbh Sans Regular',
  },
  components: {
    Button: {
      defaultBg: '#f48014',
      defaultColor: '#fff',
      fontWeight: 'bold',
      defaultHoverBg: '#d46b09',
      defaultHoverColor: '#fff',
      defaultActiveBg: '#d46b09',
      defaultActiveBorderColor: 'transparent',
      defaultActiveColor: '#fff',
      contentFontSizeLG: 24,
      defaultHoverBorderColor: 'transparent',
    },
    Form: {
      itemMarginBottom: 15,
    },
  },
}

function AppProviders() {
  return (
    // <ErrorBoundary>
    <Provider store={store}>
      <ConfigProvider theme={theme}>
        <RouterProvider router={appRouter()} />
      </ConfigProvider>
    </Provider>
    // </ErrorBoundary>
  )
}

export default AppProviders
