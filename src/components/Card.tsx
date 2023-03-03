
import { Card as ICard } from '../model/Card'
import Button from './Button'
import { ReactComponent as Delete } from '../assets/images/Ubuntu/Delete.svg'
import { ReactComponent as Edit } from '../assets/images/Ubuntu/Edit.svg'
import { ReactComponent as Archive } from '../assets/images/Ubuntu/Archive.svg'
import { ReactComponent as Cards } from '../assets/images/Ubuntu/Cards.svg'

import { db } from '../db'

function archive_(card: ICard) {
  db.cards.delete(card.value)
  const arcived = { value: card.value, translation: card.translation }
  db.archive.add(arcived)
}

function _delete_(value: string) {
  db.cards.delete(value)
  db.archive.delete(value)
}

function restore(card: ICard) {
  db.archive.delete(card.value)
  db.cards.add(card)
}

export function getDate(value: Date): string {
  const days = value.getDate() < 10 ? `0${value.getDate()}` : value.getDate()
  const months = (value.getMonth() + 1) < 10 ? `0${value.getMonth() + 1}` : value.getMonth() + 1
  const year = value.getFullYear()

  return `${days}.${months}.${year}`
}

type Props = { card: ICard, isArchive: boolean }

const Card: React.FC<Props> = (props: Props) => {
  return (
    <div className="Card">
      <div className='Card-Text'>
        <div className='Card-Text-Value'>{props.card.value}</div>
        <div className='Card-Text-Translation Small'>{props.card.translation}</div>
      </div>
      <div className='Card-Data'>
        <div className='Card-Date Small'>
          {props.card.nextAt ? getDate(props.card.nextAt) : <>&nbsp;</>}
        </div>
        <div className='Card-Tools'>
          {props.isArchive ?
            <>
              <Cards className='Button' onClick={() => restore(props.card)} />
              <Delete className='Button' onClick={() => _delete_(props.card.value)} />
            </>
            :
            <>
              <Button path={`/edit/${props.card.value}`}>
               <Edit className='Button'/><></>
              </Button>
              <Delete className='Button' onClick={() => _delete_(props.card.value)} />
              <Archive className='Button' onClick={() => archive_(props.card)} />
            </>
          }
        </div>
      </div>

    </div>
  );
}

export default Card
