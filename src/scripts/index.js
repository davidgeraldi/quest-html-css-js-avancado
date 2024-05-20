import { getUser } from '/src/scripts/services/user.js';
import { getRepositories } from '/src/scripts/services/repositories.js';
import { user } from '/src/scripts/objects/user.js';
import { screen } from '/src/scripts/objects/screen.js';
import { getEvents } from '/src/scripts/services/events.js';

document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value;
    if(validateEmptyInput(userName)) return;
    getUserData(userName);
})

//PARA FAZER COM QUE A TECLA ENTER DO COMPUTADOR TAMBÉM RESPONDA À PESQUISA
document.getElementById('input-search').addEventListener('keyup', (e) => {
    const userName = e.target.value;//pega o valor html que esta no input text
    // const key = e.which || e.keyCode; // pega o código da chave(tecla)
    // const isEnterKeyPressed = key === 13;//13 é o códgio da tecla enter do computador
    if (e.key === "Enter") {
        if(validateEmptyInput(userName)) return;
        getUserData(userName);
    }
})

function validateEmptyInput(userName){
    if(userName.length === 0){
        alert('Preencha o campo com o nome do usuário do GitHub');
        return true;//tem que ter o return para o código não seguir normalmente
    }
}

async function getUserData(userName) {

    const userResponse = await getUser(userName);
    if(userResponse.message === 'Not Found'){
        screen.renderNotFound();
        return
    }
    
    const repositoriesResponse = await getRepositories(userName);
    const eventsResponse = await getEvents(userName);

    user.setInfo(userResponse);
    user.setRepositories(repositoriesResponse);
    user.setEvents(eventsResponse);

    screen.renderUser(user);
}