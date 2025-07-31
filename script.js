:root {
  --color1: #355070;
  --color2: #6d597a;
  --color3: #b56576;
  --color4: #e56b6f;
  --color5: #eaac8b;
  --colorTexto: #fff;
}

body {
  font-family: 'Segoe UI', sans-serif;
  background-color: #f9f4f2;
  margin: 0;
  padding: 0;
  color: var(--color1);
}

header {
  text-align: center;
  padding: 20px;
}

h1 {
  font-size: 2.2em;
  margin-bottom: 0;
  color: var(--color1);
}

h2 {
  font-size: 1em;
  margin-top: 5px;
  color: var(--color2);
  font-weight: normal;
}

.malla {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  padding: 20px;
}

.semestre {
  background-color: var(--color5);
  border-left: 6px solid var(--color1);
  border-radius: 10px;
  padding: 10px 15px;
  width: 280px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
}

.semestre h3 {
  text-align: center;
  color: var(--color1);
  margin-bottom: 10px;
}

.materia {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color2);
  color: var(--colorTexto);
  margin: 6px 0;
  padding: 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s, opacity 0.3s;
}

.materia:hover {
  transform: scale(1.01);
  opacity: 0.95;
}

.materia.activa {
  background-color: var(--color3);
}

.materia.bloqueada {
  background-color: #ddd;
  color: #999;
  cursor: not-allowed;
}

.materia .creditos {
  font-weight: bold;
  color: var(--colorTexto);
}

footer {
  padding: 20px;
  text-align: center;
}

.progress-container {
  max-width: 500px;
  margin: 0 auto;
}

.progress-bar {
  background-color: #ddd;
  border-radius: 20px;
  height: 20px;
  overflow: hidden;
  margin-top: 5px;
}

#progreso-barra {
  height: 100%;
  width: 0%;
  background-color: var(--color4);
  transition: width 0.3s ease;
  border-radius: 20px;
}
