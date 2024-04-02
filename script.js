document.addEventListener('DOMContentLoaded', function () {
  const expenseForm = document.getElementById('expense-form');
  const expenseList = document.getElementById('expense-list');
  let editIndex = -1; // Track the index of the expense being edited

  // Retrieve expenses from local storage
  let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

  // Display expenses
  function displayExpenses() {
    expenseList.innerHTML = '';
    expenses.forEach(function (expense, index) {
      const li = document.createElement('li');
      li.innerHTML = `
              <div class="flex flex-row">
              <span class="mr-4 py-4 px-4">${expense.description}: $${expense.amount}</span>
              <div class="flex flex-row">
              <button class="btn-edit bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 m-2 rounded" onclick="editExpense(${index})">Edit</button>
              
              <button class="btn-delete bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 m-2 rounded" onclick="deleteExpense(${index})">Delete</button>
              </div>
              </div>
              `;
      expenseList.appendChild(li);
    });
  }

  // Add expense
  expenseForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const description = document.getElementById('expense-description').value;
    const amount = parseFloat(document.getElementById('expense-amount').value);

    if (description.trim() !== '' && !isNaN(amount) && amount > 0) {
      const expense = {
        description: description,
        amount: amount
      };

      if (editIndex !== -1) {
        // Replace the existing expense when editing
        expenses[editIndex] = expense;
        editIndex = -1; // Reset edit index
      } else {
        expenses.push(expense);
      }

      localStorage.setItem('expenses', JSON.stringify(expenses));
      displayExpenses();
      expenseForm.reset();
    } else {
      alert('Please enter a valid description and amount.');
    }
  });

  // Edit expense
  window.editExpense = function (index) {
    const expense = expenses[index];
    document.getElementById('expense-description').value = expense.description;
    document.getElementById('expense-amount').value = expense.amount;
    editIndex = index; // Set edit index to the index of the expense being edited
  };

  // Delete expense
  window.deleteExpense = function (index) {
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    displayExpenses();
  };

  // Initial display of expenses
  displayExpenses();
});
