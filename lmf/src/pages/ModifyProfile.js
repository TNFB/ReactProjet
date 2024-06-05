import React, { useState } from 'react';
import Banner from '../components/Banner'
import Footer from '../components/Footer'
function ModifyProfile() {
    // vous pouvez récupérer l'ID de l'utilisateur à partir du stockage local
    const userId = localStorage.getItem('userId');
    // Récupérer l'adresse e-mail de l'utilisateur à partir du stockage local
    const userEmail = localStorage.getItem('userEmail');
    // Fonction pour afficher le role de l'utilisateur
    const role = localStorage.getItem('role');
    const nom = localStorage.getItem('nom');
    const prenom = localStorage.getItem('prenom');
    const adresse = localStorage.getItem('adresse');

    if (!(role === "user" || role === "admin")) {
        window.location.href = '/login';
    }

    const [modify_email, setEmail] = useState(userEmail); // Etat qui Stocke l'email de l'utilisateur
    const [modify_password, setPassword] = useState("azerty"); // Etat qui Stocke le mot de passe de l'utilisateur.
    const [modify_nom, setNom] = useState(nom); // Etat qui Stocke le nom de l'utilisateur
    const [modify_prenom, setPrenom] = useState(prenom); // Etat qui Stocke le prénom de l'utilisateur
    const [modify_adresse, setAdresse] = useState(adresse); // Etat qui Stocke l'adresse de l'utilisateur
    const [errorMessage, setErrorMessage] = useState(''); // Stocke les messages d'erreur à afficher.
    const handleSubmit = async (e) => { 
        e.preventDefault();
        try {
            const url =`http://localhost:3002/modifyProfile/${userId}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ modify_email, modify_password, modify_nom, modify_prenom, modify_adresse})
            });
            if (!response.ok) {// Si la réponse n'est pas OK, gérer l'erreur
                const errorMessage = await response.text();
                setErrorMessage(errorMessage);
                throw new Error(errorMessage);
            }
            const data = await response.json(); // on récupère les données du json si ok 
            console.log(data);
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            localStorage.removeItem('userEmail');
            localStorage.removeItem('role');
            localStorage.removeItem('nom');
            localStorage.removeItem('prenom');
            localStorage.removeItem('adresse');
            window.location.href = '/';
        } catch (error) {
            console.error('Erreur lors de la modification :', error);
            setErrorMessage('Erreur'); // Affiche message erreur à utilisateur
        }
    };

    return (
        <div>
            <Banner />
            <h2>Profil Utilisateur</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={modify_email} onChange={(e) => setEmail(e.target.value)}
                />
                <input type="password" placeholder="Mot de passe" value={modify_password} onChange={(e) =>
                    setPassword(e.target.value)} />
                <input type="text" placeholder="Nom" value={modify_nom} onChange={(e) => setNom(e.target.value)}
                />
                <input type="text" placeholder="Prénom" value={modify_prenom} onChange={(e) => setPrenom(e.target.value)}
                />
                <input type="text" placeholder="Adresse" value={modify_adresse} onChange={(e) => setAdresse(e.target.value)}
                />
                <button type="submit">Modifier</button>
            </form>
            <Footer />
        </div>
    );
}
export default ModifyProfile;