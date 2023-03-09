
import { Card as ICard } from '../model/Card'
import Button from './Button'
import { ReactComponent as Delete } from '../assets/images/Ubuntu/Delete.svg'
import { ReactComponent as Edit } from '../assets/images/Ubuntu/Edit.svg'
import { ReactComponent as Archive } from '../assets/images/Ubuntu/Archive.svg'
import { ReactComponent as Cards } from '../assets/images/Ubuntu/Cards.svg'

import { db } from '../utils/db'
import { addToSession, deleteFromSession, getDate } from '../utils/other'



async function archive_(card: ICard) {
  db.cards.delete(card.value)
  deleteFromSession(card)
  const archived = { value: card.value, translation: card.translation }
  db.archive.add(archived)
}

async function _delete_(card: ICard) {
  db.cards.delete(card.value)
  db.archive.delete(card.value)
  deleteFromSession(card)
}

function restore(card: ICard) {
  db.archive.delete(card.value)
  db.cards.add(card)
  addToSession(card)
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
              <Delete className='Button' onClick={() => _delete_(props.card)} />
            </>
            :
            <>
              <Button path={`/edit/${props.card.value}`}>
                <Edit className='Button' /><></>
              </Button>
              <Delete className='Button' onClick={() => _delete_(props.card)} />
              <Archive className='Button' onClick={() => archive_(props.card)} />
            </>
          }
        </div>
      </div>

    </div>
  );
}

export default Card
