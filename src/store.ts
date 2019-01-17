import { createStore } from 's-is-for-store'

export const CHARACTER_LIMIT = 40
export const CHOICE_LIMIT = 50

export interface Choice {
  value: string,
  isDefault: boolean,
  uid: number,
}

export interface AppState {
  choices: Choice[],
  defaultValue: number,
  label: string,
  multiSelect: boolean,
  selectionIsRequired: boolean,
}

export const initialState: AppState = {
  choices: [],
  defaultValue: 0,
  label: '',
  multiSelect: false,
  selectionIsRequired: false,
}

const store = createStore<AppState>(initialState)

export const { getState, setState } = store
export default store
