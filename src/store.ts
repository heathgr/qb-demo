import { createStore } from 's-is-for-store'

export interface AppState {
  defaultValue: number,
  label: string,
  multiSelect: boolean,
  valueIsRequired: boolean,
  values: string[],
}

const initialState: AppState = {
  defaultValue: 0,
  label: 'Just a Test',
  multiSelect: false,
  valueIsRequired: false,
  values: [],
}

const store = createStore<AppState>(initialState)

export const { getState, setState } = store
export default store
