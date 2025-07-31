// =====================
// 📌 DEFINICIÓN DE MATERIAS (10 SEMESTRES)
// =====================

const materias = [
  // SEMESTRE 1
  { id: "biocel", nombre: "Biología Celular y Molecular", cr: 4, sem: 1, req: [] },
  { id: "quimica", nombre: "Química Integrada", cr: 3, sem: 1, req: [] },
  { id: "mate", nombre: "Matemática", cr: 3, sem: 1, req: [] },
  { id: "introvet", nombre: "Introducción a la MVZ", cr: 2, sem: 1, req: [] },
  { id: "serlasa", nombre: "Ser Lasallista", cr: 2, sem: 1, req: [] },
  { id: "lectoescritura", nombre: "Téc. Lectura y Escritura", cr: 2, sem: 1, req: [] },

  // SEMESTRE 2
  { id: "formhum1", nombre: "Formación Humana (E)", cr: 2, sem: 2, req: [] },
  { id: "ecologia", nombre: "Ecología", cr: 3, sem: 2, req: [] },
  { id: "bioq", nombre: "Bioquímica Aplicada", cr: 3, sem: 2, req: ["quimica"] },
  { id: "histologia", nombre: "Histología y Embriología", cr: 3, sem: 2, req: ["biocel"] },
  { id: "anatomia1", nombre: "Anatomía I", cr: 3, sem: 2, req: ["biocel"] },
  { id: "bioestadistica", nombre: "Bioestadística", cr: 3, sem: 2, req: ["mate"] },

  // SEMESTRE 3
  { id: "inmuno", nombre: "Inmunología", cr: 3, sem: 3, req: ["biocel", "bioq"] },
  { id: "micro", nombre: "Microbiología", cr: 4, sem: 3, req: ["biocel", "bioq"] },
  { id: "anatomia2", nombre: "Anatomía II", cr: 3, sem: 3, req: ["anatomia1"] },
  { id: "metodologia", nombre: "Metodología Inv.", cr: 2, sem: 3, req: ["bioestadistica"] },
  { id: "formhum2", nombre: "Formación Humana (E)", cr: 2, sem: 3, req: [] },
  { id: "biofisica", nombre: "Biofísica", cr: 2, sem: 3, req: ["biocel"] },

  // SEMESTRE 4
  { id: "fisio1", nombre: "Fisiología I", cr: 3, sem: 4, req: ["biofisica", "anatomia2"] },
  { id: "admin", nombre: "Principios de Administración", cr: 2, sem: 4, req: [] },
  { id: "genetica", nombre: "Genética Animal", cr: 3, sem: 4, req: ["biocel", "bioestadistica"] },
  { id: "parasitologia", nombre: "Parasitología", cr: 4, sem: 4, req: ["histologia", "anatomia2"] },
  { id: "disenoexp", nombre: "Diseño de Experimentos", cr: 3, sem: 4, req: ["metodologia"] },
  { id: "extension", nombre: "Extensión Rural", cr: 2, sem: 4, req: [] },

  // SEMESTRE 5
  { id: "fisio2", nombre: "Fisiología II", cr: 3, sem: 5, req: ["fisio1"] },
  { id: "nutricion", nombre: "Nutrición Animal", cr: 3, sem: 5, req: ["bioq"] },
  { id: "epidemio", nombre: "Epidemiología", cr: 3, sem: 5, req: ["disenoexp"] },
  { id: "patologia1", nombre: "Patología I", cr: 3, sem: 5, req: ["histologia"] },
  { id: "electiva1", nombre: "Electiva Profesional", cr: 2, sem: 5, req: [] },
  { id: "etologia", nombre: "Etología Animal", cr: 2, sem: 5, req: [] },

  // SEMESTRE 6
  { id: "semiologia", nombre: "Semiología Veterinaria", cr: 4, sem: 6, req: ["fisio2", "patologia1"] },
  { id: "repro", nombre: "Fisiología Reprod.", cr: 2, sem: 6, req: ["fisio2"] },
  { id: "patologia2", nombre: "Patología II", cr: 3, sem: 6, req: ["patologia1"] },
  { id: "farmaco", nombre: "Farmacología", cr: 3, sem: 6, req: ["fisio2"] },
  { id: "electiva2", nombre: "Electiva Profesional", cr: 2, sem: 6, req: [] },
  { id: "inocuidad", nombre: "Seguridad Alimentaria", cr: 3, sem: 6, req: ["epidemio"] },

  // SEMESTRE 7
  { id: "reprobiotec", nombre: "Reproducción y Biotec. Animal", cr: 4, sem: 7, req: ["repro", "patologia2"] },
  { id: "saludpub", nombre: "Salud Pública", cr: 3, sem: 7, req: ["inocuidad"] },
  { id: "patoclinica", nombre: "Patología Clínica Vet.", cr: 3, sem: 7, req: ["patologia2"] },
  { id: "imagen", nombre: "Imaginología", cr: 3, sem: 7, req: ["semiologia"] },
  { id: "toxicol", nombre: "Toxicología", cr: 2, sem: 7, req: ["farmaco"] },
  { id: "electiva3", nombre: "Electiva Profesional", cr: 2, sem: 7, req: [] },

  // SEMESTRE 8
  { id: "peq1", nombre: "Clínica Med. Peq. Esp. I", cr: 3, sem: 8, req: ["farmaco", "semiologia", "patoclinica", "imagen"] },
  { id: "rumiantes", nombre: "Clínica Med. Rumiantes", cr: 3, sem: 8, req: ["farmaco", "semiologia", "patoclinica", "imagen"] },
  { id: "equinos1", nombre: "Clínica Med. Equinos I", cr: 3, sem: 8, req: ["farmaco", "semiologia", "patoclinica", "imagen"] },
  { id: "gestion", nombre: "Gestión Contable", cr: 3, sem: 8, req: [] },
  { id: "cirugia1", nombre: "Cirugía I", cr: 3, sem: 8, req: ["farmaco", "semiologia", "patoclinica"] },
  { id: "deonto", nombre: "Deontología y Bioética", cr: 2, sem: 8, req: [] },

  // SEMESTRE 9
  { id: "peq2", nombre: "Clínica Med. Peq. Esp. II", cr: 3, sem: 9, req: ["peq1"] },
  { id: "equinos2", nombre: "Clínica Med. Equinos II", cr: 3, sem: 9, req: ["equinos1"] },
  { id: "porcinos", nombre: "Clínica Med. Porcinos", cr: 3, sem: 9, req: ["farmaco", "semiologia", "patoclinica"] },
  { id: "cirugia2", nombre: "Cirugía II", cr: 3, sem: 9, req: ["cirugia1"] },
  { id: "aviar", nombre: "Medicina Aviar", cr: 2, sem: 9, req: ["farmaco", "semiologia", "epidemio"] },
  { id: "proyectos", nombre: "Formulación Proyectos", cr: 3, sem: 9, req: [] },

  // SEMESTRE 10
  { id: "trabajo", nombre: "Trabajo de Grado", cr: 16, sem: 10, req: [] } // 80% validación especial
];

// =====================
// 🔧 FUNCIONALIDAD INTERACTIVA
// =====================

const totalCreditos = materias.reduce((acc, m) => acc + m.cr, 0);
const resaltadas = new Set();

function renderMalla() {
  const contenedor = document.getElementById("malla-curricular");
  const semestres = [...new Set(materias.map(m => m.sem))];

  semestres.forEach(sem => {
    const semDiv = document.createElement("div");
    semDiv.className = "semestre";
    semDiv.innerHTML = `<h3>Semestre ${sem}</h3>`;

    materias.filter(m => m.sem === sem).forEach(m => {
      const div = document.createElement("div");
      div.className = "materia";
      div.dataset.id = m.id;
      div.innerHTML = `
        <span>${m.nombre}</span>
        <span class="creditos">${m.cr}</span>
      `;

      div.addEventListener("click", () => toggleMateria(m.id));
      div.addEventListener("mouseenter", () => iniciarTooltip(m.id, div));
      div.addEventListener("mouseleave", ocultarTooltip);
      semDiv.appendChild(div);
    });

    contenedor.appendChild(semDiv);
  });

  actualizarEstado();
}

function toggleMateria(id) {
  const el = document.querySelector(`[data-id="${id}"]`);
  if (el.classList.contains("bloqueada")) return;
  el.classList.toggle("activa");
  guardarProgreso();
  actualizarEstado();
}

function actualizarEstado() {
  const aprobadas = getAprobadas();
  const ids = aprobadas.map(m => m.id);

  materias.forEach(m => {
    const el = document.querySelector(`[data-id="${m.id}"]`);
    if (!el) return;

    const desbloqueada = m.req.every(r => ids.includes(r));
    const cumple80 = (getCreditosAprobados() / totalCreditos) >= 0.8;

    el.classList.remove("bloqueada", "resaltada", "desbloqueada-parcial", "desbloqueada-total");

    if (resaltadas.has(m.id)) el.classList.add("resaltada");

    if (m.id === "trabajo") {
      if (!cumple80) {
        el.classList.add("bloqueada");
        el.classList.remove("activa");
        return;
      }
    }

    if (!desbloqueada) el.classList.add("bloqueada");
    el.classList.toggle("activa", ids.includes(m.id));
  });

  actualizarProgreso();
}

function actualizarProgreso() {
  const progreso = getCreditosAprobados();
  const porcentaje = Math.round((progreso / totalCreditos) * 100);
  document.getElementById("progreso-barra").style.width = `${porcentaje}%`;
  document.getElementById("progreso-texto").innerText = `Progreso: ${porcentaje}%`;
}

function guardarProgreso() {
  const activos = [...document.querySelectorAll(".materia.activa")].map(e => e.dataset.id);
  localStorage.setItem("malla-aprobadas", JSON.stringify(activos));
}

function getAprobadas() {
  const datos = JSON.parse(localStorage.getItem("malla-aprobadas")) || [];
  return materias.filter(m => datos.includes(m.id));
}

function getCreditosAprobados() {
  return getAprobadas().reduce((acc, m) => acc + m.cr, 0);
}

// ========== 🧠 TOOLTIP ==========

let tooltipTimer = null;

function iniciarTooltip(id, element) {
  tooltipTimer = setTimeout(() => {
    const tooltip = document.getElementById("tooltip");
    const requisitos = materias.find(m => m.id === id)?.req || [];
    const desbloquea = materias.filter(m => m.req.includes(id));

    const requisitosHtml = requisitos.length
      ? requisitos.map(r => {
          const mat = materias.find(m => m.id === r);
          return `<li>${mat?.nombre || r}</li>`;
        }).join("")
      : "<li>Ninguno</li>";

    const desbloqueaHtml = desbloquea.length
      ? desbloquea.map(m => `<li>${m.nombre}</li>`).join("")
      : "<li>Ninguna</li>";

    tooltip.innerHTML = `
      <div style="display: flex; gap: 20px;">
        <div>
          <strong>Requiere:</strong>
          <ul style="margin: 5px 0; padding-left: 18px;">${requisitosHtml}</ul>
        </div>
        <div>
          <strong>Habilita:</strong>
          <ul style="margin: 5px 0; padding-left: 18px;">${desbloqueaHtml}</ul>
        </div>
      </div>
    `;

    const rect = element.getBoundingClientRect();
    tooltip.style.left = `${rect.left}px`;
    tooltip.style.top = `${rect.bottom + 5}px`;
    tooltip.classList.remove("hidden");
  }, 1500);
}


function ocultarTooltip() {
  clearTimeout(tooltipTimer);
  const tooltip = document.getElementById("tooltip");
  tooltip.classList.add("hidden");
  tooltip.innerHTML = "";
}

window.onload = renderMalla;
