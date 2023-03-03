import React, {useState} from 'react';

import {db} from '../db'
import { ReactComponent as Ok } from '../assets/images/Ubuntu/Ok.svg'
import { Card } from '../model/Card';
import { Setting } from '../model/Setting';

type ImportMessage = {
    cards?: Card[],
    archive?: Card[],
    settings?: Setting[]
}

const ImportScreen = () => {
    const [value, setValue] = useState<string>("")

    async function import_(){
        const candidate = JSON.parse(value) as ImportMessage

        console.log(candidate)

        if(candidate.cards){
            db.cards.clear()
            db.cards.bulkAdd(candidate.cards)
        }
        if(candidate.settings){
            db.settings.clear()
            db.settings.bulkAdd(candidate.settings)
        }
        if(candidate.archive){
            db.archive.clear()
            db.archive.bulkAdd(candidate.archive)
        }
    }

    return <div className="Import">
        <textarea value={value} onChange={(e)=>setValue(e.target.value)}></textarea>
        <div className='Memo-Button' onClick={() => import_()} >
            <Ok className='Button'/> Import
        </div>
    </div>
}
export default ImportScreen;
