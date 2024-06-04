import React from 'react';
function Profile() {
    // vous pouvez récupérer l'ID de l'utilisateur à partir du stockage local
    const userId = localStorage.getItem('userId');
    // Récupérer l'adresse e-mail de l'utilisateur à partir du stockage local
    const userEmail = localStorage.getItem('userEmail');
    // Fonction pour afficher le role de l'utilisateur
    const role = localStorage.getItem('role');
    const nom = localStorage.getItem('nom');
    const prenom = localStorage.getItem('prenom');
    const adresse = localStorage.getItem('adresse');
    
    if (role === "admin") {
        window.location.href = '/admin';
    }else if (role !== "user") {
        window.location.href = '/login';
    }

    const handleLogout = () => {
        // Supprimer le token JWT du stockage local lors de la déconnexion
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('role');
        localStorage.removeItem('nom');
        localStorage.removeItem('prenom');
        localStorage.removeItem('adresse');
        // Redirige l'utilisateur vers la page de connexion après la déconnexion
        window.location.href = '/login';
    };

    const handleModifyProfile = () => {
        window.location.href = '/modifyProfile';
    };

    return (
        <div>
            <h2>Profil Utilisateur</h2>
            <p>ID de l'utilisateur : {userId}</p>
            <p>Email de l'utilisateur : {userEmail}</p>
            <p>Rôle de l'utilisateur : {role}</p>
            <p>Nom : {nom}</p>
            <p>Prénom : {prenom}</p>
            <p>Adresse : {adresse}</p>
            <button onClick={handleLogout}>Déconnexion</button>
            <button onClick={handleModifyProfile}>Modifier mon profil</button>
            <a href="mailto:support@lmf.fr">Besoin d'aide ?</a>
        </div>
    );
}
export default Profile;