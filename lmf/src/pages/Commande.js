import React, { useEffect } from 'react';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import '../styles/Commande.css';

function Commande() {
    const commande = JSON.parse(localStorage.getItem('cart'));

    const verifyCommande = () => {
        if (commande.length === 0) {
            alert('Votre panier est vide');
            window.location.href = '/';
        }
    };

    const verifyInfos = () => {
        const nom = localStorage.getItem('nom');
        const prenom = localStorage.getItem('prenom');
        const adresse = localStorage.getItem('adresse');

        if (nom === 'Non défini' || prenom === 'Non défini' || adresse === 'Non défini') {
            alert('Veuillez renseigner vos informations avant de passer commande');
            window.location.href = '/profile';
        }

        if (!nom || !prenom || !adresse) {
            alert('Veuillez vous connecter pour passer commande');
            window.location.href = '/login';
        }
    };

    const handleValidate = async (commande) => {
        const userID = localStorage.getItem('userId');

        const updatedCommande = {
            userID,
            commande
        };

        const commandeJSON = JSON.stringify(updatedCommande);
        console.log(commandeJSON);

        const response = await fetch('http://localhost:3002/commande/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: commandeJSON
        });
        if (response.ok) {
            alert('Article ajouté avec succès');
            const data = await response.json();
            localStorage.setItem('confirmationCommande', JSON.stringify(data));
            window.location.href = '/confirmation';
        } else {
            alert('Erreur lors de l\'ajout de l\'article');
        }
    };

    useEffect(() => {
        verifyCommande();
        verifyInfos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className='commande-container'>
            <Banner />
            <h2 className='commande-title'>Commande</h2>
            <ul className='commande-list'>
                {commande.map(({ name, price, amount }, index) => (
                    <li key={index} className='commande-item'>
                        {name} {price}€ x {amount}
                    </li>
                ))}
            </ul>
            <p className='commande-total'>
                Total : {commande.reduce(
                    (acc, vetementType) => acc + vetementType.amount * vetementType.price, 0)}€
            </p>
            <div className='commande-info'>
                <h2 className='commande-info-title'>Informations de livraison</h2>
                <p className='commande-info-detail'>Nom : {localStorage.getItem('nom')}</p>
                <p className='commande-info-detail'>Prénom : {localStorage.getItem('prenom')}</p>
                <p className='commande-info-detail'>Adresse : {localStorage.getItem('adresse')}</p>
            </div>
            <button className='commande-button' onClick={() => handleValidate(commande)}>Valider la commande</button>
            <Footer />
        </div>
    );
}

export default Commande;
