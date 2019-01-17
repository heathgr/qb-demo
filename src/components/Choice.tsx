// tslint:disable-next-line:import-name
import React, { StatelessComponent } from 'react'
import {
  changeChoicePosition,
  removeChoice,
  toggleChoiceDefaultValue,
  updateChoiceValue,
} from '../effects'
import { Choice } from '../store'

interface Props extends Choice {
  index: number,
}

const Choice: StatelessComponent<Props> = ({ value, index, isDefault }) => (
  <div className='flex-row'>
    <input
      type='text'
      placeholder='Enter Value'
      value={value}
      onChange={evt => updateChoiceValue(index, evt.currentTarget.value)}
    />
    <input
      type='checkbox'
      checked={isDefault}
      onChange={() => toggleChoiceDefaultValue(index)}
    />
    <label>Default</label>
    <button onClick={() => changeChoicePosition(index, -1)}>⬆︎</button>
    <button onClick={() => changeChoicePosition(index, 1)}>⬇︎</button>
    <button onClick={() => removeChoice(index)}>🗑</button>
  </div>
)

export default Choice
