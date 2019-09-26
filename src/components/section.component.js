window.addEventListener("WebComponentsReady", () => {
    class SectionComponent extends HTMLElement {
        constructor() {
            super();
            let path_style = this.getAttribute("path_style");
            let title = this.getAttribute("title");
            let description = this.getAttribute("description");
            this.attachShadow({ mode: "open" }).innerHTML =
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
    window.customElements.define("section-block", SectionComponent);
});
