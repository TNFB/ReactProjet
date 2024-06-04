import React from 'react';

function Commande() {
    const commande = JSON.parse(localStorage.getItem('cart'));

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
        </div>
        
    );
}

export default Commande;