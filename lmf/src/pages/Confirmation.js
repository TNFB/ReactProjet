import React from 'react';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import '../styles/Confirmation.css';

function Confirmation() {
    const confirmationCommande = JSON.parse(localStorage.getItem('confirmationCommande'));

    return (
        <div className='confirmation-container'>
            <Banner />
            <h2 className='confirmation-title'>Confirmation de commande</h2>
            <p className='confirmation-text'>Commande n°{confirmationCommande.results[0].idCommande}</p>
            <p className='confirmation-text'>Etat de la commande : {confirmationCommande.results[0].etat}</p>
            <Footer />
        </div>
    );
}

export default Confirmation;
