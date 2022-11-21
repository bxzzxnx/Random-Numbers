const button = document.querySelector('.btn');
const clearButton = document.querySelector('.reset')
const userInput = document.querySelector('#number');
const form = document.querySelector('.form');
const number = Math.floor(Math.random() *100) + 1;
let guessedNumbers = [];
let attempts = 0;

clearButton.style.display = 'none';

const feedbackToUser  = (feedback, attempts, numbers) =>{
    document.querySelector('.feedback').textContent = feedback;
    document.querySelector('.attempts').textContent  = attempts
    document.querySelector('.numbers').textContent  = numbers
};

const feedbackMessage = (message, attempts) =>{
    feedbackToUser(message, `Número de tentativas: ${attempts}`, `Números ja advinhados: ${guessedNumbers.join(', ')}`)
    userInput.value = '';
};

const showGuessedNumbers = () => {
    guessedNumbers.push(userInput.value);
    attempts++;
};

const correctNumber = () => {
    userInput.disabled = true;
    button.disabled = true;
    feedbackMessage('Acertou !!!', attempts);
    clearButton.style.display = 'inline';
    clearButton.addEventListener('click', () => {
        feedbackToUser(' ', ' ', ' ');
        clearButton.style.display = 'none';
        document.location.reload(true);
    })
};

form.addEventListener('submit', event => {
    event.preventDefault();
    const notAValidNumber = userInput.value < 1 || userInput.value > 100 || userInput.value.length > 3;
    if(notAValidNumber){
        document.querySelector('.feedback').textContent = 'Insira um valor de 1 a 100'
        userInput.value = ''
    }
    else{
        showGuessedNumbers();
        if (userInput.value < number){
            feedbackMessage('Número muito baixo', attempts)
        }
        else if(userInput.value == number){
            correctNumber();            
        }
        else{
            feedbackMessage('Número muito alto', attempts)
        }
    }
});