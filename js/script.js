const playBtn = document.getElementById('play_button');
const stopBtn = document.getElementById('stop_button');
const pauseBtn = document.getElementById('pause_button');

const hourField = document.getElementById('hours');
const minutesField = document.getElementById('minutes');
const secondsField = document.getElementById('seconds');

const resultInSeconds = document.getElementById('result_seconds');

// left side fields

const leftHourField = document.getElementById('l_hours');
const leftMinutesField = document.getElementById('l_minutes');
const leftSecondsField = document.getElementById('l_seconds');

const playBtn2 = document.getElementById('play_button_2');
const stopBtn2 = document.getElementById('stop_button_2');
const pauseBtn2 = document.getElementById('pause_button_2');

let startTimer; // можно не объявлять
let leftTime = localStorage.getItem('leftTime') || 0; // сколько секунд осталось

if (Number(leftTime)) {
  const { hours, minutes, seconds } = getHoursMinutesSeconds(Number(leftTime))

  hourField.value = hours
  minutesField.value = minutes
  secondsField.value = seconds

  leftHourField.value = hours
  leftMinutesField.value = minutes
  leftSecondsField.value = seconds
}

// utility functions
function resetFields() {
  // reset values

  hourField.value = '';
  minutesField.value = '';
  secondsField.value = '';

  // enable inputs
  hourField.disabled = false
  minutesField.disabled = false
  secondsField.disabled = false
}

function timer() {
  console.log('timer is running')

  // disable inputs
  hourField.disabled = true
  minutesField.disabled = true
  secondsField.disabled = true

  // decrease left time
  leftTime--;

  if(leftTime === 0) {
    stopTimer();

    return
  }

  const { hours, minutes, seconds } = getHoursMinutesSeconds(leftTime)

  hourField.value = hours
  minutesField.value = minutes
  secondsField.value = seconds

  // update left side fields

  leftHourField.value = hours
  leftMinutesField.value = minutes
  leftSecondsField.value = seconds

  resultInSeconds.innerHTML = leftTime;

  return;
}

//??? Полностью объяснить действия этой функции. а)Что делает "clearInterval" б)Если StartTimer уже равен "0" зачем очищать интервал.
function stopTimer() {
  clearInterval(startTimer);
  startTimer = undefined;
  leftTime = 0;

  localStorage.removeItem('leftTime')

  resetFields();
}

// Когда нажимаем на кнопку "Play", то вызываем функцию которая запускает "Timer" и обновляет данные через каждую секунду. 
//??? объяснить строку с startTimer = setInterval(function(){ (как она работает)
playBtn.addEventListener('click', function() {
  // проверка
  if (startTimer) {
    return
    // clearInterval(startTimer);
  }

  leftTime = calculateLeftTime(hourField.value, minutesField.value, secondsField.value);

  if (leftTime === 0) {
    return alert('Set timer value!')
  }

  if (Number(hourField.value) < 0 || Number(minutesField.value) < 0 || Number(secondsField.value) < 0) {
    resetFields();

    return alert('Timer value should be positive!');
  }

  startTimer = setInterval(function() {
    timer();
  }, 100);
})

playBtn2.addEventListener('click', () => {
  if (startTimer) {
    return
    // clearInterval(startTimer);
  }

  leftTime = calculateLeftTime(leftHourField.value, leftMinutesField.value, leftSecondsField.value);

  if (leftTime === 0) {
    return alert('Set timer value!')
  }

  if (Number(leftHourField.value) < 0 || Number(leftMinutesField.value) < 0 || Number(leftSecondsField.value) < 0) {
    resetFields();

    return alert('Timer value should be positive!');
  }

  startTimer = setInterval(function() {
    timer();
  }, 100);
})

//Когда нажимаем на кнопку "Stop", то вызываем функцию (StopTimer) которая останавливает "Timer" и сбрасывает все значения к нулю.
stopBtn.addEventListener('click', function(){
  stopTimer();
})

pauseBtn.addEventListener('click', function() {
  clearInterval(startTimer);
  startTimer = undefined;
})

window.addEventListener('beforeunload', () => {
  // save current left time
  if (leftTime) {
    localStorage.setItem('leftTime', leftTime)
  }
})


//Выевленные проблемы и вопросы к Алмату 
// 1) Когда мы ставим значение -1 секунда (например), таймер идет в обратном направлении и до бесконечности
// 2) Почему когда мы ставим в input значения, почему ограничение не срабатвывают? maxlength = "2"
// 3) Как сделать Pause? 
// 4) Как сделать синхронным два таймера? 
