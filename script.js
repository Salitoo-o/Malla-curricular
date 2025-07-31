// =====================
// 📌 DEFINICIÓN DE MATERIAS (10 SEMESTRES)
// =====================

const materias = [
  // SEMESTRE 1
  { id: "biol", nombre: "Biología Celular", sem: 1, cr: 3, req: [] },
  { id: "quim", nombre: "Química General", sem: 1, cr: 3, req: [] },
  { id: "zool", nombre: "Zoología", sem: 1, cr: 3, req: [] },
  { id: "anatom", nombre: "Anatomía Veterinaria", sem: 1, cr: 4, req: [] },
  { id: "intro", nombre: "Introducción a la MVZ", sem: 1, cr: 2, req: [] },

  // SEMESTRE 2
  { id: "fisio", nombre: "Fisiología", sem: 2, cr: 4, req: ["anatom"] },
  { id: "bioq", nombre: "Bioquímica", sem: 2, cr: 3, req: ["quim", "biol"] },
  { id: "micro", nombre: "Microbiología", sem: 2, cr: 3, req: ["bioq"] },
  { id: "genet", nombre: "Genética", sem: 2, cr: 3, req: ["biol"] },

  // SEMESTRE 3
  { id: "pat1", nombre: "Patología General", sem: 3, cr: 3, req: ["fisio", "micro"] },
  { id: "farmaco", nombre: "Farmacología", sem: 3, cr: 3, req: ["fisio", "bioq"] },
  { id: "par1", nombre: "Parasitología", sem: 3, cr: 3, req: ["micro"] },
  { id: "nutri", nombre: "Nutrición Animal", sem: 3, cr: 3, req: ["fisio"] },

  // SEMESTRE 4
  { id: "pat2", nombre: "Patología Sistémica", sem: 4, cr: 3, req: ["pat1"] },
  { id: "par2", nombre: "Parasitología Clínica", sem: 4, cr: 3, req: ["par1"] },
  { id: "repro", nombre: "Reproducción Animal", sem: 4, cr: 3, req: ["fisio"] },
  { id: "toxico", nombre: "Toxicología", sem: 4, cr: 3, req: ["farmaco"] },

  // SEMESTRE 5
  { id: "clinica1", nombre: "Clínica Médica de Pequeños", sem: 5, cr: 4, req: ["pat2", "farmaco", "par2"] },
  { id: "clinica2", nombre: "Clínica Quirúrgica", sem: 5, cr: 4, req: ["anatom", "farmaco"] },
  { id: "epidemio", nombre: "Epidemiología", sem: 5, cr: 3, req: ["micro"] },
  { id: "prod1", nombre: "Producción Animal I", sem: 5, cr: 3, req: ["nutri", "repro"] },

  // SEMESTRE 6
  { id: "clinica3", nombre: "Clínica Médica de Grandes", sem: 6, cr: 4, req: ["clinica1", "prod1"] },
  { id: "imagen", nombre: "Imagenología", sem: 6, cr: 3, req: ["clinica1"] },
  { id: "sanidad", nombre: "Sanidad Animal", sem: 6, cr: 3, req: ["epidemio"] },
  { id: "prod2", nombre: "Producción Animal II", sem: 6, cr: 3, req: ["prod1"] },

  // SEMESTRE 7
  { id: "clinica4", nombre: "Clínica Quirúrgica de Grandes", sem: 7, cr: 4, req: ["clinica2", "clinica3"] },
  { id: "labdiag", nombre: "Laboratorio Clínico", sem: 7, cr: 3, req: ["par2", "pat2"] },
  { id: "etologia", nombre: "Etología y Bienestar", sem: 7, cr: 2, req: ["clinica1"] },

  // SEMESTRE 8
  { id: "zoo1", nombre: "Zootecnia I", sem: 8, cr: 3, req: ["prod2"] },
  { id: "inocuidad", nombre: "Inocuidad Alimentaria", sem: 8, cr: 3, req: ["sanidad"] },
  { id: "saludp", nombre: "Salud Pública Veterinaria", sem: 8, cr: 3, req: ["epidemio"] },

  // SEMESTRE 9
  { id: "zoo2", nombre: "Zootecnia II", sem: 9, cr: 3, req: ["zoo1"] },
  { id: "gestion", nombre: "Gestión Empresarial Vet.", sem: 9, cr: 3, req: ["prod2"] },
  { id: "bioetica", nombre: "Bioética", sem: 9, cr: 2, req: ["etologia"] },

  // SEMESTRE 10
  { id: "trabajo", nombre: "Trabajo de Grado", sem: 10, cr: 4, req: [] }
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
      div.addEventListener("dblclick", () => resaltarDependientes(m.id));
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

  actualizarSombreado();
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

// ========== 🔁 DOBLE CLIC ==========

function resaltarDependientes(id) {
  const materia = document.querySelector(`[data-id="${id}"]`);
  if (!materia) return;

  materia.classList.toggle("resaltada");

  if (resaltadas.has(id)) {
    resaltadas.delete(id);
  } else {
    resaltadas.add(id);
  }

  actualizarEstado();
}

// ========== 🟩 SOMBREADO PARCIAL ==========

function actualizarSombreado() {
  const idsResaltadas = Array.from(resaltadas);

  if (idsResaltadas.length === 0) return;

  materias.forEach(m => {
    if (m.req.length === 0) return;

    const interseccion = m.req.filter(req => idsResaltadas.includes(req));
    const fraccion = interseccion.length / m.req.length;

    const el = document.querySelector(`[data-id="${m.id}"]`);
    if (!el || el.classList.contains("activa")) return;

    if (fraccion === 1) {
      el.classList.add("desbloqueada-total");
    } else if (fraccion > 0) {
      el.classList.add("desbloqueada-parcial");
      el.style.background = `linear-gradient(to right, #9be7a0 ${fraccion * 100}%, #e0e0e0 ${fraccion * 100}%)`;
    }
  });
}

// ========== 🧠 TOOLTIP ==========

let tooltipTimer = null;

function iniciarTooltip(id, element) {
  tooltipTimer = setTimeout(() => {
    const tooltip = document.getElementById("tooltip");
    const desbloquea = materias.filter(m => m.req.includes(id));
    if (desbloquea.length === 0) return;

    tooltip.innerHTML = `<strong>Habilita:</strong><ul style="margin: 5px 0; padding-left: 18px;">` +
      desbloquea.map(m => `<li>${m.nombre}</li>`).join("") +
      `</ul>`;

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
