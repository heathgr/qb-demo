import arrayMove from 'array-move'
import {
  CHARACTER_LIMIT,
  Choice,
  getState,
  initialState,
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
  const newChoices: Choice[] = [
    ...choices,
    {
      isDefault: false,
      uid: Number(new Date()),
      value: '',
    }]

  setState({ choices: newChoices })
}

export const updateChoiceValue = (index: number, value: string) => {
  const { choices } = getState()
  const newChoices = choices.map((choice, id) => index === id ? { ...choice, value } : choice)

  setState({ choices: newChoices })
}

export const toggleChoiceDefaultValue = (index: number) => {
  const { choices } = getState()
  const newChoices = choices.map((choice, id) => {
    return index === id ? { ...choice, isDefault: !choice.isDefault } : choice
  })

  setState({ choices: newChoices })
}

export const removeChoice = (index: number) => {
  const { choices } = getState()
  const newChoices = choices.filter((choice, id) => id !== index)

  setState({ choices: newChoices })
}

export const changeChoicePosition = (index: number, delta: -1 | 1) => {
  const { choices } = getState()
  const targetIndex = (index + delta) % choices.length
  const newChoices = arrayMove(choices, index, targetIndex)

  setState({ choices: newChoices })
}

export const sortChoicesAlphabetically = () => {
  const { choices } = getState()
  const newChoices = choices.sort((a, b) => {
    if (a.value < b.value) { return -1 }
    if (a.value > b.value) { return 1 }
    return 0
  })

  setState({ choices: newChoices })
}

export const resetState = () => {
  setState(initialState)
}
