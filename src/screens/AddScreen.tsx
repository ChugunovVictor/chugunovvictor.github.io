import React, { useState } from 'react';
import { ReactComponent as Ok } from '../assets/images/Ubuntu/Ok.svg';
import { db } from '../db';

const AddScreen: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [translation, setTranslation] = useState<string>("");

  async function add() {

    try {
      if (value && translation) {
        await db.cards.add({ value: value, translation: translation })

        setValue("");
        setTranslation("");
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="Add">
      <div className='Label'>Value:</div>
      <div className='Value'>
        <textarea value={value} onChange={ev => {
          setValue(ev.target.value.trim())
        }}>
        </textarea>
      </div>
      <div className='Label'>Translation:</div>
      <div className='Value'>
        <textarea value={translation} onChange={ev =>
          setTranslation(ev.target.value.trim())}>
        </textarea>
      </div>
      <Ok className='Button' onClick={() => add()} />
    </div>
  );
}

export default AddScreen;
