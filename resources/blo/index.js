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
  editor: {
    name: 'Editor',
    path: './src/pages/graph-ide/graph-ide.html',
  },
  nodeBot: {
    name: 'NodeBots',
    path: './src/pages/projects/projects.html',
  },
};
window.addEventListener('WebComponentsReady', () => {
  class CardComponent extends HTMLElement {
    constructor() {
      super();
      let path_style = this.getAttribute('path_style');
      let title = this.getAttribute('title');
      let classs_challenge = '';
      let description = this.getAttribute('description');

      let type = this.getAttribute('type');
      switch (type) {
        case 'beginner':
          classs_challenge = 'challenge_title_beginner';
          break;
        case 'intermediate':
          classs_challenge = 'challenge_title_intermediate';
          break;
        case 'advanced':
          classs_challenge = 'challenge_title_advanced';
          break;
        case 'expert':
          classs_challenge = 'challenge_title_expert';
          break;
      }
      this.attachShadow({
        mode: 'open',
      }).innerHTML =
        `   <style>
                    @import url(` +
        path_style +
        `)
    
                  </style>
                
                    <div class="challenge">
                        <div class=` +
        classs_challenge +
        `>
                    <i class="far fa-robot icon-challenge"></i>
                            ` +
        title +
        `
                        </div>
                        <div class="challenge_content">
                    ` +
        description +
        `
                    <hr>
                            <i class="far fa-caret-square-right challenge_enter"></i>
                        </div>
     
                </div>
                `;
    }
  }
  class SectionComponent extends HTMLElement {
    constructor() {
      super();
      let path_style = this.getAttribute('path_style');
      let title = this.getAttribute('title');
      let description = this.getAttribute('description');
      this.attachShadow({ mode: 'open' }).innerHTML =
        `
              <style>
                @import url(` +
        path_style +
        `)

              </style>
              <div class="pb-1">
                  <h1><span class="badge badge-light custom-badge-app">` +
        title +
        `</span></h1>
                  <p class="ide-info h5 mt-3">
                    ` +
        description +
        `
              </div>
            `;
    }
  }

  class BloOption extends HTMLElement {
    constructor() {
      super();
      let page = this.getAttribute('page');
      const style = `background-color: #944e5d;color: white;border: none;padding:1rem;font-family: inherit;`;
      this.innerHTML = `<button style='${style}'> ${PAGES[page].name} </button>`;
      // Events
      this.addEventListener('click', (event) => {
        let page = this.getAttribute('page');
        window.location.href = PAGES[page].path;
      });
    }
  }

  class Image extends HTMLElement {
    constructor() {
      super();
      let src = this.getAttribute('src');
      let size = this.getAttribute('size');
      let style = '';
      switch (size) {
        case 'big':
          style = `width:600px; height: 600px;`;
          break;
        case 'medium':
          style = `width:300px; height: 300px;`;
          break;
        case 'small':
          style = `width:150px; height: 150px;`;

          break;
        default:
          break;
      }
      this.innerHTML = `<img style='${style}' src=${src}></img>`;
    }
  }

  window.customElements.define('section-block', SectionComponent);
  window.customElements.define('card-block', CardComponent);
  window.customElements.define('blo-option', BloOption);
  window, customElements.define('blo-image', Image);
});
