import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import 'flatpickr/dist/flatpickr.min.css';

const startBtn = document.querySelector('button');
const dataInput = document.querySelector('input#datetime-picker');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
const timer = document.querySelector(".timer");

let userSelectedDate;
let timerRunning = false;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    if (userSelectedDate < Date.now()) {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
      startBtn.disabled = true;
    } else {
        startBtn.disabled = false;
    }
  },
};

startBtn.disabled = true;

let countdownInterval;

function startTimer() {
  if (timerRunning) {
    return;
  }

  timerRunning = true;
  countdownInterval = setInterval(updateTimer, 1000, userSelectedDate);
  startBtn.disabled = true; 
  dataInput.setAttribute('disabled', 'disabled'); 
};

function updateTimer(endDate) {
  const currentDate = new Date();
  const remainingTime = endDate - currentDate;
  const { days, hours, minutes, seconds } = convertMs(remainingTime);

  if (!isNaN(days) && !isNaN(hours) && !isNaN(minutes) && !isNaN(seconds)) {
    dataDays.textContent = formatTime(days);
    dataHours.textContent = formatTime(hours);
    dataMinutes.textContent = formatTime(minutes);
    dataSeconds.textContent = formatTime(seconds);
  }

  if (remainingTime <= 0) {
    stopTimer();
  }
};

startBtn.addEventListener("click", () => {
  if (userSelectedDate && !timerRunning) {
    startTimer();
  }
});

function stopTimer() {
  if (countdownInterval) {
    clearInterval(countdownInterval);

    dataDays.textContent = '00';
    dataHours.textContent = '00';
    dataMinutes.textContent = '00';
    dataSeconds.textContent = '00';

    countdownInterval = null;
    timerRunning = false;
    startBtn.disabled = false; 
    dataInput.removeAttribute('disabled');
  }
};

function formatTime(value) {
  return String(value).padStart(2, '0');
};

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
};

flatpickr(dataInput, options);