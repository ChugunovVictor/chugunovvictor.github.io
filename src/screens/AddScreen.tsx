import React, { useState, useEffect } from 'react';
import { ReactComponent as Ok } from '../assets/images/Ubuntu/Ok.svg';
import { db } from '../db';

type AddScreenProps = {
  setFooterButtons: (e: JSX.Element) => void
}

const AddScreen: React.FC<AddScreenProps> = (props: AddScreenProps) => {
  const [value, setValue] = useState<string>("");
  const [translation, setTranslation] = useState<string>("");

  useEffect(() => {
    props.setFooterButtons(
      <div className='Memo-Button' onClick={() => add()} >
        <Ok className='Button' /> <span>Add new Card</span>
      </div>
    )
  },[])

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
    </div>
  );
}

export default AddScreen;
