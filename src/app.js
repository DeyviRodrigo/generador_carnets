// src/app.js
let uploadedRows = [];
let selectedTemplateId = "corporate_landscape"; // default

const REQUIRED_HEADERS = ["id", "dni", "cargo", "nombre_completo"];

const elDrop = document.getElementById("dropzone");
const elFile = document.getElementById("fileInput");
const elBtnSelect = document.getElementById("btnSelect");
const elFileMeta = document.getElementById("fileMeta");
const elFileError = document.getElementById("fileError");

const elTplGrid = document.getElementById("tplGrid");
const elTplCount = document.getElementById("tplCount");
const elPreviewArea = document.getElementById("previewArea");
const elPreviewMeta = document.getElementById("previewMeta");

const elBtnGenerate = document.getElementById("btnGenerate");
const printRoot = document.getElementById("printRoot");
const elBtnDownloadTemplate = document.getElementById("btnDownloadTemplate");

initTemplatesUI();
wireDropzone();
wireButtons();

function wireButtons(){
  elBtnDownloadTemplate?.addEventListener("click", () => downloadTemplate());
  elBtnSelect.addEventListener("click", () => elFile.click());
  elFile.addEventListener("change", async (e) => {
    const f = e.target.files?.[0];
    if (f) await handleFile(f);
  });

  elBtnGenerate.addEventListener("click", () => {
    if (!uploadedRows.length) return;
    buildPrintPages(uploadedRows, selectedTemplateId);
    window.print(); // el usuario elige "Guardar como PDF" o imprime
  });
}

function downloadTemplate(){
  const headers = ["id", "dni", "cargo", "nombre_completo"];
  const example = [1, "73445791", "Monitorista", "Eliseo Quenallata Sancho"];
  const data = [headers, example];
  const ws = XLSX.utils.aoa_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Plantilla");
  XLSX.writeFile(wb, "template.xlsx");
}

function wireDropzone(){
  elDrop.addEventListener("click", () => elFile.click());

  elDrop.addEventListener("dragover", (e) => {
    e.preventDefault();
    elDrop.classList.add("drag");
  });
  elDrop.addEventListener("dragleave", () => elDrop.classList.remove("drag"));

  elDrop.addEventListener("drop", async (e) => {
    e.preventDefault();
    elDrop.classList.remove("drag");
    const f = e.dataTransfer.files?.[0];
    if (f) await handleFile(f);
  });
}

async function handleFile(file){
  elFileError.textContent = "";
  elFileMeta.textContent = `Cargando: ${file.name} (${Math.round(file.size/1024)} KB)`;

  if (!file.name.toLowerCase().endsWith(".xlsx")){
    elFileError.textContent = "Solo se admite .xlsx";
    return;
  }

  try{
    const rows = await parseXlsx(file);
    uploadedRows = normalizeRows(rows);

    if (!uploadedRows.length){
      elFileError.textContent = "No se encontraron filas válidas en el Excel.";
      return;
    }

    elFileMeta.textContent = `OK: ${file.name} — ${uploadedRows.length} registros`;
    elBtnGenerate.disabled = false;

    renderPreview(uploadedRows, selectedTemplateId);
  }catch(err){
    console.error(err);
    elFileError.textContent = "Error leyendo el Excel. Verifica el formato/columnas.";
  }
}

async function parseXlsx(file){
  const data = await file.arrayBuffer();
  const wb = XLSX.read(data, { type: "array" });
  const sheetName = wb.SheetNames[0];
  const ws = wb.Sheets[sheetName];
  const json = XLSX.utils.sheet_to_json(ws, { defval: "" }); // array de objetos
  return json;
}

function normalizeRows(rows){
  // Validar headers (si la primera fila no tiene esos nombres, retorna igual pero avisamos)
  // Convertimos "Código QR" -> QR_URL
  const norm = [];

  for (const r of rows){
    const DNI = r.dni ?? r.DNI ?? "";
    const NombreCompleto = r.nombre_completo ?? r.NombreCompleto ?? r.Nombre ?? r["Nombre Completo"] ?? "";
    const Cargo = r.cargo ?? r.Cargo ?? "";

    // mínimas validaciones
    if (!DNI || !NombreCompleto || !Cargo) continue;

    const cleanedDni = String(DNI).trim();
    norm.push({
      DNI: cleanedDni,
      NombreCompleto: String(NombreCompleto).trim(),
      Cargo: String(Cargo).trim(),
      QR_URL: `https://quickchart.io/qr?text=${encodeURIComponent(cleanedDni)}`,
      Zona: r.Zona ?? r.zona ?? "",
    });
  }

  return norm;
}

function initTemplatesUI(){
  elTplCount.textContent = `${window.TEMPLATES.length} plantillas disponibles. Puedes subir tus archivos CSS con modelos de carnet para sobreescribir estos diseños.`;
  elTplGrid.innerHTML = window.TEMPLATES.map(t => templateCard(t)).join("");

  // seleccionar default
  selectTemplate(selectedTemplateId);

  // eventos
  elTplGrid.querySelectorAll(".tpl").forEach(card => {
    card.addEventListener("click", () => {
      const id = card.getAttribute("data-id");
      selectTemplate(id);
      if (uploadedRows.length) renderPreview(uploadedRows, selectedTemplateId);
    });
  });
}

function templateCard(t){
  return `
    <div class="tpl" data-id="${t.id}">
      <div class="tpl-thumb"></div>
      <div class="tpl-name">${t.name}</div>
      <div class="tpl-desc">${t.desc}</div>
    </div>`;
}

function selectTemplate(id){
  selectedTemplateId = id;
  document.querySelectorAll(".tpl").forEach(el => el.classList.remove("selected"));
  document.querySelector(`.tpl[data-id="${id}"]`)?.classList.add("selected");
}

function renderPreview(rows, templateId){
  const tpl = window.TEMPLATES.find(t => t.id === templateId);
  if (!tpl) return;

  // mostrar solo 6 en preview
  const sample = rows.slice(0, 6);
  elPreviewMeta.textContent = `Mostrando ${sample.length} de ${rows.length} — Template: ${tpl.name}`;

  elPreviewArea.innerHTML = sample.map(r => tpl.render(r)).join("");
}

function buildPrintPages(rows, templateId){
  const tpl = window.TEMPLATES.find(t => t.id === templateId);
  if (!tpl) return;

  // 2 columnas por hoja A4 (ver print.css)
  const perPage = 8; // 2 cols x 4 filas (aprox). Ajusta si quieres.
  const pages = chunk(rows, perPage);

  printRoot.innerHTML = pages.map(pageRows => {
    const cards = pageRows.map(r => tpl.render(r)).join("");
    return `<div class="print-page">${cards}</div>`;
  }).join("");
}

function chunk(arr, size){
  const out = [];
  for (let i=0;i<arr.length;i+=size) out.push(arr.slice(i,i+size));
  return out;
}
