const UTILS = require('./src/utils/functions');
const PAGES = {
  expert: {
    name: 'Programemos',
    path: './src/pages/expert/expert.html',
  },
  challenges: {
    name: 'Desafíos',
    path: './src/pages/challenges.html',
  },
  web: '',
  projects: {
    name: 'Proyectos',
    path: './src/pages/projects/projects.html',
  },
  graph: './src/pages/graph-ide/graph-ide.html',
};

class OptionBlokino extends HTMLElement {
  constructor() {
    super();
    let page = this.getAttribute('page');
    this.attachShadow({
      mode: 'open',
    }).innerHTML = `<button class='btn'> ${PAGES[page].name} </button>`;

    // Events
    this.addEventListener('click', (event) => {
      let page = this.getAttribute('page');
      window.location.href = PAGES[page].path;
    });
  }
  connectedCallback() {
    this.innerHTML = "<b>I'm an x-foo-with-markup!</b>";
    this.style.color = 'blue';
    const template = document.querySelector('template');
    const clone = document.importNode(template.content, true);
    // this.shadowRoot.appendChild(clone);
  }
}
