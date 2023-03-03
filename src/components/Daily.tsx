import { Flip } from "../model/Flip"
import { speak } from '../Utils';

import { ReactComponent as Sound } from '../assets/images/Ubuntu/Sound.svg'

type DailyProps = {
  flip: Flip,
  voice: string | undefined,
  show: boolean
}

const Daily = (props: DailyProps) => {
  const decorationClass = `Decoration-Background ${props.show && "Undecorated"}`

  return (
    <>
      <div className="Decorated">
        {props.flip.value && <div className={decorationClass}>
            <div className="Decoration"></div>
          </div>}
        <span >{props.flip.card.value}</span>
      </div>
      <div className="Decorated">
        {(!props.flip.value) && <div className={decorationClass}>
            <div className="Decoration"></div>
          </div>}
        <span >
          {props.flip.card.translation}
          <Sound className='Button' onClick={() => speak(props.flip.card.translation, props.voice)} />
        </span>
      </div>
    </>
  )
}

export default Daily

