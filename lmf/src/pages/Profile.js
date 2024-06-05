import React from 'react';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import '../styles/Profile.css';

function Profile() {
    const userId = localStorage.getItem('userId');
    const userEmail = localStorage.getItem('userEmail');
    const role = localStorage.getItem('role');
    const nom = localStorage.getItem('nom');
    const prenom = localStorage.getItem('prenom');
    const adresse = localStorage.getItem('adresse');

    if (role === "admin") {
        window.location.href = '/admin';
    } else if (role !== "user") {
        window.location.href = '/login';
    }

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('role');
        localStorage.removeItem('nom');
        localStorage.removeItem('prenom');
        localStorage.removeItem('adresse');
        window.location.href = '/login';
    };

    const handleModifyProfile = () => {
        window.location.href = '/modifyProfile';
    };

    return (
        <div className="profile-container">
            <Banner />
            <h2 className="profile-title">Profil Utilisateur</h2>
            <p className="profile-info">ID de l'utilisateur : {userId}</p>
            <p className="profile-info">Email de l'utilisateur : {userEmail}</p>
            <p className="profile-info">Rôle de l'utilisateur : {role}</p>
            <p className="profile-info">Nom : {nom}</p>
            <p className="profile-info">Prénom : {prenom}</p>
            <p className="profile-info">Adresse : {adresse}</p>
            <button className="profile-button" onClick={handleLogout}>Déconnexion</button>
            <button className="profile-button" onClick={handleModifyProfile}>Modifier mon profil</button>
            <a className="profile-support" href="mailto:support@lmf.fr">Besoin d'aide ?</a>
            <Footer />
        </div>
    );
}

export default Profile;
