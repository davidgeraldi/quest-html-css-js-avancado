import { baseUrl, repositoriesQuantity } from '/src/scripts/variables.js';

async function getRepositories(userName) {
    const response = await fetch(`${baseUrl}/${userName}/repos?per_page=${repositoriesQuantity}`);//esse "?per_page=10" significa que vai buscar apenas 10 elementos de repositorio
    return await response.json();
}

export { getRepositories };