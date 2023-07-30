const playBtn = document.getElementById('play_button');
const stopBtn = document.getElementById('stop_button');
const pauseBtn = document.getElementById('pause_button');

const hourField = document.getElementById('hours');
const minutesField = document.getElementById('minutes');
const secondsField = document.getElementById('seconds');


let startTimer;
let leftTime;


function timer() {
  console.log("running timer");

  // disable inputs
  hourField.disabled = true;
  minutesField.disabled = true;
  secondsField.disabled = true;

  leftTime--;

  if(leftTime === 0) {
    stopTimer();
    resetFields();
  }

  else if (secondsField.value != 0) {
    secondsField.value--;
  }
 
  else if (minutesField.value !=0 && secondsField.value == 0) {
    secondsField.value = 59;
    minutesField.value--;
  }

  else if(hourField.value != 0 && minutesField.value == 0 && secondsField.value == 0) {  
    minutesField.value = 59;
    secondsField.value = 59;
    hourField.value--;
  }

  return;

}

function stopTimer() {
  clearInterval(startTimer);
  startTimer = undefined;
}

function resetFields() {
  //reset values
  hourField.value = "";
  minutesField.value = "";
  secondsField.value = "";

  //enable inputs
  hourField.disabled = false;
  minutesField.disabled = false;
  secondsField.disabled = false;
}

function calculateLeftTime() {
  const seconds = Number(secondsField.value);
  const minutes = Number(minutesField.value);
  const hours = Number(hourField.value);

  return seconds + (minutes * 60) + (hours * 60 * 60);

}


//Когда нажимаем на кнопку "Play", то вызываем функцию которая запускает "Timer" и обновляет данные через каждую секунду. 
playBtn.addEventListener('click', function() {
  

  //??? при нажатии на кнопку старт, если startTimer = 0 мы пропускаем 1-ый if statement и переходим ко 2-му и запускаем интервал
  //??? при нажатии на кнопку старт, если startTimer = 1 мы просто выходим из функции и ничего не делаем (не переходим ко 2-му if statement и при этом не запускаем интервал)
  if (startTimer) {
    return;
  }

  leftTime = calculateLeftTime();
  console.log(leftTime);

  if(leftTime === 0) {
    return alert('Set timer value!');
  }  

  if(Number(hourField.value < 0) || Number(minutesField.value < 0) || Number(secondsField.value < 0)) {
    resetFields();
    return alert('The value must be positive');
  }

  startTimer = setInterval(function(){
    timer();
  }, 1000);

})


//Когда нажимаем на кнопку "Stop", то вызываем функцию (StopTimer) которая останавливает "Timer" и сбрасывает все значения к нулю.
stopBtn.addEventListener('click', function(){
  stopTimer();
  resetFields();
})

pauseBtn.addEventListener('click', function() {
  clearInterval(startTimer);
  startTimer = undefined;
})







//Выевленные проблемы и вопросы к Алмату 
// 1) Когда мы ставим значение -1 секунда (например), таймер идет в обратном направлении и до бесконечности
// 2) Почему когда мы ставим в input значения, почему ограничение не срабатвывают? maxlength = "2"
// 3) Как сделать Pause? 
// 4) Как сделать синхронным два таймера? 
// 5) Когда нажимаем старт несколько раз таймер бежит в два раза быстрее
