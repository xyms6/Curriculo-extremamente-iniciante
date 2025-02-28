// script.js

// Função para alternar o tema
function toggleTheme() {
    const body = document.body;
    const themeToggleInput = document.querySelector('.theme-toggle input');
    body.classList.toggle('light-theme');
    body.classList.toggle('dark-theme');
    themeToggleInput.setAttribute('aria-checked', body.classList.contains('dark-theme'));
}

// Adiciona o evento de clique ao botão de alternância de tema
document.querySelector('.theme-toggle').addEventListener('click', toggleTheme);

// Função para buscar os projetos do GitHub (opcional)
async function fetchProjects() {
    const response = await fetch('https://api.github.com/users/xyms6/repos');
    const projectsList = document.querySelector('.projects-list');

    // Exibir um loader enquanto os projetos são carregados
    const loader = document.createElement('div');
    loader.className = 'loader';
    loader.innerText = 'Carregando projetos...';
    projectsList.appendChild(loader);

    try {
        const data = await response.json();

        // Verifica se a resposta é válida
        if (!response.ok) {
            throw new Error(data.message || 'Erro ao buscar projetos');
        }

        // Limpa a lista de projetos antes de adicionar novos
        projectsList.innerHTML = '';

        data.forEach(project => {
            const projectCard = document.createElement('div');
            projectCard.classList.add('project-card');

            projectCard.innerHTML = `
                <h4 class="project-title">${project.name}</h4>
                <p class="project-description">${project.description || 'Sem descrição'}</p>
                <a href="${project.html_url}" target="_blank">Ver no GitHub</a>
            `;

            projectsList.appendChild(projectCard);
        });
    } catch (error) {
        console.error('Erro ao carregar projetos:', error);
        const errorMessage = document.createElement('div');
        errorMessage.textContent = 'Erro ao carregar projetos. Tente novamente mais tarde.';
        projectsList.appendChild(errorMessage);
    } finally {
        // Remove o loader após carregar os projetos
        loader.remove();
    }
}

// Chama a função para buscar projetos ao carregar a página
document.addEventListener('DOMContentLoaded', fetchProjects);