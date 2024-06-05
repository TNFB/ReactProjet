import React, { useState } from 'react';
import Banner from '../components/Banner'
import Footer from '../components/Footer'
function Suivi() {

    const [idCommande, setidCommande] = useState(0);
    const [errorMessage, setErrorMessage] = useState(''); // Stocke les messages d'erreur à afficher.
    const [data, setData] = useState([]); // Stocke les données à afficher.

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = `http://localhost:3002/suivi/${idCommande}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ idCommande, userId: localStorage.getItem('userId') })
            });
            if (!response.ok) {// Si la réponse n'est pas OK, gérer l'erreur
                const errorMessage = await response.text();
                setErrorMessage(errorMessage);
                throw new Error(errorMessage);
            }
            setData(await response.json()); // on récupère les données du json si ok 
            setErrorMessage(''); // On réinitialise le message d'erreur
        } catch (error) {
            console.error('Erreur lors de la récupération :', error);
            setErrorMessage('Aucune commande trouvée / Mauvais utilisateur'); // Affiche message erreur à utilisateur
        }
    };

    return (
        <div>
            <Banner />
            <h2>Suivi de commande</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Numéro de commande" value={idCommande} onChange={(e) => setidCommande(e.target.value)} />
                <button type="submit">Suivre</button>
            </form>

            <h2>Informations</h2>
            <p>Commande n°{idCommande}</p>
            {!errorMessage && <p>Etat : {data.etat}</p>}
            <Footer />
        </div>
    );
}

export default Suivi;