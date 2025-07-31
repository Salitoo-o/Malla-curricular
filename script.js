const materias = [
  // Semestres 1 a 6 (los mismos de antes)... [omitidos aquí por espacio]

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
  { id: "trabajo", nombre: "Trabajo de Grado", cr: 16, sem: 10, req: [] } // controlado por % aparte
];

const totalCreditos = materias.reduce((acc, m) => acc + m.cr, 0);

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

    if (m.id === "trabajo") {
      if (!cumple80) {
        el.classList.add("bloqueada");
        el.classList.remove("activa");
        return;
      }
    }

    el.classList.remove("bloqueada");
    if (!desbloqueada) el.classList.add("bloqueada");

    el.classList.toggle("activa", ids.includes(m.id));
  });

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

// TOOLTIP AUTOMÁTICO
let tooltipTimer = null;

function iniciarTooltip(id, element) {
  tooltipTimer = setTimeout(() => {
    const tooltip = document.getElementById("tooltip");
    const desbloquea = materias.filter(m => m.req.includes(id));
    if (desbloquea.length === 0) return;

    tooltip.innerText = "Habilita: " + desbloquea.map(m => m.nombre).join(", ");
    const rect = element.getBoundingClientRect();
    tooltip.style.left = rect.left + "px";
    tooltip.style.top = rect.bottom + 5 + "px";
    tooltip.classList.remove("hidden");
  }, 3000);
}

function ocultarTooltip() {
  clearTimeout(tooltipTimer);
  document.getElementById("tooltip").classList.add("hidden");
}

window.onload = renderMalla;
