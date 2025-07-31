const materias = [
  { id: "biocel", nombre: "Biología Celular y Molecular", cr: 4, sem: 1, req: [] },
  { id: "quimica", nombre: "Química Integrada", cr: 3, sem: 1, req: [] },
  { id: "mate", nombre: "Matemática", cr: 3, sem: 1, req: [] },
  { id: "introvet", nombre: "Introducción a la MVZ", cr: 2, sem: 1, req: [] },
  { id: "serlasa", nombre: "Ser Lasallista", cr: 2, sem: 1, req: [] },
  { id: "lectoescritura", nombre: "Téc. Lectura y Escritura", cr: 2, sem: 1, req: [] },

  { id: "formhum1", nombre: "Formación Humana (E)", cr: 2, sem: 2, req: [] },
  { id: "ecologia", nombre: "Ecología", cr: 3, sem: 2, req: [] },
  { id: "bioq", nombre: "Bioquímica Aplicada", cr: 3, sem: 2, req: ["quimica"] },
  { id: "histologia", nombre: "Histología y Embriología", cr: 3, sem: 2, req: ["biocel"] },
  { id: "anatomia1", nombre: "Anatomía I", cr: 3, sem: 2, req: ["biocel"] },
  { id: "bioestadistica", nombre: "Bioestadística", cr: 3, sem: 2, req: ["mate"] },

  { id: "inmuno", nombre: "Inmunología", cr: 3, sem: 3, req: ["biocel", "bioq"] },
  { id: "micro", nombre: "Microbiología", cr: 4, sem: 3, req: ["biocel", "bioq"] },
  { id: "anatomia2", nombre: "Anatomía II", cr: 3, sem: 3, req: ["anatomia1"] },
  { id: "metodologia", nombre: "Metodología Inv.", cr: 2, sem: 3, req: ["bioestadistica"] },
  { id: "formhum2", nombre: "Formación Humana (E)", cr: 2, sem: 3, req: [] },
  { id: "biofisica", nombre: "Biofísica", cr: 2, sem: 3, req: ["biocel"] },

  { id: "fisio1", nombre: "Fisiología I", cr: 3, sem: 4, req: ["biofisica", "anatomia2"] },
  { id: "admin", nombre: "Adm. Veterinaria", cr: 2, sem: 4, req: [] },
  { id: "genetica", nombre: "Genética Animal", cr: 3, sem: 4, req: ["biocel", "bioestadistica"] },
  { id: "parasitologia", nombre: "Parasitología", cr: 4, sem: 4, req: ["histologia", "anatomia2"] },
  { id: "disenoexp", nombre: "Diseño de Experimentos", cr: 3, sem: 4, req: ["metodologia"] },
  { id: "extension", nombre: "Extensión Rural", cr: 2, sem: 4, req: [] },

  { id: "fisio2", nombre: "Fisiología II", cr: 3, sem: 5, req: ["fisio1"] },
  { id: "nutricion", nombre: "Nutrición Animal", cr: 3, sem: 5, req: ["bioq"] },
  { id: "epidemio", nombre: "Epidemiología", cr: 3, sem: 5, req: ["disenoexp"] },
  { id: "patologia1", nombre: "Patología I", cr: 3, sem: 5, req: ["histologia"] },
  { id: "electiva1", nombre: "Electiva Profesional", cr: 2, sem: 5, req: [] },
  { id: "etologia", nombre: "Etología Animal", cr: 2, sem: 5, req: [] },

  { id: "semiologia", nombre: "Semiología Veterinaria", cr: 4, sem: 6, req: ["fisio2", "patologia1"] },
  { id: "repro", nombre: "Fisiología Reprod.", cr: 2, sem: 6, req: ["fisio2"] },
  { id: "patologia2", nombre: "Patología II", cr: 3, sem: 6, req: ["patologia1"] },
  { id: "farmaco", nombre: "Farmacología", cr: 3, sem: 6, req: ["fisio2"] },
  { id: "electiva2", nombre: "Electiva Profesional", cr: 2, sem: 6, req: [] },
  { id: "inocuidad", nombre: "Seguridad Alimentaria", cr: 3, sem: 6, req: ["epidemio"] },

  { id: "trabajo", nombre: "Trabajo de Grado", cr: 16, sem: 10, req: [] }
];

const totalCreditos = materias.reduce((acc, m) => acc + m.cr, 0);

function renderMalla() {
  const contenedor = document.getElementById("malla-curricular");
  const porSemestre = [...new Set(materias.map(m => m.sem))];

  porSemestre.forEach(sem => {
    const semDiv = document.createElement("div");
    semDiv.className = "semestre";
    semDiv.innerHTML = `<h3>Semestre ${sem}</h3>`;

    materias
      .filter(m => m.sem === sem)
      .forEach(m => {
        const div = document.createElement("div");
        div.className = "materia";
        div.dataset.id = m.id;
        div.innerHTML = `
          <span>${m.nombre}</span>
          <span class="creditos">${m.cr}</span>
        `;
        div.addEventListener("click", () => toggleMateria(m.id));
        semDiv.appendChild(div);
      });

    contenedor.appendChild(semDiv);
  });

  actualizarEstado();
}

function toggleMateria(id) {
  const materia = document.querySelector(`[data-id="${id}"]`);
  if (materia.classList.contains("bloqueada")) return;

  materia.classList.toggle("activa");
  guardarProgreso();
  actualizarEstado();
}

function actualizarEstado() {
  const aprobadas = getAprobadas();
  const idsAprobadas = aprobadas.map(m => m.id);

  materias.forEach(m => {
    const el = document.querySelector(`[data-id="${m.id}"]`);
    if (!el) return;

    const desbloqueada = m.req.every(r => idsAprobadas.includes(r));
    el.classList.remove("bloqueada");
    if (!desbloqueada) el.classList.add("bloqueada");

    if (idsAprobadas.includes(m.id)) {
      el.classList.add("activa");
    } else {
      el.classList.remove("activa");
    }
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

window.onload = renderMalla;
