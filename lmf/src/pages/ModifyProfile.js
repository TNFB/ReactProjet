import React, { useState } from 'react';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import '../styles/ModifyProfile.css';

function ModifyProfile() {
    // Retrieve user information from local storage
    const userId = localStorage.getItem('userId');
    const userEmail = localStorage.getItem('userEmail');
    const role = localStorage.getItem('role');
    const nom = localStorage.getItem('nom');
    const prenom = localStorage.getItem('prenom');
    const adresse = localStorage.getItem('adresse');

    if (!(role === "user" || role === "admin")) {
        window.location.href = '/login';
    }

    const [modify_email, setEmail] = useState(userEmail);
    const [modify_password, setPassword] = useState("azerty");
    const [modify_nom, setNom] = useState(nom);
    const [modify_prenom, setPrenom] = useState(prenom);
    const [modify_adresse, setAdresse] = useState(adresse);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = `http://localhost:3002/modifyProfile/${userId}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ modify_email, modify_password, modify_nom, modify_prenom, modify_adresse })
            });
            if (!response.ok) {
                const errorMessage = await response.text();
                setErrorMessage(errorMessage);
                throw new Error(errorMessage);
            }
            const data = await response.json();
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
            setErrorMessage('Erreur');
        }
    };

    return (
        <div className="modify-profile-container">
            <Banner />
            <h2 className="modify-profile-title">Profil Utilisateur</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <form className="modify-profile-form" onSubmit={handleSubmit}>
                <input
                    className="modify-profile-input"
                    type="email"
                    placeholder="Email"
                    value={modify_email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="modify-profile-input"
                    type="password"
                    placeholder="Mot de passe"
                    value={modify_password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    className="modify-profile-input"
                    type="text"
                    placeholder="Nom"
                    value={modify_nom}
                    onChange={(e) => setNom(e.target.value)}
                />
                <input
                    className="modify-profile-input"
                    type="text"
                    placeholder="Prénom"
                    value={modify_prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                />
                <input
                    className="modify-profile-input"
                    type="text"
                    placeholder="Adresse"
                    value={modify_adresse}
                    onChange={(e) => setAdresse(e.target.value)}
                />
                <button className="modify-profile-button" type="submit">Modifier</button>
            </form>
            <Footer />
        </div>
    );
}

export default ModifyProfile;
