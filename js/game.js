const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player')
const timer = document.querySelector('.timer')

document.getElementById('voltar-btn').addEventListener('click', function() {
    window.location.href = '../index.html';
  });

const characters = [
    'cavaleirocelta',
    'dragaovermelho',
    'exodia',
    'gaiacavaleiro',
    'magonegro',
    'obelisco',
    'olhosazuis',
    'skull',
    'olhosazuisfusao',
    'gaia',
];

const createElement = (tag, className) => {

    const element = document.createElement(tag); 
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () =>{
    const disableCards = document.querySelectorAll('.disable-card');
    
    if(disableCards.length == 20){
        setTimeout(() => {
            clearInterval(this.loop)
            alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi: ${timer.innerHTML} segundos!`);

        },200);
        
    }
}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter == secondCharacter){

        firstCard.firstChild.classList.add('disable-card');
        secondCard.firstChild.classList.add('disable-card');
        firstCard = '';
        secondCard = '';

        checkEndGame();
    }
    else{
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');
            firstCard = '';
            secondCard = '';
        },500);

    }
}

const revealCard = ({target}) =>{

    if (target.parentNode.className.includes('reveal-card')){
        return;
    }
    if (firstCard == ''){ //ve se a primeira carta que esta clicando
        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;
    }
    else if (secondCard == ''){//ve se a segunda carta que esta clicando
        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();
    }

}

const createCard = (characters) => {//responsavel por criar a carta

    const card = createElement('div','card'); //criar um elemento html e recebe a tag do eemento que quer criar seja div ou h eetc
    const front = createElement('div','face front');
    const back = createElement('div','face back');

    front.style.backgroundImage = `url('../cards/${characters}.jpg')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click',revealCard)
    card.setAttribute('data-character',characters)

    return card;
}

const loadGame = () =>{

    const duplicateCharacters = [ ...characters, ...characters ]; //duplicar as imagens, para ter 2 de cada

    const shuffledArray = duplicateCharacters.sort( () => Math.random() -0.5 ); //embaralhar as cartas

    Math.random();

    shuffledArray.forEach((characters) =>{

        const card = createCard(characters); // cria as cartas e coloca no grid 
        grid.appendChild(card);
    });
}

const startTimer = () => {

    this.loop = setInterval(() => {

        const currentTime = +timer.innerHTML; /* pegando o tempo para poder colocar o cronometro no html */
        timer.innerHTML = currentTime + 1;
    }, 1000);

}

window.onload = () => {

    spanPlayer.innerHTML = localStorage.getItem('player');
    startTimer();
    loadGame();
}


