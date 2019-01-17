import { StoreProvider } from 'r-is-for-react'
// tslint:disable-next-line:import-name
import React from 'react'

import store, { AppState } from './store'

const App = () => (
  <StoreProvider<AppState> store={store}>
    {
      state => (
        <div>{`Label: ${state.label}`}</div>
      )
    }
  </StoreProvider>
)

export default App
