var bpmValue = document.getElementById('bpm-value'),
    soundInterval = null,
    currentValue = null;

function updateBpm(val) {
  // prevents unnecessary updates
  // from too many events
  if(val == currentValue){
    return;
  }
  currentValue = val;
  clearInterval(soundInterval); // no sweat if null
  soundInterval = startSound(val);
  return bpmValue.innerHTML = val;
};

function startSound(val) {      
  var intervalCount = null,
      flag = false;

  intervalCount = 1/(val/60)*1000;
  //console.log("1 beat every " + intervalCount + " millisecond ");

  return setInterval(function(){
    if(flag){
      bpmValue.style.color = 'green';
      flag = false;
    }else{
      bpmValue.style.color = 'white';
      flag = true;
    }
  }, intervalCount);
};
