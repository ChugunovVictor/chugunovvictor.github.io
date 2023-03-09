import React from 'react';

import { ReactComponent as Ok } from '../assets/images/Ubuntu/Ok.svg';
import { Card } from '../model/Card';
import { Setting } from '../model/Setting';
import { importDataBase } from '../utils/queries';

type ImportMessage = {
    cards?: Card[],
    archive?: Card[],
    settings?: Setting[]
}

type ImportProps = {
    setFooterButtons: (e: JSX.Element) => void
}

class ImportScreen extends React.Component<ImportProps>{
    constructor(props: ImportProps) {
        super(props)

        this.import_ = this.import_.bind(this)
    }

    state = {
        value: "",
        imported: false

    }

    componentDidMount(): void {
        this.props.setFooterButtons(
            <div className='Memo-Button' onClick={() => this.import_()} >
                <Ok className='Button' /> <span>Import</span>
            </div>
        )
    }

    onAnumationEnd = (e: React.AnimationEvent) => {
        switch (e.animationName) {
            case "toastFade": {
                this.setState({ imported: false })
                break;
            }
        }
    }

    async import_() {
        const candidate = JSON.parse(this.state.value) as ImportMessage

        importDataBase(candidate.cards, candidate.settings, candidate.archive)
        this.setState({ imported: true })

    }

    render() {
        return <div className="Import">
            {this.state.imported && <div className='Toast' onAnimationEnd={this.onAnumationEnd}>Imported</div>}
            <textarea placeholder={"Enter import data..."} value={this.state.value} onChange={(e) => this.setState({ value: e.target.value })}></textarea>
        </div>
    }
}
export default ImportScreen;
