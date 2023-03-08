import React from 'react';

import { ReactComponent as Flip_ } from '../assets/images/Ubuntu/Flip.svg';
import { ReactComponent as Forward } from '../assets/images/Ubuntu/Forward.svg';
import { ReactComponent as NextDay } from '../assets/images/Ubuntu/NextDay.svg';
import { ReactComponent as NextWeek } from '../assets/images/Ubuntu/NextWeek.svg';
import { settingQuery, dailyQuery } from '../utils/queries';

import { Daily } from '../components';
import { Flip } from '../model/Flip';
import { db } from '../utils/db';

const voice = settingQuery("language")
const cards = dailyQuery()

type HomeScreenState = {
  voice: string | undefined,
  show: boolean,
  cards: Flip[]
}

type HomeScreenProps = {
  setFooterButtons: (e: JSX.Element) => void
}

class HomeScreen extends React.Component<HomeScreenProps> {
  constructor(props: HomeScreenProps) {
    super(props)
  }

  subscriptionVoice: any
  subscriptionCards: any

  state: HomeScreenState = {
    voice: undefined,
    show: false,
    cards: []
  }

  componentDidMount() {
    this.props.setFooterButtons(<>
      <div className='Memo-Button'>
        <Flip_ className='Button' onClick={() => this.next(true)} />
        <span>Flip</span>
      </div>

      <div className='Memo-Button'>
        <Forward className='Button' onClick={() => this.next(false)} />
        <span>Next</span>
      </div>

      <div className='Memo-Button'>
        <NextDay className='Button' onClick={() => this.move(false)} />
        <span>Day</span>
      </div>

      <div className='Memo-Button'>
        <NextWeek className='Button' onClick={() => this.move(true)} />
        <span>Week</span>
      </div>
    </>
    )
    this.subscriptionVoice = voice.subscribe(
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

    const card = { ...currentCard.card, nextAt: week ? nextWeek : tomorrow }

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
      <div className="Home">
        {
          this.state.cards.length > 0 &&
          <Daily flip={this.state.cards[0]} voice={this.state.voice} show={this.state.show} onShow={() => {console.log(123); this.setState({ show: true })}}></Daily>
        }
      </div>
    );
  }

}

export default HomeScreen;
