import { INFO_BUTTONS_TITLES } from '@utils/text-constants'
import { cn } from '@utils/helper-functions'
import Button from '@ui/Button'

import './Buttons.scss'

const Buttons = ({ setSelected, selected }) => {
  const titles = Object.values(INFO_BUTTONS_TITLES)
  const className = (title) => cn('info-button', { selected: selected === title })

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

export default Buttons
