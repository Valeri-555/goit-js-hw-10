import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");

function createPromise(event) {
  event.preventDefault(); 

  const stateInput = document.querySelector('input[name="state"]:checked');
  const numberInput = document.querySelector('input[type="number"]');
  
  if (!stateInput || !numberInput) {
    console.error('Error: Unable to find state or delay input element.');
    return;
  };

  const stateChoice = stateInput.value;
  const delayMilSecond = Number(numberInput.value);

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (stateChoice === 'fulfilled') {
        resolve(delayMilSecond);
      } else if (stateChoice === 'rejected') {
        reject(delayMilSecond);
      }
    }, delayMilSecond);
  });

  promise
    .then((delay) => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topRight',
      });
    })
    .catch((delay) => {
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
        position: 'topRight',
      });
    });
};

form.addEventListener('submit', createPromise);