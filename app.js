var bpmValue = document.getElementById('bpm-value'),
    soundInterval = null,
    currentValue = null;

// For sound controls
var AudioContext = window.webkitAudioContext || window.AudioContext;
var ac = new AudioContext(),
    tmpOscillator = null;

var gain = ac.createGain();
gain.gain.value = 0.1;
gain.connect(ac.destination);

function updateBpm(val) {
  // prevents unnecessary updates
  // from too many events
  if(val == currentValue){
    return;
  }
  currentValue = val;
  clearInterval(soundInterval); // no sweat if null
  soundInterval = startBeat(val);
  return bpmValue.innerHTML = val;
};

function startBeat(val) {
  var intervalCount = null,
      flag = false;

  intervalCount = 1/(val/60)*1000;
  //console.log("1 beat every " + intervalCount + " millisecond ");

  if(tmpOscillator !== null){
    tmpOscillator.noteOff(0);
  }

  return setInterval(function(){
    if(flag){

      tmpOscillator.noteOff(0)
      bpmValue.className = null;
      flag = false;
    }else{
      bpmValue.className = 'bigger-number';
      tmpOscillator = ac.createOscillator();
      tmpOscillator.type = 'triangle';
      tmpOscillator.connect(gain);
      tmpOscillator.frequency.value = 440;
      tmpOscillator.noteOn(0);

      flag = true;
    }
  }, intervalCount);
};
