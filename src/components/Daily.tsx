import { Flip } from "../model/Flip"
import { speak } from '../utils/speech';

import { ReactComponent as Sound } from '../assets/images/Ubuntu/Sound.svg'

type DailyProps = {
  flip: Flip,
  voice: string | undefined,
  show: boolean,
  onShow: () => void
}

const Daily = (props: DailyProps) => {
  const decorationClass = `Decorated ${props.show && "Undecorated"}`

  return (
    <>
      <div className="Daily">
        {(props.flip.value && !props.show) && <div className={decorationClass} onClick={() => props.onShow()}>
          {props.flip.card.value}
        </div>}
        {props.flip.card.value}
      </div>
      <div className="Daily">
        {(!props.flip.value && !props.show) && <div className={decorationClass} onClick={() => props.onShow()}>
          {props.flip.card.translation}
        </div>}
        {props.flip.card.translation}
        <Sound className='Button' onClick={() => speak(props.flip.card.translation, props.voice)} />
      </div>
    </>
  )
}

export default Daily

