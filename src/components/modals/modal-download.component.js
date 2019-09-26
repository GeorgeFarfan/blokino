window.addEventListener("WebComponentsReady", () => {
    class ModalDownloadProyectComponent extends HTMLElement {
        constructor() {
            super();
            let path_style = this.getAttribute("path_style");

            this.attachShadow({ mode: "open" }).innerHTML =
                `   <style>
            @import url(` +
                path_style +
                `)

            </style>
        
            <div class="modal fade" id="modal-download-program" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
            aria-hidden="true" data-keyboard="false" data-backdrop="static">
            <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header modal-header-success-code">
                            <div class="row  justify-content-md-center ">
                                <div class="col col-md-6">
                                    <i class="far far fa-check-circle modal-header-success-icon"></i>
                                </div>
                            </div>
                        </div>
                        <div class="modal-body">
                            <div class="row  justify-content-md-center m-2">
                                <div class="col col-md-11">
                                    <h2 class="modal-body-title font-weight-bold" id="successTestModalTitle">Se descargo
                                        correctamente el código.</h2>
                                    <p class="text-center h3 mt-3">
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <div class="container">
                                <div class="row justify-content-md-center">
                                    <div class="col col-md-4">
                                        <button type="button"
                                            class="btn btn-lg btn-success btn-success-custom text-center font-weight-bold"
                                            data-dismiss="modal">Cerrar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }
    }
    window.customElements.define("modal-download-proyect", ModalDownloadProyectComponent);
});
