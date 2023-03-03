import React from 'react';
import { Button, Select } from '../components';
import { ReactComponent as Ok } from '../assets/images/Ubuntu/Ok.svg'

type SettingsState = {
  voices: SpeechSynthesisVoice[],
  themes: string[]
}

const languageOption = (e: SpeechSynthesisVoice) => <option
  data-lang={e.lang}
  data-name={e.name}
  key={e.name}
>
  {e.name}
</option>


class Settings extends React.Component {
  state: SettingsState = {
    voices: [],
    themes: ["Ubuntu", "Ubuntu-Dark", "Memo-Ink", "Memo-Ink-Dark"]
  }

  componentDidMount(): void {
    let s = this.setSpeech();
    s.then((voices) => {
      this.setState({
        voices
      })
    });
  }

  setSpeech() {
    return new Promise(
      function (resolve, reject) {
        let synth = window.speechSynthesis;
        let id: any;

        id = setInterval(() => {
          if (synth.getVoices().length !== 0) {
            const voices = synth.getVoices().sort(function (a, b) {
              const aname = a.name.toUpperCase();
              const bname = b.name.toUpperCase();

              if (aname < bname) {
                return -1;
              } else if (aname == bname) {
                return 0;
              } else {
                return +1;
              }
            });
            resolve(voices);
            clearInterval(id);
          }
        }, 10);
      }
    )
  }

  render() {
    return (
      <div className="Settings">
        <div>Voice:</div>
        <Select items={this.state.voices} name="language" option={languageOption} />
        <div>Theme:</div>
        <Select items={this.state.themes} name="theme" />

        <Button path={"/export"}>
          <Ok className='Button' /> Export
        </Button>

        <Button path={"/import"}>
          <Ok className='Button' /> Import
        </Button>
      </div>
    );
  }
}

export default Settings;
