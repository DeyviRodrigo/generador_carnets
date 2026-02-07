// src/templates.js
// Define 4 templates. Cada template tiene:
// - id, name, desc
// - render(row): devuelve HTML del carnet

window.TEMPLATES = [
  {
    id: "standard_portrait",
    name: "Standard Portrait",
    desc: "Foto, Nombre, Rol, ID#",
    render: (row) => portraitTemplate(row),
  },
  {
    id: "corporate_landscape",
    name: "Corporate Landscape",
    desc: "Logo, Nombre, Cargo, DNI, QR",
    render: (row) => corporateLandscape(row),
  },
  {
    id: "carnet_chana_a",
    name: "Carnet Chana A",
    desc: "Modelo oficial Proyecto Minero Chana - A",
    render: (row) => carnetChanaA(row),
  },
  {
    id: "minimalist",
    name: "Minimalist",
    desc: "Nombre, Cargo, QR grande",
    render: (row) => minimalist(row),
  },
  {
    id: "event_badge",
    name: "Event Badge",
    desc: "Foto grande, Nombre, Zona",
    render: (row) => eventBadge(row),
  },
];

function esc(s){
  return String(s ?? "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;");
}

/* ---------- TEMPLATE: CARNET CHANA A ---------- */
function carnetChanaA(row){
  return `
  <div class="idcard idcard-chana">
    <svg class="chana-line chana-line-top" width="282" height="6" viewBox="0 0 282 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M-1.0252e-05 2.66669C-1.01232e-05 4.13945 1.1939 5.33335 2.66666 5.33335C4.13942 5.33335 5.33332 4.13945 5.33332 2.66669C5.33332 1.19393 4.13942 2.01368e-05 2.66666 2.02656e-05C1.1939 2.03943e-05 -1.03808e-05 1.19393 -1.0252e-05 2.66669ZM276 2.66666C276 4.13942 277.194 5.33333 278.667 5.33333C280.139 5.33333 281.333 4.13942 281.333 2.66666C281.333 1.1939 280.139 -3.99186e-06 278.667 -3.86311e-06C277.194 -3.73436e-06 276 1.1939 276 2.66666ZM2.66666 2.66669L2.66666 3.16669L278.667 3.16666L278.667 2.66666L278.667 2.16666L2.66666 2.16669L2.66666 2.66669Z" fill="#08355E"/>
    </svg>

    <svg class="chana-polygon" width="78" height="75" viewBox="0 0 78 75" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M-2.24634e-08 0.0143203L77.8778 3.9449e-06L22.7175 74.5051L-2.24634e-08 0.0143203Z" fill="#08355E"/>
    </svg>

    <svg class="chana-vector" width="321" height="216" viewBox="0 0 321 216" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32.6016 0L0 26.6087V163.304L32.6016 216H321V182.609H185.077L103.322 0H32.6016Z" fill="#11446F"/>
    </svg>

    <div class="chana-frame">
      <div class="chana-frame-title">
        <div class="chana-title">PROYECTO MINERO</div>
        <div class="chana-subtitle">CHANA - A</div>
      </div>
      <div class="chana-motto">“CONTRUYENDO MINERIA<br />RESPONSABLE”</div>
    </div>

    <svg class="chana-line chana-line-bottom" width="282" height="6" viewBox="0 0 282 6" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M-1.0252e-05 2.66669C-1.01232e-05 4.13945 1.1939 5.33335 2.66666 5.33335C4.13942 5.33335 5.33332 4.13945 5.33332 2.66669C5.33332 1.19393 4.13942 2.01368e-05 2.66666 2.02656e-05C1.1939 2.03943e-05 -1.03808e-05 1.19393 -1.0252e-05 2.66669ZM276 2.66666C276 4.13942 277.194 5.33333 278.667 5.33333C280.139 5.33333 281.333 4.13942 281.333 2.66666C281.333 1.1939 280.139 -3.99186e-06 278.667 -3.86311e-06C277.194 -3.73436e-06 276 1.1939 276 2.66666ZM2.66666 2.66669L2.66666 3.16669L278.667 3.16666L278.667 2.66666L278.667 2.16666L2.66666 2.16669L2.66666 2.66669Z" fill="white"/>
    </svg>

    <img class="chana-logo" src="assets/modelos-carnet/carnet_chana_a/logo.png" alt="Logo Chana A">

    <div class="chana-qr">
      <img src="${esc(row.QR_URL)}" alt="QR">
    </div>

    <div class="chana-fields">
      <div class="chana-labels">
        <div class="chana-label">NOMBRE:</div>
        <div class="chana-label">CARGO:</div>
        <div class="chana-label">DNI:</div>
      </div>
      <div class="chana-values">
        <div class="chana-value">${esc(row.NombreCompleto)}</div>
        <div class="chana-value">${esc(row.Cargo)}</div>
        <div class="chana-value">${esc(row.DNI)}</div>
      </div>
    </div>
  </div>`;
}

/* ---------- TEMPLATE 2: TU CARNET (Landscape) ---------- */
function corporateLandscape(row){
  return `
  <div class="idcard idcard-corp">
    <div class="corp-left">
      <div class="corp-logoBox">
        <img class="corp-logo" src="assets/logo.png" alt="Logo">
      </div>

      <div class="corp-title">
        PROYECTO<br><span>MINERO</span><br>CHANA - A
      </div>

      <div class="corp-sub">“CONSTRUYENDO MINERIA RESPONSABLE”</div>
    </div>

    <div class="corp-right">
      <div class="corp-line top"></div>

      <div class="corp-fields">
        <div class="frow"><span class="lab">NOMBRE:</span><span class="val">${esc(row.NombreCompleto)}</span></div>
        <div class="frow"><span class="lab">CARGO:</span><span class="val">${esc(row.Cargo)}</span></div>
        <div class="frow"><span class="lab">DNI:</span><span class="val">${esc(row.DNI)}</span></div>
      </div>

      <div class="corp-qr">
        <img src="${esc(row.QR_URL)}" alt="QR">
      </div>

      <div class="corp-line bot"></div>
    </div>
  </div>`;
}

/* ---------- TEMPLATE 1: Portrait (placeholder simple) ---------- */
function portraitTemplate(row){
  return `
  <div class="idcard idcard-portrait">
    <div class="p-top"></div>
    <div class="p-body">
      <div class="p-photo"></div>
      <div class="p-text">
        <div class="p-name">${esc(row.NombreCompleto)}</div>
        <div class="p-role">${esc(row.Cargo)}</div>
        <div class="p-id">ID: ${esc(row.DNI)}</div>
      </div>
    </div>
  </div>`;
}

/* ---------- TEMPLATE 3: Minimalist ---------- */
function minimalist(row){
  return `
  <div class="idcard idcard-min">
    <div class="m-name">${esc(row.NombreCompleto)}</div>
    <div class="m-role">${esc(row.Cargo)}</div>
    <div class="m-qr"><img src="${esc(row.QR_URL)}" alt="QR"></div>
  </div>`;
}

/* ---------- TEMPLATE 4: Event Badge ---------- */
function eventBadge(row){
  return `
  <div class="idcard idcard-event">
    <div class="e-photo"></div>
    <div class="e-name">${esc(row.NombreCompleto)}</div>
    <div class="e-zone">ZONA: ${esc(row.Zona ?? "A")}</div>
  </div>`;
}

/* ---- Estilos específicos de templates (inyectados) ---- */
(function injectTemplateCSS(){
  const css = `
  .idcard-corp{ grid-template-columns: 34mm 1fr; border-color:#0f3f64; background:#e6eaee; }
  .corp-left{
    background:#0f3f64;
    padding: 4mm 3mm;
    display:flex; flex-direction:column; gap:3mm;
    clip-path: polygon(0 0, 100% 0, 78% 50%, 100% 100%, 0 100%);
  }
  .corp-logoBox{
    border-radius: 10px;
    padding: 6px;
    background: rgba(255,255,255,0.10);
    border: 1px solid rgba(255,255,255,0.18);
    text-align:center;
  }
  .corp-logo{ width:100%; height: 12mm; object-fit:contain; display:block; filter: drop-shadow(0 1px 1px rgba(0,0,0,0.25)); }
  .corp-title{ color:#f2d36b; font-weight:900; line-height:1.05; font-size: 12px; }
  .corp-title span{ letter-spacing: 1px; }
  .corp-sub{ margin-top:auto; color:#f2d36b; font-weight:900; font-size: 10px; line-height:1.1; }

  .corp-right{ position:relative; padding: 4mm 4mm 3.5mm 6mm; color:#0f3f64; }
  .corp-line{ position:absolute; left:6mm; right:4mm; height:2px; background:#0f3f64; border-radius:999px; opacity:.9; }
  .corp-line.top{ top: 3mm; }
  .corp-line.bot{ bottom: 3mm; }

  .corp-fields{ margin-top: 5mm; display:grid; gap: 7px; }
  .frow{ display:grid; grid-template-columns: 52px 1fr; column-gap: 8px; align-items:start; }
  .lab{ font-weight:900; }
  .val{ font-weight:700; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; }

  .corp-qr{
    position:absolute; right: 5mm; bottom: 7mm;
    width: 18mm; height: 18mm;
    background:#fff; border-radius:10px;
    padding: 6px; border:1px solid rgba(15,63,100,.25);
  }
  .corp-qr img{ width:100%; height:100%; object-fit:contain; display:block; }

  /* otros templates básicos */
  .idcard-portrait{ background:#fff; border-color:#cfd7ea; padding: 10px; }
  .p-top{ height: 20px; background:#2563eb; border-radius: 10px; }
  .p-body{ display:flex; gap:10px; margin-top:10px; }
  .p-photo{ width:60px; height:60px; border-radius:999px; background:#dbe7ff; }
  .p-name{ font-weight:900; }
  .p-role{ color:#667085; font-size:12px; margin-top:4px; }
  .p-id{ margin-top:6px; font-size:12px; }

  .idcard-min{ background:#fff; border-color:#0f3f64; padding: 10px; display:flex; flex-direction:column; justify-content:space-between; }
  .m-name{ font-weight:900; }
  .m-role{ color:#667085; font-size:12px; }
  .m-qr{ width: 22mm; height: 22mm; background:#fff; border:1px solid #e6eaf2; border-radius:12px; padding:6px; }
  .m-qr img{ width:100%; height:100%; object-fit:contain; }

  .idcard-event{ background:#fff; border-color:#111827; padding:10px; display:flex; flex-direction:column; gap:10px; }
  .e-photo{ height: 32mm; background:#e6eaee; border-radius: 12px; }
  .e-name{ font-weight:900; }
  .e-zone{ color:#667085; font-size:12px; }
  `;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
})();
