import React, { memo } from 'react'
import { renderRoutes } from 'react-router-config'
import routes from '@/router'
import store from './store'
import { Provider } from 'react-redux'
import AppHeader from '@/components/app-header'
import AppFooter from '@/components/app-footer'
import PlayerBar from '@/pages/player/app-player-bar'
import { HashRouter } from 'react-router-dom'

const App = memo(() => {
  return (
    <Provider store={store}>
      <HashRouter>
        <AppHeader />
        {renderRoutes(routes)}
        <AppFooter />
      </HashRouter>
      <PlayerBar />
    </Provider>
  )
})

export default App