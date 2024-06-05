import React from 'react';
function Confirmation() {

    const confirmationCommande = JSON.parse(localStorage.getItem('confirmationCommande'));

    return (
        <div>
            <p>Confirmation de commande</p>
            <p>Commande n°{confirmationCommande.results[0].idCommande}</p>
            <p>Etat de la commande : {confirmationCommande.results[0].etat}</p>
        </div>
    );
}
export default Confirmation;