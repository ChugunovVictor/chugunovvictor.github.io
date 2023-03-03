import React from 'react';

import { ReactComponent as Forward } from '../assets/images/Ubuntu/Forward.svg'
import { ReactComponent as Flip_ } from '../assets/images/Ubuntu/Flip.svg'
import { ReactComponent as NextDay } from '../assets/images/Ubuntu/NextDay.svg'
import { ReactComponent as NextWeek } from '../assets/images/Ubuntu/NextWeek.svg'
import { ReactComponent as Ok } from '../assets/images/Ubuntu/Ok.svg'

import { Button } from '../components';
import { db } from '../db'
import { speak } from '../Utils';
import { liveQuery } from "dexie";
import { Flip } from '../model/Flip';
import Daily from '../components/Daily';
import { getDate } from '../components/Card'

const defaultVoice = liveQuery(
  () => db.settings.where('key').equals("language").first()
);

const cards = liveQuery(
  () => db.cards
    .filter(e => e.nextAt ? getDate(e.nextAt) === getDate(new Date()) : true)
    .toArray()
);

type DailyScreenState = {
  voice: string | undefined,
  show: boolean,
  cards: Flip[]
}

class DailyScreen extends React.Component {

  subscriptionVoice: any
  subscriptionCards: any

  state: DailyScreenState = {
    voice: undefined,
    show: false,
    cards: []
  }

  componentDidMount() {
    this.subscriptionVoice = defaultVoice.subscribe(
      result => this.setState({ voice: result?.value }),
      error => this.setState({ error })
    );

    this.subscriptionCards = cards.subscribe(
      result => this.setState({ cards: result.map(e => ({ value: false, card: e })) }),
      error => this.setState({ error })
    );
  }

  componentWillUnmount() {
    if (this.subscriptionVoice) {
      this.subscriptionVoice.unsubscribe();
      this.subscriptionVoice = null;
    }
    if (this.subscriptionCards) {
      this.subscriptionCards.unsubscribe();
      this.subscriptionCards = null;
    }
  }

  async move(week: boolean) {
    const [currentCard, ...theRest] = this.state.cards

    const today = new Date();
    const tomorrow = new Date(today.getTime() + (24 * 60 * 60 * 1000));
    const nextWeek = new Date(today.getTime() + (7 * 24 * 60 * 60 * 1000));

    const card = { ...currentCard.card, nextAt:  week ? nextWeek : tomorrow}
    
    this.setState({ cards: theRest, show: false })
    await db.cards.put(card);
  }

  next(flip: boolean) {
    const [currentCard, ...theRest] = this.state.cards
    const flipped = { ...currentCard, value: flip ? !currentCard.value : currentCard.value }
    const newCards = [...theRest, flipped]
    this.setState({ cards: newCards, show: false })
  }

  render() {
    return (
      <div className="Daily">
        {
          this.state.cards.length > 0 &&
          <>
            <Daily flip={this.state.cards[0]} voice={this.state.voice} show={this.state.show}></Daily>
            <div className='Submit-Variants'>
              <div className='Submit-Button'>
                <Ok className='Button' onClick={() => this.setState({ show: true })} />
              </div>
              {
                this.state.show &&
                <>
                  <div className='Rotate Flip'>
                    < Flip_ className='Button' onClick={() => this.next(true)} />
                    <div className='Rotate-Decoration'></div>
                  </div>
                  <div className='Rotate NextWeek'>
                    <NextWeek className='Button' onClick={() => this.move(true)} />
                    <div className='Rotate-Decoration'></div>
                  </div>
                  <div className='Rotate Forward'>
                    <Forward className='Button' onClick={() => this.next(false)} />
                    <div className='Rotate-Decoration'></div>
                  </div>
                  <div className='Rotate NextDay'>
                    <NextDay className='Button' onClick={() => this.move(false)} />
                    <div className='Rotate-Decoration'></div>
                  </div>
                </>
              }
            </div>
          </>
        }
      </div>
    );
  }

}

export default DailyScreen;
