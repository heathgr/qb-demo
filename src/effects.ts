import {
  CHARACTER_LIMIT,
  Choice,
  getState,
  setState,
} from './store'

export const updateLabel = (newLabel: string) => {
  const validatedLabel = newLabel.substring(0, CHARACTER_LIMIT)

  setState({ label: validatedLabel })
}

export const toggleMultiSelect = () => {
  const { multiSelect } = getState()

  setState({ multiSelect: !multiSelect })
}

export const toggleSelectionIsRequired = () => {
  const { selectionIsRequired: valueIsRequired } = getState()

  setState({ selectionIsRequired: !valueIsRequired })
}

export const addChoice = () => {
  const { choices } = getState()
  const newChoices: Choice[] = [...choices, { value: '', isDefault: false }]

  setState({ choices: newChoices })
}

/*
export const changeChoiceValue = (index: number, value: string) => {
  const { choices } = getState()
  const newChoices = choices.map((choice, index))
}
*/
