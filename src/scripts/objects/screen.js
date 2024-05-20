const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user){
        this.userProfile.innerHTML = `<div class="info">
                                        <img src="${user.avatarUrl}" alt="Foto do perfil do usuário"/> 
                                        <div class="data"> 
                                            <h1>${user.name ?? 'Não possui nome cadastrado 😥'}</h1>
                                            <p>${user.bio ?? 'Não possui bio cadastrada 😥'}</p>
                                            <div class="follow">
                                                <p>Followers: ${user.followers}</p>
                                                <p>Following: ${user.following}</p>
                                            </div>
                                        </div>
                                    </div>`
        
        // userProfile.innerHTML = userInfo;

        let repositoriesItens = '';
        user.repositories.forEach(repo => {
            repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`;
        });

        if(user.repositories.length > 0){
            this.userProfile.innerHTML +=  `<div class="repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItens}</ul>
                                            </div>`;
        }

        let eventsItens = '';
        user.events.forEach(event => {
            if(event.type === "PushEvent"){
                eventsItens += `<li><p class="repository">${event.repo.name} --> </p> <p class="message">${event.payload.commits[0].message}</p></li>`;
                console.log(eventsItens);
            }else{
                eventsItens += `<li><p class="repository">${event.repo.name} --></p> <p>Sem commits para mostrar</p></li>`;
            }
            
        });

        if(user.events.length > 0) {
            this.userProfile.innerHTML += `<div class="events">
                                                <h2>Eventos</h2>
                                                <ul>${eventsItens}</ul>
                                            </div>`;
        }
    },
    renderNotFound(){
        this.userProfile.innerHTML = '<h3>Usuário não encontrado</h3>'
    }
}

export { screen }