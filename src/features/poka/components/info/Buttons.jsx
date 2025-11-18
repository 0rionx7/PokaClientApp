import { memo } from 'react'

import { INFO_BUTTONS_TITLES } from '@utils/text-constants'
import Button from '@ui/Button'
import './Buttons.scss'

const Buttons = ({ setSelected, selected }) => {
  const titles = Object.values(INFO_BUTTONS_TITLES)
  const className = (title) => `info-button${selected === title ? ' selected' : ''}`

  return (
    <div className="btns">
      {titles.map((title) => (
        <Button
          key={title}
          prompt={title}
          className={className(title)}
          onClick={() => setSelected(title)}
        />
      ))}
    </div>
  )
}

export default memo(Buttons)
