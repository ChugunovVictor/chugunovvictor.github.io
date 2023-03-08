
export function speak(text: string, voice?: string) {
  const synth = window.speechSynthesis;
  //const voices = synth.getVoices();

  if (synth.speaking) {
    console.error("speechSynthesis.speaking");
    return;
  }

  if (text !== "") {
    const utterThis = new SpeechSynthesisUtterance(text);
    // http://www.lingoes.net/en/translator/langcode.htm
    if (voice) utterThis.lang = voice;

    utterThis.onend = function (event) {
      console.log("SpeechSynthesisUtterance.onend");
    };

    utterThis.onerror = function (event) {
      console.error("SpeechSynthesisUtterance.onerror");
    };

    // if (voice)
    //   for (let i = 0; i < voices.length; i++) {
    //     if (voices[i].name === voice) {
    //       utterThis.voice = voices[i];
    //       break;
    //     }
    //   }

    
    utterThis.pitch = 1;
    utterThis.rate = 1;
    synth.speak(utterThis);
  }
}




