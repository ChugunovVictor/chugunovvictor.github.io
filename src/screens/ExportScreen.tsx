import { useEffect } from 'react';

import { ReactComponent as Ok } from '../assets/images/Ubuntu/Ok.svg';
import { useArchiveQuery, useCardsQuery, useSettingsQuery } from '../utils/queries';

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

    const cards = useCardsQuery();
    const settings = useSettingsQuery();
    const archive = useArchiveQuery();

    const result = { cards, settings, archive }

    const copy = () => {
        navigator.clipboard.writeText(JSON.stringify(result, null, 2));
    }

    return <div className="Export">
        <textarea value={JSON.stringify(result, null, 2)}></textarea>
    </div>
}
export default ExportScreen;
