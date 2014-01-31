var bpmValue = document.getElementById('bpm-value'),
    soundInterval = null,
    currentValue = null;

// For sound controls
var ac = new webkitAudioContext(),
    tmpOscillator;

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

  if(typeof tmpOscillator !== 'undefined'){
    tmpOscillator.noteOff(0);
  }

  return setInterval(function(){
    if(flag){
      bpmValue.className = 'bigger-number';

      tmpOscillator.noteOff(0)
      flag = false;
    }else{
      tmpOscillator = ac.createOscillator();
      tmpOscillator.connect(ac.destination);
      tmpOscillator.frequency.value = 400;
      tmpOscillator.noteOn(0);

      bpmValue.className = null;
      flag = true;
    }
  }, intervalCount);
};
