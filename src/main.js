// src/main.js
console.log("main.js cargado ✅");

const SAMPLE_ROWS = [
  { DNI:"44334896", NombreCompleto:"Grover Molina Zuñiga", Cargo:"Gerente General", QR_URL:"https://quickchart.io/qr?text=44334896" },
  { DNI:"75473499", NombreCompleto:"Lizbeth Dina Aguirre Chambi", Cargo:"Asistente Trazabilidad", QR_URL:"https://quickchart.io/qr?text=75473499" },
  { DNI:"80159887", NombreCompleto:"Ignacio Bellido Mamani", Cargo:"Encargado de Trazabilidad", QR_URL:"https://quickchart.io/qr?text=80159887" }
];

function renderCards(rows){
  const out = document.getElementById("out");
  if(!out) {
    alert("No existe #out en index.html");
    return;
  }
  if(typeof window.cardTemplate !== "function"){
    out.innerHTML = "<p style='color:red'>ERROR: cardTemplate no está definido. Revisa que src/template.js esté cargando.</p>";
    return;
  }
  out.innerHTML = rows.map(window.cardTemplate).join("");
}

document.getElementById("btnRender")?.addEventListener("click", () => renderCards(SAMPLE_ROWS));
document.getElementById("btnPrint")?.addEventListener("click", () => window.print());

// Render automático
renderCards(SAMPLE_ROWS);
