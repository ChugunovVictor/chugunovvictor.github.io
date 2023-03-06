import React, { useState, useEffect } from 'react';

import { importDataBase } from '../utils/queries'
import { ReactComponent as Ok } from '../assets/images/Ubuntu/Ok.svg'
import { Card } from '../model/Card';
import { Setting } from '../model/Setting';

type ImportMessage = {
    cards?: Card[],
    archive?: Card[],
    settings?: Setting[]
}

type ImportProps = {
    setFooterButtons: (e: JSX.Element) => void
}

const ImportScreen = (props: ImportProps) => {
    const [value, setValue] = useState<string>("")

    useEffect(() => {
        props.setFooterButtons(
            <div className='Memo-Button' onClick={() => import_()} >
                <Ok className='Button' /> <span>Import</span>
            </div>
        )
    }, [])

    async function import_() {
        const candidate = JSON.parse(value) as ImportMessage

        importDataBase(candidate.cards, candidate.settings, candidate.archive)
    }

    return <div className="Import">
        <textarea value={value} onChange={(e) => setValue(e.target.value)}></textarea>
    </div>
}
export default ImportScreen;
