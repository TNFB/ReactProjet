import React, { useState, useEffect } from 'react';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import '../styles/Login.css';

function Login() {
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            window.location.href = '/profile';
        }
    }, []);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSignup, setIsSignup] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
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
            if (!response.ok) {
                const errorMessage = await response.text();
                setErrorMessage(errorMessage);
                throw new Error(errorMessage);
            }
            const data = await response.json();
            if (isSignup) {
                window.location.href = '/login';
            } else {
                const { userId, token, userEmail, role, nom, prenom, adresse } = data;
                localStorage.setItem('userId', userId);
                localStorage.setItem('token', token);
                localStorage.setItem('userEmail', userEmail);
                localStorage.setItem('role', role);
                localStorage.setItem('nom', nom);
                localStorage.setItem('prenom', prenom);
                localStorage.setItem('adresse', adresse);
                window.location.href = '/profile';
            }
        } catch (error) {
            console.error('Erreur lors de la connexion :', error);
            setErrorMessage('Identifiants incorrects. Veuillez réessayer.');
        }
    };

    return (
        <div className="login-container">
            <Banner />
            <h2 className="login-title">{isSignup ? 'Inscription' : 'Connexion'}</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <form className="login-form" onSubmit={handleSubmit}>
                <input
                    className="login-input"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="login-input"
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="login-button" type="submit">
                    {isSignup ? 'S\'inscrire' : 'Se connecter'}
                </button>
            </form>
            <p className="toggle-message">
                {isSignup ? 'Vous avez déjà un compte ?' : 'Vous n\'avez pas de compte ?'}
            </p>
            <button className="toggle-button" onClick={() => setIsSignup(!isSignup)}>
                {isSignup ? 'Se connecter' : 'S\'inscrire'}
            </button>
            <Footer />
        </div>
    );
}

export default Login;
