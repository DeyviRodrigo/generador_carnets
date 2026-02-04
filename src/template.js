// src/template.js
// Define cardTemplate(row) de forma GLOBAL (window.cardTemplate)
// para que main.js pueda usarlo sin problemas.

(function () {
  function esc(s){
    return String(s ?? "")
      .replaceAll("&","&amp;")
      .replaceAll("<","&lt;")
      .replaceAll(">","&gt;")
      .replaceAll('"',"&quot;");
  }

  window.cardTemplate = function cardTemplate(row){
    return `
      <div class="card">
        <div class="left">
          <div class="logo-box">
            <img class="logo" src="assets/logo.png" alt="Logo">
            <div class="logo-caption">UNIDAD MINERA “CHANA - A”</div>
          </div>

          <div class="title">
            PROYECTO MINERO<br>
            <span class="title-strong">CHANA - A</span>
          </div>

          <div class="subtitle">“CONSTRUYENDO MINERIA RESPONSABLE”</div>
        </div>

        <div class="right">
          <div class="top-line"></div>

          <div class="fields">
            <div class="row">
              <span class="label">NOMBRE:</span>
              <span class="value">${esc(row.NombreCompleto)}</span>
            </div>

            <div class="row">
              <span class="label">CARGO:</span>
              <span class="value">${esc(row.Cargo)}</span>
            </div>

            <div class="row">
              <span class="label">DNI:</span>
              <span class="value">${esc(row.DNI)}</span>
            </div>
          </div>

          <div class="qr-wrap">
            <img class="qr" src="${esc(row.QR_URL)}" alt="QR">
          </div>

          <div class="bottom-line"></div>
        </div>
      </div>
    `;
  };
})();
