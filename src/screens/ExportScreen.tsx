import React from 'react';

import {db} from '../db'
import { useLiveQuery } from "dexie-react-hooks";
import { ReactComponent as Ok } from '../assets/images/Ubuntu/Ok.svg'

const ExportScreen = () => {
    const cards = useLiveQuery(() => db.cards.toArray());
    const settings = useLiveQuery(() => db.settings.toArray());
    const archive = useLiveQuery(() => db.archive.toArray());

    const result = {cards, settings, archive}

    const copy = () => {
        navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    }

    return <div className="Export">
        <textarea value={JSON.stringify(result, null, 2)}></textarea>

        <div className='Memo-Button' onClick={() => copy()} >
            <Ok className='Button'/> Copy to Clipboard
        </div>

    </div>
}
export default ExportScreen;
