document.querySelector('#search-button').addEventListener('click', function() {
    // Récupérer les valeurs des champs de saisie
    const departure = document.getElementById('departure').value;
    const arrival = document.getElementById('arrival').value;
    const date = document.getElementById('date').value;

    console.log(departure, arrival, date);

    fetch(`http://localhost:3000/tickethack/${departure}/${arrival}/${date}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const outputBlock = document.getElementById('right-content');
            document.querySelector(".bybye").style.display = 'none';
            document.querySelector("#train-pic").style.display = 'none';
            outputBlock.innerHTML = ''; // Clear previous results

            if (!data.rows || data.rows.length === 0) {
                outputBlock.innerHTML = '<div class="result-item" class="error-message">Pas de train 😱 ! Aucun résultat trouvé pour les critères de recherche.</div>';
                return;
            }

            for (const value of data.rows) {
                console.log(value);

                // Afficher les valeurs dans le bloc de sortie
                outputBlock.innerHTML += `
                    <div class="result-bloc">
                        <div class="result-item">
                            <span class="result-label">Départ :</span>
                            <span class="result-value">${value.departure}</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">Arrivée :</span>
                            <span class="result-value">${value.arrival}</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">Horaire :</span>
                            <span class="result-value">${value.date.slice(12, 16)}</span>
                        </div>
                        <div class="result-item">
                            <span class="result-label">Prix :</span>
                            <span class="result-value">${value.price}€</span>
                        </div>
                    </div>
                `;
            }
        })
        .catch(error => {
            console.error('Erreur lors de la récupération des données:', error);
            const outputBlock = document.getElementById('right-content');
            outputBlock.innerHTML += '<div class="result-item" class="error-message">Pas de train 😱 !</div>';
        });
});

