import '../styles/Cart.css';
import { useState, useEffect } from 'react';

function Cart({ cart, updateCart }) {
    const [isOpen, setIsOpen] = useState(false);
    const total = cart.reduce((acc, vetementType) => acc + vetementType.amount * vetementType.price, 0);

    useEffect(() => {
        document.title = `LMF: ${total}€ d'achats`;
    }, [total]);

    function deleteArticle(name) {
        const currentVetementAdded = cart.find((vetement) => vetement.name === name);
        if (currentVetementAdded) {
            if (currentVetementAdded.amount > 1) {
                const cartFiltered = cart.filter((vetement) => vetement.name !== name);
                updateCart([
                    ...cartFiltered,
                    { name, price: currentVetementAdded.price, amount: currentVetementAdded.amount - 1 }
                ]);
            } else {
                const cartFiltered = cart.filter((vetement) => vetement.name !== name);
                updateCart([...cartFiltered]);
            }
        } else {
            updateCart([...cart, { name, price: currentVetementAdded.price, amount: 1 }]);
        }
    }

    return isOpen ? (
        <div className='lmf-cart'>
            <button className='lmf-cart-close' onClick={() => setIsOpen(false)}>Fermer</button>
            <h2 className='lmf-cart-title'>Panier</h2>
            <ul className='lmf-cart-list'>
                {cart.map(({ name, price, amount }, index) => (
                    <div key={index} className='lmf-cart-item'>
                        <span className='lmf-cart-item-name'>{name}</span> 
                        <span className='lmf-cart-item-price'>{price}€</span> 
                        <span className='lmf-cart-item-amount'>x {amount}</span>
                        <button className='lmf-cart-item-delete' onClick={() => deleteArticle(name)}>Supprimer</button>
                    </div>
                ))}
            </ul>
            <h3 className='lmf-cart-total'>Total : {total}€</h3>
            <button className='lmf-cart-empty' onClick={() => updateCart([])}>Vider le panier</button>
            <button className='lmf-cart-order' onClick={() => {
                localStorage.setItem('cart', JSON.stringify(cart));
                window.location.href = '/commande';
            }}>Commander</button>
        </div>
    ) : (
        <button className='lmf-cart-open' onClick={() => setIsOpen(true)}>Ouvrir le Panier</button>
    );
}

export default Cart;
