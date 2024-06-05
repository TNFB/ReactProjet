import React from 'react';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import '../styles/Admin.css';

function Admin() {
    // Retrieve user details from local storage
    const userId = localStorage.getItem('userId');
    const userEmail = localStorage.getItem('userEmail');
    const role = localStorage.getItem('role');
    const nom = localStorage.getItem('nom');
    const prenom = localStorage.getItem('prenom');
    const adresse = localStorage.getItem('adresse');

    // Redirect logic based on user role
    if (role === "user") {
        window.location.href = '/profile';
    } else if (role !== "user" && role !== "admin") {
        window.location.href = '/login';
    }

    // Logout function
    const handleLogout = () => {
        // Remove user details from local storage
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('role');
        localStorage.removeItem('nom');
        localStorage.removeItem('prenom');
        localStorage.removeItem('adresse');
        // Redirect to login page
        window.location.href = '/login';
    };

    return (
        <div className="admin-container">
            <Banner />
            <h2 className="admin-title">Profil Administrateur</h2>
            <p className="admin-info">ID de l'administrateur : {userId}</p>
            <p className="admin-info">Email de l'administrateur : {userEmail}</p>
            <p className="admin-info">Rôle de l'administrateur : {role}</p>
            <p className="admin-info">Nom : {nom}</p>
            <p className="admin-info">Prénom : {prenom}</p>
            <p className="admin-info">Adresse : {adresse}</p>
            <button className="logout-button" onClick={handleLogout}>Déconnexion</button>
            <Footer />
        </div>
    );
}

export default Admin;
