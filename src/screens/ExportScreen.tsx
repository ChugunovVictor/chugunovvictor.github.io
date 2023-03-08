import React from 'react';

import { ReactComponent as Ok } from '../assets/images/Ubuntu/Ok.svg';
import { Card } from '../model/Card';
import { Setting } from '../model/Setting';
import { archiveQuery, cardsQuery, settingsQuery } from '../utils/queries';

const cards = cardsQuery();
const settings = settingsQuery();
const archive = archiveQuery();

type ExportProps = {
    setFooterButtons: (e: JSX.Element) => void
}

type ExportScreenState = {
    cards: Card[],
    archive: Card[],
    settings: Setting[],
    copied: boolean
}

class ExportScreen extends React.Component<ExportProps>{
    constructor(props: ExportProps) {
        super(props)
        this.copy = this.copy.bind(this)
    }

    state: ExportScreenState = {
        cards: [],
        archive: [],
        settings: [],
        copied: false
    }

    subscriptionSettings: any
    subscriptionArchive: any
    subscriptionCards: any


    componentDidMount(): void {
        this.props.setFooterButtons(
            <div className='Memo-Button' onClick={() => this.copy()} >
                <Ok className='Button' /> <span>Copy to Clipboard</span>
            </div>
        )
        this.subscriptionCards = cards.subscribe(
            result => this.setState({ cards: result }),
            error => this.setState({ error })
        );

        this.subscriptionSettings = settings.subscribe(
            result => this.setState({ settings: result }),
            error => this.setState({ error })
        );

        this.subscriptionArchive = archive.subscribe(
            result => this.setState({ archive: result }),
            error => this.setState({ error })
        );
    }

    componentWillUnmount() {
        if (this.subscriptionSettings) {
            this.subscriptionSettings.unsubscribe();
            this.subscriptionSettings = null;
        }
        if (this.subscriptionCards) {
            this.subscriptionCards.unsubscribe();
            this.subscriptionCards = null;
        }
        if (this.subscriptionArchive) {
            this.subscriptionArchive.unsubscribe();
            this.subscriptionArchive = null;
        }
    }

    copy = () => {
        const result = { cards: this.state.cards, settings: this.state.settings, archive: this.state.archive };
        navigator.clipboard.writeText(JSON.stringify(result, null, 2));
        this.setState({copied: true})
    }

    onAnumationEnd = (e: React.AnimationEvent) => {
        switch (e.animationName) {
            case "toastFade": {
                this.setState({copied: false})
                break;
            }
        }
    }

    render(): React.ReactNode {
        const result = { cards: this.state.cards, settings: this.state.settings, archive: this.state.archive }

        return <div className="Export">
            { this.state.copied && <div className='Toast' onAnimationEnd={this.onAnumationEnd}>Copied</div>}
            <textarea value={JSON.stringify(result, null, 2)} onChange={()=>{}}></textarea>
        </div>
    }

}
export default ExportScreen;
