import { backend } from 'declarations/backend';

document.addEventListener('DOMContentLoaded', async () => {
    const addForm = document.getElementById('addTaxPayerForm');
    const searchButton = document.getElementById('searchButton');
    const taxPayerList = document.getElementById('taxPayerList');

    // Add new TaxPayer
    addForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const taxPayer = {
            tid: document.getElementById('tid').value,
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            address: document.getElementById('address').value
        };
        await backend.addTaxPayer(taxPayer);
        addForm.reset();
        await updateTaxPayerList();
    });

    // Search TaxPayer
    searchButton.addEventListener('click', async () => {
        const tid = document.getElementById('searchTid').value;
        const result = await backend.searchTaxPayer(tid);
        const searchResult = document.getElementById('searchResult');
        if (result.length > 0) {
            const tp = result[0];
            searchResult.innerHTML = `
                <p>TID: ${tp.tid}</p>
                <p>Name: ${tp.firstName} ${tp.lastName}</p>
                <p>Address: ${tp.address}</p>
            `;
        } else {
            searchResult.innerHTML = '<p>No TaxPayer found with that TID.</p>';
        }
    });

    // Update TaxPayer list
    async function updateTaxPayerList() {
        const taxPayers = await backend.getAllTaxPayers();
        taxPayerList.innerHTML = '';
        taxPayers.forEach(tp => {
            const li = document.createElement('li');
            li.textContent = `${tp.tid}: ${tp.firstName} ${tp.lastName}`;
            taxPayerList.appendChild(li);
        });
    }

    // Initial load of TaxPayer list
    await updateTaxPayerList();
});
