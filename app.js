const STORAGE_KEY = "gestion-estudiantes-v1";

const form = document.querySelector("#studentForm");
const studentIdInput = document.querySelector("#studentId");
const nameInput = document.querySelector("#name");
const enrollmentInput = document.querySelector("#enrollment");
const emailInput = document.querySelector("#email");
const careerInput = document.querySelector("#career");
const searchInput = document.querySelector("#searchInput");
const tableBody = document.querySelector("#studentsTable");
const formTitle = document.querySelector("#formTitle");
const submitButton = document.querySelector("#submitButton");
const cancelEditButton = document.querySelector("#cancelEdit");
const formMessage = document.querySelector("#formMessage");

let students = loadStudents();

function loadStudents() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function saveStudents() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
}

function renderStudents(query = "") {
  const normalizedQuery = query.trim().toLocaleLowerCase("es");
  const filtered = students
  .filter((student) =>
    [student.name, student.enrollment, student.email, student.career]
      .some((value) => value.toLocaleLowerCase("es").includes(normalizedQuery))
  )
  .sort((a, b) => a.name.localeCompare(b.name, "es", { sensitivity: "base", numeric: true }));

  tableBody.replaceChildren();

  if (filtered.length === 0) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 5;
    cell.className = "empty-state";
    cell.textContent = students.length === 0
      ? "Todavía no hay estudiantes registrados."
      : "No se encontraron estudiantes con esa búsqueda.";
    row.append(cell);
    tableBody.append(row);
  } else {
    filtered.forEach((student) => {
      const row = document.createElement("tr");
      [student.name, student.enrollment, student.email, student.career].forEach((value) => {
        const cell = document.createElement("td");
        cell.textContent = value;
        row.append(cell);
      });

      const actionsCell = document.createElement("td");
      const actions = document.createElement("div");
      actions.className = "actions";

      const editButton = document.createElement("button");
      editButton.className = "button secondary small";
      editButton.type = "button";
      editButton.textContent = "Editar";
      editButton.addEventListener("click", () => startEdit(student.id));

      const deleteButton = document.createElement("button");
      deleteButton.className = "button danger small";
      deleteButton.type = "button";
      deleteButton.textContent = "Eliminar";
      deleteButton.addEventListener("click", () => deleteStudent(student.id));

      actions.append(editButton, deleteButton);
      actionsCell.append(actions);
      row.append(actionsCell);
      tableBody.append(row);
    });
  }

  document.querySelector("#totalStudents").textContent = students.length;
  document.querySelector("#activeStudents").textContent = students.length;
  document.querySelector("#resultsCount").textContent =
    `${filtered.length} ${filtered.length === 1 ? "resultado" : "resultados"}`;
}

function resetForm() {
  form.reset();
  studentIdInput.value = "";
  formTitle.textContent = "Registrar estudiante";
  submitButton.textContent = "Guardar estudiante";
  cancelEditButton.classList.add("hidden");
  formMessage.textContent = "";
}

function startEdit(id) {
  const student = students.find((item) => item.id === id);
  if (!student) return;

  studentIdInput.value = student.id;
  nameInput.value = student.name;
  enrollmentInput.value = student.enrollment;
  emailInput.value = student.email;
  careerInput.value = student.career;
  formTitle.textContent = "Editar estudiante";
  submitButton.textContent = "Guardar cambios";
  cancelEditButton.classList.remove("hidden");
  formMessage.textContent = "";
  nameInput.focus();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function deleteStudent(id) {
  const student = students.find((item) => item.id === id);
  if (!student) return;
  if (!window.confirm(`¿Deseas eliminar el registro de ${student.name}?`)) return;

  const previousStudents = students;
  students = students.filter((item) => item.id !== id);

  try {
    saveStudents();
  } catch {
    students = previousStudents;
    formMessage.textContent = "No se pudo guardar la eliminación en el navegador. Inténtalo de nuevo.";
    return;
  }

  formMessage.textContent = "";
  renderStudents(searchInput.value);
  if (studentIdInput.value === id) resetForm();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  formMessage.textContent = "";

  const student = {
    id: studentIdInput.value || crypto.randomUUID(),
    name: nameInput.value.trim(),
    enrollment: enrollmentInput.value.trim(),
    email: emailInput.value.trim().toLocaleLowerCase("es"),
    career: careerInput.value.trim()
  };

  if (Object.values(student).some((value) => !value)) {
    formMessage.textContent = "Todos los campos son obligatorios.";
    return;
  }

  const duplicateEnrollment = students.some((item) =>
    item.enrollment.toLocaleLowerCase("es") === student.enrollment.toLocaleLowerCase("es")
    && item.id !== student.id
  );

  if (duplicateEnrollment) {
    formMessage.textContent = "Ya existe un estudiante con esa matrícula.";
    enrollmentInput.focus();
    return;
  }

  const duplicateEmail = students.some((item) =>
    item.email.toLocaleLowerCase("es") === student.email
    && item.id !== student.id
  );

  if (duplicateEmail) {
    formMessage.textContent = "Ya existe un estudiante con ese correo electrónico.";
    emailInput.focus();
    return;
  }
  const editing = students.some((item) => item.id === student.id);
  if (studentIdInput.value && !editing) {
    formMessage.textContent = "El estudiante que intentas editar ya no está disponible. Vuelve a seleccionarlo.";
    resetForm();
    return;
  }

  if (editing) {
    students = students.map((item) => item.id === student.id ? student : item);
  } else {
    students.push(student);
  }

  saveStudents();
  resetForm();
  renderStudents(searchInput.value);
});

searchInput.addEventListener("input", () => renderStudents(searchInput.value));

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && searchInput.value) {
    searchInput.value = "";
    renderStudents();
  }
});

cancelEditButton.addEventListener("click", resetForm);

renderStudents();
