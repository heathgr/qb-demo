import { StoreProvider } from 'r-is-for-react'
// tslint:disable-next-line:import-name
import React from 'react'
import Choice from './components/Choice'
import {
  addChoice,
  postField,
  resetState,
  sortChoicesAlphabetically,
  toggleMultiSelect,
  toggleSelectionIsRequired,
  updateLabel,
} from './effects'
import store, { AppState, CHOICE_LIMIT, validationState } from './store'

import './index.scss'

const App = () => (
  <StoreProvider<AppState> store={store}>
    {
      ({ choices, errors, label, multiSelect, selectionIsRequired, stateIsValid }) => (
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
              <div>
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
                choices.length === 0 && <div>There are currently no choices.</div>
              }
              {
                choices.map(({ uid, value, isDefault }, index) => <Choice
                  key={uid}
                  value={value}
                  isDefault={isDefault}
                  index={index}
                  uid={uid}
                />)
              }
              {
                choices.length < CHOICE_LIMIT
                  && <button onClick={() => addChoice()}>Add Choice</button>
              }
              {
                choices.length >= CHOICE_LIMIT
                  && <div>{`The number of choices is limited to ${CHOICE_LIMIT}`}</div>
              }
              <button onClick={() => sortChoicesAlphabetically()}>Sort Alphabetically</button>
            </div>
          </section>
          <footer>
            <div className='flex-row'>
              <button
                className='cta'
                disabled={stateIsValid !== validationState.VALID}
                onClick={() => postField()}
              >
                Save
              </button>
              <button
                className='destructive'
                onClick={() => resetState()}
              >
                Reset
              </button>
            </div>
            <div className='flex-column'>
              {
                errors.map((error, i) => <div className='error-message' key={i}>{error}</div>)
              }
            </div>
          </footer>
        </div>
      )
    }
  </StoreProvider>
)

export default App
