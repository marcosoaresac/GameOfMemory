const input = document.querySelector('.login_input');
const button = document.querySelector('.login_button');
const form = document.querySelector('.login_form');

const validateInput = ({ target }) => {
    if (target.value.length > 2){
        button.removeAttribute('disabled');//com mais de 2 caracteres ele habilita o botao de start
        return;
    }
    button.setAttribute('disabled','');//senao ele continue desabilitado
}

const handleSubmit = (event) =>{
    event.preventDefault(); //nao recarregar a pagina
    localStorage.setItem('player',input.value);    //salver o nome que foi inserido
    window.location = 'pages/game.html';//direcionar para dentro do jogo
}

input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);

