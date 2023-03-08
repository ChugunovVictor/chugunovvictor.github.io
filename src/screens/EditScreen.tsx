import React from 'react';
import { Navigate } from 'react-router';
import { ReactComponent as Clock } from '../assets/images/Ubuntu/Clock.svg';
import { ReactComponent as Ok } from '../assets/images/Ubuntu/Ok.svg';
import { Calendar } from '../components';
import { cardInfoQuery, deleteCard, upsertCard } from '../utils/queries';

import { useEffect } from "react";
import { useParams } from "react-router-dom";

type IdParamProps = { onMount: (value: string) => void }

const IdParam: React.FC<IdParamProps> = (props: IdParamProps) => {
  let { id } = useParams();

  useEffect(() => {
    id && props.onMount(id)
  }, [id])
  return (<></>);
}

// ---------------------------------------------------------------

type EditScreenProps = {
  setFooterButtons: (e: JSX.Element) => void
}

type EditScreenState = {
  value: string,
  translation: string,
  nextAt: Date,
  useNextAt: boolean,
  navigate: boolean,
  initialValue: string
}

const cardInfo = (id: string) => cardInfoQuery(id)

class EditScreen extends React.Component<EditScreenProps>{
  constructor(props: EditScreenProps) {
    super(props);

    this.setState = this.setState.bind(this)
    this.edit = this.edit.bind(this)
  }

  state: EditScreenState = {
    initialValue: "",
    value: "",
    translation: "",
    nextAt: new Date(),
    useNextAt: false,
    navigate: false
  }

  subscription: any

  subscribe(id: string) {
    this.subscription = cardInfo(id).subscribe(
      result => {
        let card = { initialValue: result?.value, value: result?.value, translation: result?.translation }
        if (result?.nextAt)
          card = { ...card, ...{ nextAt: result?.nextAt, useNextAt: true } }
        this.setState(card)
      },
      error => this.setState({ error })
    );
  }

  componentDidMount() {
    this.props.setFooterButtons(<div className='Memo-Button' onClick={() => this.edit()}>
      <Ok className='Button' />
      <span>Save Card</span>
    </div>
    )
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription = null;
    }
  }

  async edit() {
    try {
      if (this.state.value && this.state.translation) {
        let card = { value: this.state.value, translation: this.state.translation }
        if (this.state.useNextAt) card = { ...card, ...{ nextAt: this.state.nextAt } }

        await deleteCard(this.state.initialValue)
        await upsertCard(card, false)

        this.setState({ navigate: true })
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <div className="Edit">
        <IdParam onMount={(id) => this.subscribe(id)} />
        <div className='Value'>
          <div className='Label'>Value</div>
          <textarea value={this.state.value} onChange={ev => {
            this.setState({ value: ev.target.value.trim() })
          }}>
          </textarea>
        </div>
        <div className='Value'>
          <div className='Label'>Translation</div>
          <textarea value={this.state.translation} onChange={ev => this.setState({ translation: ev.target.value.trim() })}>
          </textarea>
        </div>
        <div className='Clock Value'>
          <div className='Label'>Next At</div>
          <div className='Clock-Value'>
            <Clock className={`Clock-Button ${this.state.useNextAt && 'Toggled'}`} onClick={() => this.setState((prev: EditScreenState) => {
              return { useNextAt: !prev.useNextAt }
            })} />
            {this.state.useNextAt && <Calendar date={this.state.nextAt ? this.state.nextAt : new Date()} onChange={e =>
              this.setState({ nextAt: e })
            } />}
          </div>
        </div>
        {this.state.navigate && <Navigate to={"/cards"}></Navigate>}
      </div>
    );
  }
}

export default EditScreen;
