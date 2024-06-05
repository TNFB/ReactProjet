import React, { useEffect } from 'react';

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
    }

    useEffect(() => {
        verifyCommande();
        verifyInfos();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <h2>Commande</h2>
            <ul>
                {commande.map(({ name, price, amount }, index) => (
                    <div>
                        {name} {price}€ x {amount}
                    </div>
                ))}
            </ul>
            <p>Total : {commande.reduce(
                (acc, vetementType) => acc + vetementType.amount * vetementType.price, 0)}€</p>
            <div>
                <h2>Informations de livraison</h2>
                <p>Nom : {localStorage.getItem('nom')}</p>
                <p>Prénom : {localStorage.getItem('prenom')}</p>
                <p>Adresse : {localStorage.getItem('adresse')}</p>
            </div>
            <button onClick={() => handleValidate(commande)}>Valider la commande</button>
        </div>
    );
}

export default Commande;