import arrayMove from 'array-move'
import axios from 'axios'
import pDebounce from 'p-debounce'
import {
  AppState,
  CHARACTER_LIMIT,
  Choice,
  getState,
  initialState,
  setState,
  validationState,
} from './store'

const getDuplicateValues = (choices: Choice[]): string[] => {
  const fitleredChoices = choices.filter(choice => choice.value !== '')
  const checkedValues: any = {}
  const duplicates: any = {}

  fitleredChoices.forEach((choice) => {
    const { value } = choice

    if (checkedValues[value]) {
      duplicates[value] = true
    } else {
      checkedValues[value] = true
    }
  })

  return Object.keys(duplicates)
}

const validator = () => new Promise((resolve) => {
  const { label, choices } = getState()
  const errors: string[] = []

  if (label.length === 0) {
    errors.push('You must enter a label')
  }

  if (choices.length === 0) {
    errors.push('There are no choices entered.')
  }

  if (choices.find(choice => choice.value === '')) {
    errors.push('There are choices with no value entered.')
  }

  const duplicates = getDuplicateValues(choices)

  if (duplicates.length !== 0) {
    duplicates.forEach((duplicate) => {
      errors.push(`There is more than one choice with the value ${duplicate}`)
    })
  }

  if (errors.length === 0) {
    setState({
      errors,
      stateIsValid: validationState.VALID,
    })
  } else {
    setState({
      errors,
      stateIsValid: validationState.INVALID,
    })
  }
  resolve()
})

// state validator wrapped in debouncer
export const validateState = pDebounce(validator, 200)

/**
 * Updates the state, marks it as invalid, then runs the validator.
 * The validator function is debounced for performance reasons.
 * @param newState  The state that will be updated.
 */
const pushState = (newState: Partial<AppState>) => {
  validateState()
  setState({
    ...newState,
    stateIsValid: validationState.UNKOWN,
  })
}

/**
 * Updates the label.
 * @param newLabel The new value for the field label.
 */
export const updateLabel = (newLabel: string) => {
  const validatedLabel = newLabel.substring(0, CHARACTER_LIMIT)

  pushState({ label: validatedLabel })
}

/**
 * Toggles the multiselect value.
 */
export const toggleMultiSelect = () => {
  const { choices, multiSelect } = getState()
  const newChoices = choices.map((choice) => {
    return { ...choice, isDefault: false }
  })

  pushState({ choices: newChoices, multiSelect: !multiSelect })
}

/**
 * Toggles the selection required value.
 */
export const toggleSelectionIsRequired = () => {
  const { selectionIsRequired: valueIsRequired } = getState()

  pushState({ selectionIsRequired: !valueIsRequired })
}

/**
 * Adds a new choice
 */
export const addChoice = () => {
  const { choices } = getState()
  const newChoices: Choice[] = [
    ...choices,
    {
      isDefault: false,
      uid: Number(new Date()),
      value: '',
    }]

  pushState({ choices: newChoices })
}

/**
 * Updates the value of a choice.
 * @param index The index of the choice to be updated.
 * @param value The new choice value.
 */
export const updateChoiceValue = (index: number, value: string) => {
  const { choices } = getState()
  const newChoices = choices.map((choice, id) => index === id ? { ...choice, value } : choice)

  pushState({ choices: newChoices })
}

/**
 * Toggles wether a choice will be a default of not.
 * @param index The index of the choice to be updated.
 */
export const toggleChoiceDefaultValue = (index: number) => {
  const { choices, multiSelect } = getState()

  if (multiSelect) {
    const newChoices = choices.map((choice, id) => {
      return index === id ? { ...choice, isDefault: !choice.isDefault } : choice
    })

    pushState({ choices: newChoices })
  } else {
    const newChoices = choices.map((choice, id) => {
      return { ...choice, isDefault: index === id }
    })

    pushState({ choices: newChoices })
  }
}

/**
 * Removes a choice.
 * @param index The index of the choice to be removed.
 */
export const removeChoice = (index: number) => {
  const { choices } = getState()
  const newChoices = choices.filter((choice, id) => id !== index)

  pushState({ choices: newChoices })
}

export const changeChoicePosition = (index: number, delta: -1 | 1) => {
  const { choices } = getState()
  const targetIndex = (index + delta) % choices.length
  const newChoices = arrayMove(choices, index, targetIndex)

  pushState({ choices: newChoices })
}

export const sortChoicesAlphabetically = () => {
  const { choices } = getState()
  const newChoices = choices.sort((a, b) => {
    if (a.value < b.value) { return -1 }
    if (a.value > b.value) { return 1 }
    return 0
  })

  pushState({ choices: newChoices })
}

export const resetState = () => {
  pushState(initialState)
}

export const postField = async () => {
  const { errors, stateIsValid, ...cleanState } = getState()
  const stateJson = JSON.stringify(cleanState)

  await setState({ stateIsValid: validationState.UNKOWN })
  const result = await axios.post(
    'http://www.mocky.io/v2/566061f21200008e3aabd919',
    stateJson,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  )
  console.log('result: ', result)
  await setState({ stateIsValid: validationState.VALID })
}
