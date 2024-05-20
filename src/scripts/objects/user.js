const user = { 
    avatarUrl: '',
    name: '',
    bio: '',
    userName: '',
    followers: '',
    following: '',
    repositories: [],
    forks: '',
    watchers: '',
    stars: '',
    language: '',
    events: [],
    setInfo(gitHubUser){
        this.avatarUrl = gitHubUser.avatar_url
        this.name = gitHubUser.name
        this.bio = gitHubUser.bio
        this.userName = gitHubUser.login
        this.followers = gitHubUser.followers
        this.following = gitHubUser.following
    },
    setRepositories(repositories){
        this.repositories = repositories
        this.forks = repositories.forks
        this.watchers = repositories.watchers
        this.language = repositories.language
        this.stars = repositories.stargazers_count
    },

    setEvents(events){
        this.events = events
    }
}

export { user }