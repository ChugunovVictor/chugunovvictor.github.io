import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { ReactComponent as Clock } from '../assets/images/Ubuntu/Clock.svg';
import { ReactComponent as Ok } from '../assets/images/Ubuntu/Ok.svg';
import { Calendar } from '../components';
import { upsertCard, deleteCard, useCardInfoQuery } from '../utils/queries';
import { on, off } from '../utils/events';

type EditScreenProps = {
  setFooterButtons: (e: JSX.Element) => void
}

function notify() {
  const edit = new CustomEvent("EditScreen_edit", {});
  document.dispatchEvent(edit);
}

const EditScreen: React.FC<EditScreenProps> = (props: EditScreenProps) => {
  const navigate = useNavigate();
  let { id } = useParams();

  const cardInfo = useCardInfoQuery(id as string)

  const [value, setValue] = useState<string>();
  const [translation, setTranslation] = useState<string>();
  const [nextAt, setNextAt] = useState<Date>();
  const [useNextAt, setUseNextAt] = useState<boolean>(false);

  React.useEffect(() => {
    on("EditScreen_edit", () => edit());

    props.setFooterButtons(<div className='Memo-Button' onClick={() => notify()}>
      <Ok className='Button' />
      <span>Save Card</span>
    </div>
    )

    if (cardInfo) {
      setValue(cardInfo.value)
      setTranslation(cardInfo.translation)
      cardInfo.nextAt && (() => {
        setNextAt(cardInfo.nextAt);
        setUseNextAt(true);
      })()
    }

    return () => {
      off("EditScreen_edit", () => { });
    }
  }, [cardInfo]);

  async function edit() {
    try {
      console.log(value, translation)
      if (value && translation) {
        let card = { value: value, translation: translation }
        if (useNextAt) card = { ...card, ...{ nextAt } }

        await deleteCard(cardInfo?.value as string)
        await upsertCard(card, false)

        navigate(-1)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="Edit">
      <div className='Value'>
        <div className='Label'>Value</div>
        <textarea value={value} onChange={ev => {
          setValue(ev.target.value.trim())
        }}>
        </textarea>
      </div>
      <div className='Value'>
        <div className='Label'>Translation</div>
        <textarea value={translation} onChange={ev => setTranslation(ev.target.value.trim())}>
        </textarea>
      </div>
      <div className='Clock Value'>
        <div className='Label'>Next At</div>
        <div  className='Clock-Value'>
          <Clock className={`Clock-Button ${useNextAt && 'Toggled'}`} onClick={() => setUseNextAt(!useNextAt)} />
          {useNextAt && <Calendar date={nextAt ? nextAt : new Date()} onChange={setNextAt} />}
        </div>
      </div>
    </div>
  );
}

export default EditScreen;
