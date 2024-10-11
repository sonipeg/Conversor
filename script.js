document.addEventListener('DOMContentLoaded', function() {
    const apiKey = 'aeb18c3ec3722227b201be97'; // Clave de API proporcionada
    const url = `https://v6.exchangerate-api.com/v6/${apiKey}/codes`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud de la API');
            }
            return response.json();
        })
        .then(data => {
            const currencyFrom = document.getElementById('currencyFrom');
            const currencyTo = document.getElementById('currencyTo');

            // Limpiar opciones existentes
            currencyFrom.innerHTML = '';
            currencyTo.innerHTML = '';

            // Agregar opciones de moneda
            data.supported_codes.forEach(([code, name]) => {
                const optionFrom = document.createElement('option');
                optionFrom.value = code;
                optionFrom.textContent = `${name} (${code})`;
                currencyFrom.appendChild(optionFrom);

                const optionTo = document.createElement('option');
                optionTo.value = code;
                optionTo.textContent = `${name} (${code})`;
                currencyTo.appendChild(optionTo);
            });
        })
        .catch(error => {
            console.error('Error:', error);
        });

    document.getElementById('convertButton').addEventListener('click', function() {
        const amount = parseFloat(document.getElementById('amount').value);
        const currencyFrom = document.getElementById('currencyFrom').value;
        const currencyTo = document.getElementById('currencyTo').value;

        if (currencyFrom === currencyTo) {
            document.getElementById('result').value = "Selecciona monedas diferentes";
            return;
        }

        const url = `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${currencyFrom}/${currencyTo}/${amount}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la solicitud de la API');
                }
                return response.json();
            })
            .then(data => {
                const result = data.conversion_result;
                document.getElementById('result').value = result.toFixed(2);
            })
            .catch(error => {
                console.error('Error:', error);
                document.getElementById('result').value = "Error al obtener tasas de cambio.";
            });
    });
});
