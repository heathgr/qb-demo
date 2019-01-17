import { StoreProvider } from 'r-is-for-react'
// tslint:disable-next-line:import-name
import React from 'react'
import Choice from './components/Choice'
import {
  addChoice,
  toggleMultiSelect,
  toggleSelectionIsRequired,
  updateLabel,
} from './effects'
import store, { AppState } from './store'

import './index.scss'

const App = () => (
  <StoreProvider<AppState> store={store}>
    {
      ({ choices, label, multiSelect, selectionIsRequired }) => (
        <div className='app-wrapper'>
          <h1>Field Builder</h1>
          <section>
            <h2>Label</h2>
            <input
              type='text'
              value={label}
              placeholder='Enter A Label'
              onChange={evt => updateLabel(evt.currentTarget.value)}
            />
          </section>
          <section>
            <h2>Options</h2>
            <div className='flex-column'>
              <div className='flex-row'>
                <input
                  type='checkbox'
                  checked={multiSelect}
                  onChange={() => toggleMultiSelect()}
                />
                <label>Allow Multiple Selections</label>
              </div>
              <div>
                <input
                  type='checkbox'
                  checked={selectionIsRequired}
                  onChange={() => toggleSelectionIsRequired()}
                />
                <label>Selection Is Required</label>
              </div>
            </div>
          </section>
          <section>
            <h2>Choices</h2>
            <div className='flex-column'>
              {
                choices.map(({ value, isDefault }, index) => <Choice
                  key={value}
                  value={value}
                  isDefault={isDefault}
                  index={index}
                />)
              }
              <button onClick={ () => addChoice() }>Add Choice</button>
              <button>Sort Alphabetically</button>
            </div>
          </section>
          <footer>
            <button>Save</button>
            <button>Reset</button>
          </footer>
        </div>
      )
    }
  </StoreProvider>
)

export default App
