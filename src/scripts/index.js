import { getUser } from '/src/scripts/services/user.js';
import { getRepositories } from '/src/scripts/services/repositories.js';
import { user } from '/src/scripts/objects/user.js';
import { screen } from '/src/scripts/objects/screen.js';

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
    
    const repositoriesResponse = await getRepositories(userName)
    
    user.setInfo(userResponse)
    console.log(user);//apagar!!
    user.setRepositories(repositoriesResponse);
    
    screen.renderUser(user);

    // getUser(userName).then(userData => {
    //     //vamos pegar:
    //     //avatar
    //     //bio
    //     //nome
    //     let userInfo = `<div class="info">
    //                         <img src="${userData.avatar_url}" alt="Foto do perfil do usuário"/> 
    //                         <div class="data"> 
    //                             <h1>${userData.name ?? 'Não possui nome cadastrado 😥'}</h1>
    //                             <p>${userData.bio ?? 'Não possui bio cadastrada 😥'}</p>
    //                         </div>
    //                     </div>`

    //     document.querySelector('.profile-data').innerHTML = userInfo;

    //     getUserRepositories(userName);
    // })
}

// function getUserRepositories(userName) {
//     getRepositories(userName).then(reposData => {
//         let repositoriesItens = '';
//         reposData.forEach(repo => {
//             repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`;
//         });

//         document.querySelector('.profile-data').innerHTML += `<div class="repositories section">
//                                                                     <h2>Repositórios</h2>
//                                                                     <ul>${repositoriesItens}</ul>
//                                                               </div>`;
//     })
// }