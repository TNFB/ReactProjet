import React, { useState } from 'react';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import '../styles/Suivi.css';

function Suivi() {
    const [idCommande, setidCommande] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [data, setData] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = `http://localhost:3001/suivi/${idCommande}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ idCommande, userId: localStorage.getItem('userId') })
            });
            if (!response.ok) {
                const errorMessage = await response.text();
                setErrorMessage(errorMessage);
                throw new Error(errorMessage);
            }
            setData(await response.json());
            setErrorMessage('');
        } catch (error) {
            console.error('Erreur lors de la récupération :', error);
            setErrorMessage('Aucune commande trouvée / Mauvais utilisateur');
        }
    };

    return (
        <div className="suivi-container">
            <Banner />
            <h2 className="suivi-title">Suivi de commande</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <form className="suivi-form" onSubmit={handleSubmit}>
                <input
                    className="suivi-input"
                    type="text"
                    placeholder="Numéro de commande"
                    value={idCommande}
                    onChange={(e) => setidCommande(e.target.value)}
                />
                <button className="suivi-button" type="submit">Suivre</button>
            </form>
            <h2 className="suivi-info-title">Informations</h2>
            <p className="suivi-info">Commande n°{idCommande}</p>
            {!errorMessage && <p className="suivi-info">Etat : {data.etat}</p>}
            <Footer />
        </div>
    );
}

export default Suivi;
