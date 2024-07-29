document.getElementById('product-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const productName = document.getElementById('product-name').value;
    const productAmount = parseFloat(document.getElementById('product-amount').value);
    
    if (!productName || isNaN(productAmount) || productAmount <= 0) {
        alert('Please enter valid product details');
        return;
    }
    
    const tableBody = document.querySelector('#product-table tbody');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${productName}</td>
        <td>$${productAmount.toFixed(2)}</td>
    `;
    tableBody.appendChild(row);
    
    updateTotal(productAmount);
    
    document.getElementById('product-form').reset();
});

function updateTotal(amount) {
    const totalAmountElement = document.getElementById('total-amount');
    const currentTotal = parseFloat(totalAmountElement.textContent);
    const newTotal = currentTotal + amount;
    totalAmountElement.textContent = newTotal.toFixed(2);
}

document.getElementById('generate-pdf').addEventListener('click', function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const productTable = document.getElementById('product-table');
    const rows = productTable.querySelectorAll('tbody tr');
    
    let rowHeight = 20;
    doc.text('Expenses', 10, 10);
    
    rows.forEach((row, index) => {
        const cells = row.querySelectorAll('td');
        const productName = cells[0].textContent;
        const productAmount = cells[1].textContent;

        doc.text(productName, 10, rowHeight + (index * 10));
        doc.text(productAmount, 150, rowHeight + (index * 10));
    });

    const totalAmount = document.getElementById('total-amount').textContent;
    doc.text(`Total: $${totalAmount}`, 10, rowHeight + (rows.length * 10) + 10);

    doc.save('Expenses.pdf');
});
