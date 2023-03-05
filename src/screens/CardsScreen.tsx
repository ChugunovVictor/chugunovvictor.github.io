import { Card as ICard } from '../model/Card'
import { Card, Button } from '../components';
import { db } from '../db'
import { useLiveQuery } from "dexie-react-hooks";
import React, { useState, useEffect } from 'react';
import { ReactComponent as Add } from '../assets/images/Ubuntu/Add.svg'

type Archived = { setFooterButtons: (e: JSX.Element) => void }

const CardsScreen: React.FC<Archived> = (props: Archived) => {
  const [filter, setFilter] = useState("")
  const [isArchive, setIsArchive] = useState(false)

  const cards = useLiveQuery(
    () => (isArchive ? db.archive : db.cards).toArray()
  );

  useEffect(() => {
    props.setFooterButtons(<Button path={"/add"}>
      <Add className='Button' /><span>Add Card</span>
    </Button>
    )
  }, [cards])

  

  return (
    <div className="Cards">
      <div className="Filter">
        Search: <input type="text" value={filter} onChange={(e) => setFilter(e.target.value)} />
      </div>

      <div className='Overflow'>
        {cards?.filter(e => e.value.startsWith(filter)).map((card: ICard) =>
          <Card key={card.value} card={card} isArchive={isArchive} />
        )}
      </div>
    </div>
  );
}

export default CardsScreen;
