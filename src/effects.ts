import { getState, setState } from './store'

const CHARACTER_LIMIT = 40

export const updateLabel = (newLabel: string) => {
  const validatedLabel = newLabel.substring(0, CHARACTER_LIMIT)

  setState({ label: validatedLabel })
}

export const toggleMultiSelect = () => {
  const { multiSelect } = getState()

  setState({ multiSelect: !multiSelect })
}

export const toggleValueIsRequired = () => {
  const { valueIsRequired } = getState()

  setState({ valueIsRequired: !valueIsRequired })
}
