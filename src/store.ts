import { createStore } from 's-is-for-store'
import { validateState } from './effects'

export const CHARACTER_LIMIT = 40
export const CHOICE_LIMIT = 50

export enum validationState {
  UNKOWN,
  VALID,
  INVALID,
}

export interface Choice {
  value: string,
  isDefault: boolean,
  uid: number,
}

export interface AppState {
  choices: Choice[],
  errors: string[],
  label: string,
  multiSelect: boolean,
  selectionIsRequired: boolean,
  stateIsValid: validationState,
}

export const initialState: AppState = {
  choices: [],
  errors: [
    'You must enter a label',
    'There are no choices entered.',
  ],
  label: '',
  multiSelect: false,
  selectionIsRequired: false,
  stateIsValid: validationState.INVALID,
}

const store = createStore<AppState>(initialState)

export const { getState, setState } = store
export default store
