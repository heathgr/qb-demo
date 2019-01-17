import { StoreProvider } from 'r-is-for-react'
// tslint:disable-next-line:import-name
import React from 'react'
import {
  toggleMultiSelect,
  toggleValueIsRequired,
  updateLabel,
} from './effects'

import store, { AppState } from './store'

const App = () => (
  <StoreProvider<AppState> store={store}>
    {
      state => (
        <div>
          <input
            type='text'
            value={state.label}
            placeholder='Enter A Label'
            onChange={evt => updateLabel(evt.currentTarget.value)}
          />
          <input
            type='checkbox'
            checked={state.multiSelect}
            onChange={() => toggleMultiSelect()}
          />
          <input
            type='checkbox'
            checked={state.valueIsRequired}
            onChange={() => toggleValueIsRequired()}
          />
        </div>
      )
    }
  </StoreProvider>
)

export default App
