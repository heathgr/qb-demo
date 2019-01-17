// tslint:disable-next-line:import-name
import React, { StatelessComponent } from 'react'
import { Choice } from '../store'

interface Props extends Choice {
  index: number,
}

const Choice: StatelessComponent<Props> = ({ value, isDefault }) => (
  <div className='flex-row'>
    <input type='text' placeholder='Enter Value' value={value} />
    <input type='checkbox' checked={isDefault} />
    <label>Default</label>
    <button>⬆︎</button>
    <button>⬇︎</button>
    <button>🗑</button>
  </div>
)

export default Choice
