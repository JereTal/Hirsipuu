const input = document.querySelector('input')
const output = document.querySelector('output')
const span = document.querySelector('span')

const words = [
    "programming",
    "javascript",
    "database",
    "markup",
    "framework",
    "variable",
    "style",
    "library",
    "hypertext",
    "asynchronous"
]

let randomizeWord = ''
let maskedword = ''
let arvaus = 0;

const newGame = () => {
    const random = Math.floor(Math.random() * words.length)
    randomizeWord = words[random]
    maskedword = "*".repeat(randomizeWord.length)
    console.log(randomizeWord)
    output.innerHTML = maskedword
    arvaus = 0
    updatearvaus()
}

const win = () => {
    alert(`You have guessed right! The right word is ${randomizeWord}. Total guesses: ${arvaus}`)
    newGame()
}

const replaceFoundChars = (guess) => {
    let found = false;
    for (let i = 0;i<randomizeWord.length;i++) {
        const char = randomizeWord.substring(i,i+1)
        if (char === guess) {
            let newString = maskedword.split('')
            newString.splice(i,1,guess)
            newString = newString.join('')
            maskedword = newString
            found = true;
        }
    }
    if (!found) {
        arvaus++; 
        updatearvaus();
    }
    output.innerHTML = maskedword
}

const updatearvaus = () => {
    span.textContent = `guesses ${arvaus}`;
}

input.addEventListener('keypress',(e) => {
    if (e.key === 'Enter') {
        e.preventDefault()

        const guess = input.value
        if (guess.toLowerCase() === randomizeWord.toLowerCase()) {
            win()
        } else if (guess.length === 1) {
            replaceFoundChars(guess)
            if (maskedword.toLowerCase() === randomizeWord.toLowerCase()) {
                win()
            }
        } else {
            alert("You guessed wrong!")
        }
        input.value=''
    }
})

newGame();