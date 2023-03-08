import { Card as ICard } from '../model/Card'
import { Card, Button } from '../components';
import { cardsQuery, archiveQuery } from '../utils/queries'
import React from 'react';
import { ReactComponent as Add } from '../assets/images/Ubuntu/Add.svg'
import { ReactComponent as Archive } from '../assets/images/Ubuntu/Archive.svg'

const cards = cardsQuery()
const archive = archiveQuery()

type CardsScreenProps = { setFooterButtons: (e: JSX.Element) => void }

type CardsScreenState = {
  filter: string,
  isArchive: boolean,
  cards: ICard[],
  archive: ICard[]
}

class CardsScreen extends React.Component<CardsScreenProps> {
  state: CardsScreenState = {
    filter: "",
    isArchive: false,
    cards: [],
    archive: [],
  }

  subscriptionCards: any
  subscriptionArchive: any

  constructor(props: CardsScreenProps) {
    super(props)

    this.setState = this.setState.bind(this)
    this.isArchived = this.isArchived.bind(this)
  }

  isArchived = (value: boolean) => {
    this.props.setFooterButtons(<>
      <Button path={"/add"}>
        <Add className='Button' /><span>Add Card</span>
      </Button>
      <div className='Memo-Button'>
        <Archive className={`Button ${value ? 'Toggled' : ""}`} onClick={() => this.isArchived(!value)} /><span>Archive</span>
      </div>
    </>
    )
    this.setState({isArchive: value })
  }

  componentDidMount() {
    this.isArchived(false)

    this.subscriptionCards = cards.subscribe(
      result => this.setState({ cards: result }),
      error => this.setState({ error })
    );

    this.subscriptionArchive = archive.subscribe(
      result => this.setState({ archive: result }),
      error => this.setState({ error })
    );
  }

  componentWillUnmount() {
    if (this.subscriptionCards) {
      this.subscriptionCards?.unsubscribe();
      this.subscriptionCards = null;
    }
    if (this.subscriptionArchive) {
      this.subscriptionCards?.unsubscribe();
      this.subscriptionCards = null;
    }
  }

  render() {
    return (
      <div className="Cards">
        <div className="Filter">
          Search: <div className='Filter-Input'>
            <input type="text" value={this.state.filter} onChange={(e) => this.setState({ filter: (e.target.value) })} />
          </div>
        </div>
        <div>

        </div>
        <div className='Overflow'>
          {
            (this.state.isArchive ? this.state.archive : this.state.cards)
              .filter(e => e.value.startsWith(this.state.filter)).map((card: ICard) =>
                <Card key={card.value} card={card} isArchive={this.state.isArchive} />
              )
          }
        </div>
      </div>
    );
  }

}

export default CardsScreen;
