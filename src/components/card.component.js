'use strict';

/**
 * @author jorge Farfan
 * @description Componente para los CARDS animados de los desafíos.
 */

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
  window.customElements.define('card-block', CardComponent);
});
