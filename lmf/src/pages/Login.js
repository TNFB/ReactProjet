import React, { useState, useEffect } from 'react';
import Banner from '../components/Banner'
import Footer from '../components/Footer'
function Login() {
    useEffect(() => { // Vérifiez si un token est déjà stocké localement
        const token = localStorage.getItem('token');
        if (token) { // Si un token est présent, redirigez l'utilisateur vers la page de profil
            window.location.href = '/profile';
        }
    }, []); // Utilisez un tableau vide pour exécuter cet effet uniquement une fois au chargement initial
    const [email, setEmail] = useState(''); // Etat qui Stocke l'email de l'utilisateur
    const [password, setPassword] = useState(''); // Etat qui Stocke le mot de passe de l'utilisateur.
    const [isSignup, setIsSignup] = useState(false); // détermine si utilisateur est en train de s'inscrire ou de se connecter
    const [errorMessage, setErrorMessage] = useState(''); // Stocke les messages d'erreur à afficher.
    const handleSubmit = async (e) => { //Lorsque l'utilisateur soumet le formulaire, la fonction handleSubmit envoie une requête POST au backend(soit / signup pour l'inscription, soit /login pour la connexion) avec les données email et password.
        e.preventDefault();
        try {
            const url = isSignup ? 'http://localhost:3002/signup' : 'http://localhost:3002/login';
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            if (!response.ok) {// Si la réponse n'est pas OK, gérer l'erreur
                const errorMessage = await response.text();
                setErrorMessage(errorMessage);
                throw new Error(errorMessage);
            }
            const data = await response.json(); // on récupère les données du json si ok 
            if (isSignup) {
                window.location.href = '/login'; // Redirection vers une page de connexion
            } else {
                const userId = data.userId; // on récupère le userId
                localStorage.setItem('userId', userId); // Stocke ID de l'utilisateur dans le stockage local
                const token = data.token; // Stocker le token d'authentification dans le stockage local
                localStorage.setItem('token', token); // Stocker également l'ID de l'utilisateur dans le stockage local
                const userEmail = data.userEmail; // on récupère l'email de l'utilisateur
                localStorage.setItem('userEmail', userEmail); // Stocke l'email de l'utilisateur dans le stockage local
                const role = data.role; // on récupère le role de l'utilisateur
                localStorage.setItem('role', role); // Stocke le rôle de l'utilisateur dans le stockage local
                const nom = data.nom; // on récupère le nom de l'utilisateur
                localStorage.setItem('nom', nom); // Stocke le nom de l'utilisateur dans le stockage local
                const prenom = data.prenom; // on récupère le prénom de l'utilisateur
                localStorage.setItem('prenom', prenom); // Stocke le prénom de l'utilisateur dans le stockage local
                const adresse = data.adresse; // on récupère l'adresse de l'utilisateur
                localStorage.setItem('adresse', adresse); // Stocke l'adresse de l'utilisateur dans le stockage local
                window.location.href = '/profile'; // Redirection vers une page de profil
            }

        } catch (error) {
            console.error('Erreur lors de la connexion :', error);
            setErrorMessage('Identifiants incorrects. Veuillez réessayer.'); // Affiche message erreur à utilisateur
        }
    };
    // selon la valeur de isSignup , Le rendu du composant affiche un formulaire pour l'inscription ou la connexion.Ainsi qu'un bouton pour basculer entre les deux modes. Il affiche également un message d'erreur errorMessage si une erreur survient lors de la soumission du formulaire. 
    return (
        <div>
            <Banner />
            <h2>{isSignup ? 'Inscription' : 'Connexion'}</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}
                />
                <input type="password" placeholder="Mot de passe" value={password} onChange={(e) =>
                    setPassword(e.target.value)} />
                <button type="submit">{isSignup ? 'S\'inscrire' : 'Se connecter'}</button>
            </form>
            <p>{isSignup ? 'Vous avez déjà un compte ?' : 'Vous n\'avez pas de compte ?'}</p>
            <button onClick={() => setIsSignup(!isSignup)}>{isSignup ? 'Se connecter' : 'S\'inscrire'}</button>
            <Footer />
        </div>
    );
}
export default Login;