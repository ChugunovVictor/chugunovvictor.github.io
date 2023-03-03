import React, { useRef } from 'react';
import { ReactComponent as Ok } from '../assets/images/Ubuntu/Ok.svg'
import { ReactComponent as Clock } from '../assets/images/Ubuntu/Clock.svg'
import { useState, useEffect } from 'react'
import { db } from '../db'
import { useParams } from "react-router-dom";
import { useLiveQuery } from "dexie-react-hooks";
import { useNavigate } from 'react-router-dom';
import { Calendar } from '../components'

const EditScreen: React.FC = () => {
  const navigate = useNavigate();
  let { id } = useParams();

  const cardInfo = useLiveQuery(
    () => db.cards.filter(e => e.value == id).first()
  );

  const [value, setValue] = useState<string>();
  const [translation, setTranslation] = useState<string>();
  const [nextAt, setNextAt] = useState<Date>();
  const [useNextAt, setUseNextAt] = useState<boolean>(false);

  useEffect(
    () => {
      if (cardInfo) {
        setValue(cardInfo.value)
        setTranslation(cardInfo.translation)
        cardInfo.nextAt && (() => {
          setNextAt(cardInfo.nextAt);
          setUseNextAt(true);
        })()
      }
    }
    , [cardInfo])

  async function edit() {
    try {
      if (value && translation) {
        await db.cards.delete(cardInfo?.value as string)

        let card = { value: value, translation: translation }
        if(useNextAt) card = { ...card, ...{ nextAt } }

        await db.cards.add(card)

        navigate(-1)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const calendar = useRef({});

  return (
    <div className="Edit">
      <div className='Label'>Value:</div>
      <div className='Value'>
        <textarea value={value} onChange={ev => {
          setValue(ev.target.value.trim())
        }}>
        </textarea>
      </div>
      <div className='Label'>Translation:</div>
      <div className='Value'>
        <textarea value={translation} onChange={ev => setTranslation(ev.target.value.trim())}>
        </textarea>
      </div>
      <div className='Label'>Next At:</div>
      <div className='Clock'>
        <Clock className={`Clock-Button ${useNextAt && 'Toggled'}`} onClick={() => setUseNextAt(!useNextAt)} />
        {useNextAt && <Calendar date={nextAt ? nextAt : new Date()} onChange={setNextAt} />}
      </div>


      <Ok className='Button' onClick={() => edit()} />
    </div>
  );
}

export default EditScreen;
