import React from 'react';
import { ReactComponent as Ok } from '../assets/images/Ubuntu/Ok.svg';
import { db } from '../utils/db';

type AddScreenProps = {
  setFooterButtons: (e: JSX.Element) => void
}

class AddScreen extends React.Component<AddScreenProps>{
  constructor(props: AddScreenProps) {
    super(props)
    this.add = this.add.bind(this);
  }

  state = {
    value: "",
    translation: ""
  }

  componentDidMount(): void {
    this.props.setFooterButtons(
      <div className='Memo-Button' onClick={() => this.add()} >
        <Ok className='Button' /> <span>Add new Card</span>
      </div>
    )
  }

  async add() {

    try {
      if (this.state.value && this.state.translation) {
        await db.cards.add({ value: this.state.value, translation: this.state.translation })

        this.setState({
          value: "", translation: ""
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <div className="Add">
        <div className='Value'>
          <div className='Label'>Value</div>
          <textarea placeholder="Enter Value" value={this.state.value} onChange={ev => {
            this.setState({ value: ev.target.value.trim() })
          }}>
          </textarea>
        </div>
        <div className='Value'>
          <div className='Label'>Translation</div>
          <textarea placeholder="Enter Translation" value={this.state.translation} onChange={ev =>
            this.setState({ translation: ev.target.value.trim() })}>
          </textarea>
        </div>
      </div>
    );
  }
}

export default AddScreen;
