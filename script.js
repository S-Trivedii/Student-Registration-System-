// Form
const form = document.getElementById("studentForm");

// Inputs
let studentName = document.getElementById("studentName");
let studentId = document.getElementById("studentID");
let studentEmail = document.getElementById("email");
let studentContact = document.getElementById("contactNo");

// Button
const regBtn = document.querySelector("button");

// Table
const tBody = document.getElementById("studentTableBody");

let editRow = null;

function addInfoToTable(e) {
  e.preventDefault();

  updateTable(editRow);
}

// Update Table using row
function updateTable(editRow) {
  // Input
  const name = studentName.value.trim();
  const id = studentId.value.trim();
  const email = studentEmail.value.trim();
  const contact = studentContact.value.trim();

  // creating a tr & inserting at tbody
  const newRow = tBody.insertRow();

  if (editRow) {
    editRow.cells[0].innerText = name;
    editRow.cells[1].innerText = id;
    editRow.cells[2].innerText = email;
    editRow.cells[3].innerText = contact;

    editRow = null;
    storeData(tBody);
    clearForm();
  } else {
    // create td, put data in td and push it inside newrow
    if (name && id && email && contact) {
      newRow.innerHTML = `
        <td>${name}</td>
        <td>${id}</td>
        <td>${email}</td>
        <td>${contact}</td>
        <td>
            <button onclick="editStudent(this)">Edit</button>
            <button onclick="deleteStudent(this)">Delete</button>
        </td>
    `;

      storeData(tBody);
      clearForm();
    } else {
      alert("Please fill empty fields");
    }
  }
}

// Function for editing
function editStudent(btn) {
  // find row which you want to edit
  let editingRow = btn.parentNode.parentNode;

  // Set the input fields to the values of the selected row
  studentName.value = editingRow.cells[0].innerText;
  studentId.value = editingRow.cells[1].innerText;
  studentEmail.value = editingRow.cells[2].innerText;
  studentContact.value = editingRow.cells[3].innerText;

  // Set the editRow to the current editingRow
  editRow = editingRow;
}

// Function for deleting
function deleteStudent(btn) {
  // find row which you want to delete
  let deletingRow = btn.parentNode.parentNode;
  deletingRow.remove();
  storeData(tBody);
}

// Saving data in local storage
function storeData(tBody) {
  localStorage.setItem("StudentData", tBody.innerHTML);
}

// Display saved data
function displaySavedData() {
  let storedData = localStorage.getItem("StudentData");
  if (storedData) {
    tBody.innerHTML = storedData;
  }
}

// Clear form
function clearForm() {
  form.reset();
  editRow = null; // It resets the editing row when the form is cleared
}

// Display saved data on loading
window.onload = displaySavedData;

// Click event on Registration button
regBtn.addEventListener("click", addInfoToTable);
