const playBtn = document.getElementById('play_button');
const stopBtn = document.getElementById('stop_button');
const pause = document.getElementById('pause_button');

const hourField = document.getElementById('hours');
const minutesField = document.getElementById('minutes');
const secondsField = document.getElementById('seconds');


let startTimer = 0;

function timer() {
  //??? если hours, minutes and seconds = 0, то сбросить все показатели на нули.
  if(hourField.value == 0 && minutesField.value == 0 && secondsField.value == 0) {
    hourField.value = "00";
    minutesField.value = "00";
    secondsField.value = "00";
  }
  //если в секундной строке не ноль то отсчитывается -1 каждую секунду
  else if (secondsField.value != 0) {
    secondsField.value--;
  }
  //объяснить логику действий?
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


//??? Полностью объяснить действия этой функции. а)Что делает "clearInterval" б)Если StartTimer уже равен "0" зачем очищать интервал.

function stopTimer() {
  clearInterval(startTimer);
}


//Когда нажимаем на кнопку "Play", то вызываем функцию которая запускает "Timer" и обновляет данные через каждую секунду. 
//??? объяснить строку с startTimer = setInterval(function(){ (как она работает)
playBtn.addEventListener('click', function() {
  function startInterval() {
    startTimer = setInterval(function(){
      timer();
    }, 1000);
  }
  startInterval();
})


//Когда нажимаем на кнопку "Stop", то вызываем функцию (StopTimer) которая останавливает "Timer" и сбрасывает все значения к нулю.
stopBtn.addEventListener('click', function(){
  hourField.value = "00";
  minutesField.value = "00";
  secondsField.value = "00";
  stopTimer();
})





//Выевленные проблемы и вопросы к Алмату 
// 1) Когда мы ставим значение -1 секунда (например), таймер идет в обратном направлении и до бесконечности
// 2) Почему когда мы ставим в input значения, почему ограничение не срабатвывают? maxlength = "2"
// 3) Как сделать Pause? 
// 4) Как сделать синхронным два таймера? 
