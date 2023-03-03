import { Card as ICard } from '../model/Card'
import Card from '../components/Card';
import { db } from '../db'
import { useLiveQuery } from "dexie-react-hooks";
import React, { useState, useEffect } from 'react';

type Archived = { isArchive: boolean }

const CardsScreen: React.FC<Archived> = (props: Archived) => {
  const [filter, setFilter] = useState("")

  const cards = useLiveQuery(
    () => (props.isArchive ? db.archive : db.cards).toArray()
  );

  return (
    <div className="Cards">
      <div className="Filter">
        Search: <input type="text" value={filter} onChange={(e) => setFilter(e.target.value)} />
      </div>

      <div className='Overflow'>
        {cards?.filter(e => e.value.startsWith(filter)).map((card: ICard) =>
          <Card key={card.value} card={card} isArchive={props.isArchive} />
        )}
      </div>    </div>
  );
}

export default CardsScreen;
