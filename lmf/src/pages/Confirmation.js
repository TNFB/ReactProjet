import React from 'react';
import Banner from '../components/Banner'
import Footer from '../components/Footer'
function Confirmation() {

    const confirmationCommande = JSON.parse(localStorage.getItem('confirmationCommande'));

    return (
        <div>
            <Banner />
            <p>Confirmation de commande</p>
            <p>Commande n°{confirmationCommande.results[0].idCommande}</p>
            <p>Etat de la commande : {confirmationCommande.results[0].etat}</p>
            <Footer />
        </div>
    );
}
export default Confirmation;