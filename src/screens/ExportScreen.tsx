import React, {useEffect} from 'react';

import {db} from '../db'
import { useLiveQuery } from "dexie-react-hooks";
import { ReactComponent as Ok } from '../assets/images/Ubuntu/Ok.svg'

type ExportProps = {
    setFooterButtons: (e: JSX.Element) => void
  }

const ExportScreen = (props: ExportProps) => {
    useEffect(() => {
        props.setFooterButtons(
            <div className='Memo-Button' onClick={() => copy()} >
                <Ok className='Button' /> <span>Copy to Clipboard</span>
            </div>
        )
    }, [])

    const cards = useLiveQuery(() => db.cards.toArray());
    const settings = useLiveQuery(() => db.settings.toArray());
    const archive = useLiveQuery(() => db.archive.toArray());

    const result = {cards, settings, archive}

    const copy = () => {
        navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    }

    return <div className="Export">
        <textarea value={JSON.stringify(result, null, 2)}></textarea>
    </div>
}
export default ExportScreen;
