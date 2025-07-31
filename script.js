// Datos de las asignaturas
const materias = [
  {
    id: "biocel", nombre: "Biología Celular y Molecular", cr: 4, sem: 1, req: []
  },
  { id: "quimica", nombre: "Química Integrada", cr: 3, sem: 1, req: [] },
  { id: "mate", nombre: "Matemática", cr: 3, sem: 1, req: [] },
  { id: "introvet", nombre: "Introducción a la MVZ", cr: 2, sem: 1, req: [] },
  { id: "serlasa", nombre: "Ser Lasallista", cr: 2, sem: 1, req: [] },
  { id: "lectoescritura", nombre: "Téc. de Lectura y Escritura", cr: 2, sem: 1, req: [] },

  { id: "ecologia", nombre: "Ecología", cr: 3, sem: 2, req: [] },
  { id: "formhum1", nombre: "Formación Humana (E)", cr: 2, sem: 2, req: [] },
  { id: "bioq", nombre: "Bioquímica Aplicada", cr: 3, sem: 2, req: ["quimica"] },
  { id: "histologia", nombre: "Histología y Embriología", cr: 3, sem: 2, req: ["biocel"] },
  { id: "anatomia1", nombre: "Anatomía I", cr: 3, sem: 2, req: ["biocel"] },
  { id: "bioestadistica", nombre: "Bioestadística", cr: 3, sem: 2, req: ["mate"] },

  { id: "inmuno", nombre: "Inmunología", cr: 3, sem: 3, req: ["biocel", "bioq"] },
  { id: "micro", nombre: "Microbiología", cr: 4, sem: 3, req: ["biocel", "bioq"] },
  { id: "anatomia2", nombre: "Anatomía II", cr: 3, sem: 3, req: ["anatomia1"] },
  { id: "metodologia", nombre: "Metodología Investigación", cr: 2, sem: 3, req: ["bioestadistica"] },
  { id: "formhum2", nombre: "Formación Humana (E)", cr: 2, sem: 3, req: [] },
  { id: "biofisica", nombre: "Biofísica", cr: 2, sem: 3, req: ["biocel"] },

  { id: "fisio1", nombre: "Fisiología I", cr: 3, sem: 4, req: ["biofisica", "anatomia2"] },
  { id: "admin", nombre: "Principios de Administración", cr: 2, sem: 4, req: [] },
  { id: "genetica", nombre: "Genética Animal", cr: 3, sem: 4, req: ["biocel", "bioestadistica"] },
  { id: "parasitologia", nombre: "Parasitología", cr: 4, sem: 4, req: ["histologia", "anatomia2"] },
  { id: "disenoexp", nombre: "Diseño de Experimentos", cr: 3, sem: 4, req: ["metodologia"] },
  { id: "extension", nombre: "Extensión Rural", cr: 2, sem: 4, req: [] },

  { id: "fisio2", nombre: "Fisiología II", cr: 3, sem: 5, req: ["fisio1"] },
  { id: "nutricion", nombre: "Nutrición Animal", cr: 3, sem: 5, req: ["bioq"] },
  { id: "epidemio", nombre: "Epidemiología", cr: 3, sem: 5, req: ["disenoexp"] },
  { id: "patologia1", nombre: "Patología I", cr: 3, sem: 5, req: ["histologia"] },
  { id: "electiva1", nombre: "Electiva Profesional", cr: 2, sem: 5, req: [] },
  { id: "etologia", nombre: "Etología y Bienestar Animal", cr: 2, sem: 5, req: [] },

  { id: "semiologia", nombre: "Semiología Veterinaria", cr: 4, sem: 6, req: ["fisio2", "patologia1"] },
  { id: "reproduccion", nombre: "Fisiología Reproductiva", cr: 2, sem: 6, req: ["fisio2"] },
  { id: "patologia2", nombre: "Patología II", cr: 3, sem: 6, req: ["patologia1"] },
  { id: "farmacologia", nombre: "Farmacología", cr: 3, sem: 6, req: ["fisio2"] },
  { id: "electiva2", nombre: "Electiva Profesional", cr: 2, sem: 6, req: [] },
  { id: "inocuidad", nombre: "Seguridad e Inocuidad", cr: 3, sem: 6, req: ["epidemio"] },

  // Puedes seguir desde semestre 7 en adelante si lo deseas
];

// Agrupar materias por semestre
function agruparMaterias() {
  const container = document.querySelector(".malla");
  const totalSemestres = Math.max(...materias.map(m => m.sem));

  for (let i = 1; i <= totalSemestres; i++) {
    const semBox = document.createElement("div");
    semBox.className = "semestre";
    semBox.innerHTML = `<h2>Semestre ${i}</h2>`;

    const materiasSem = materias.filter(m => m.sem === i);
    for (const m of materiasSem) {
      const div = document.createElement("div");
      div.className = "materia";
      div.dataset.id = m.id;

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.className = "check";

      const label = document.createElement("label");
      label.innerText = `${m.nombre} (${m.cr} cr)`;

      div.appendChild(checkbox);
      div.appendChild(label);
      semBox.appendChild(div);
    }

    container.appendChild(semBox);
  }
}

// Bloquear materias con requisitos al inicio
function bloquear() {
  materias.forEach(m => {
    if (m.req.length > 0) {
      const nodo = document.querySelector(`[data-id="${m.id}"]`);
      if (nodo) {
        nodo.classList.add("locked");
        nodo.querySelector("input").disabled = true;
      }
    }
  });
}

// Actualizar materias desbloqueadas
function actualizarDisponibilidad() {
  materias.forEach(m => {
    const nodo = document.querySelector(`[data-id="${m.id}"]`);
    if (!nodo) return;

    const requisitosCumplidos = m.req.every(idReq => {
      const req = document.querySelector(`[data-id="${idReq}"] input`);
      return req?.checked;
    });

    if (requisitosCumplidos) {
      nodo.classList.remove("locked");
      nodo.querySelector("input").disabled = false;
    } else {
      if (m.req.length > 0) {
        nodo.classList.add("locked");
        nodo.querySelector("input").disabled = true;
        nodo.querySelector("input").checked = false;
      }
    }
  });
}

window.onload = () => {
  agruparMaterias();
  bloquear();
  document.querySelectorAll(".check").forEach(c => {
    c.addEventListener("change", actualizarDisponibilidad);
  });
};
