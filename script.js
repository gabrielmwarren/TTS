const speech = window.speechSynthesis;
const textField = document.getElementById("textArea")
const voiceSelect = document.getElementById("voice-select");
const pitch = document.getElementById("pitch")
const rate = document.getElementById("rate")


//Browser identifier
// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';

// Chrome 1+
var isChrome = !!window.chrome && !!window.chrome.webstore;

let voices = [];

const getVoices = () => {
    voices = speech.getVoices();
  
    // Loop through voices and create an option for each one
    voices.forEach(voice => {
      // Create option element
      const option = document.createElement('option');
      // Fill option with voice and language
      option.textContent = voice.name + '(' + voice.lang + ')';
  
      // Set needed option attributes
      option.setAttribute('data-lang', voice.lang);
      option.setAttribute('data-name', voice.name);
      voiceSelect.appendChild(option);
    });
  };


if (isFirefox) {
    getVoices();
}
if (isChrome) {
    if (speech.onvoiceschanged !== undefined) {
        speech.onvoiceschanged = getVoices;
    }
} else {
    getVoices()
}

function play() {
    if (speech.speaking) {
        alert("Alredy Speaking");
        return;
    }
    let msg = new SpeechSynthesisUtterance(textField.value)
    let pitchValue = document.getElementById("pitch").value
    let rateValue = document.getElementById("rate").value

    const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

    voices.forEach(voice => {
        if (voice.name === selectedVoice) {
          msg.voice = voice;
        }
    });

    msg.pitch = pitchValue
    msg.rate = rateValue
    speech.speak(msg);
};
