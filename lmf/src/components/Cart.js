import '../styles/Cart.css'
import { useState, useEffect } from 'react'

function Cart({ cart, updateCart }) {

    const [isOpen, setIsOpen] = useState(false)
    const total = cart.reduce(
        (acc, vetementType) => acc + vetementType.amount * vetementType.price, 0)
    useEffect(() => {
        document.title = `LMF: ${total}€ d'achats`
    }, [total])

    function deleteArticle(name) {
        const currentVetementAdded = cart.find((vetement) => vetement.name === name)
        if (currentVetementAdded) {
            if (currentVetementAdded.amount > 1) {
                const cartFiltered = cart.filter(
                    (vetement) => vetement.name !== name
                )
                updateCart([
                    ...cartFiltered,
                    { name, price: currentVetementAdded.price, amount: currentVetementAdded.amount - 1 }
                ])
            } else {
                const cartFiltered = cart.filter(
                    (vetement) => vetement.name !== name
                )
                updateCart([...cartFiltered])
            }
        } else {
            updateCart([...cart, { name, price: currentVetementAdded.price, amount: 1 }])
        }
    }

    return isOpen ? (
        <div className='lmf-cart'>
            <button onClick={() => setIsOpen(false)}>Fermer</button>
            <h2>Panier</h2>
            <ul>
                {cart.map(({ name, price, amount }, index) => (
                    <div key={index}>
                        {name} {price}€ x {amount}
                        <button onClick={() => deleteArticle(name)}>Supprimer</button>
                    </div>
                ))}
            </ul>
            <h3>Total : {total}€</h3>
            <button onClick={() => updateCart([])}>Vider le panier</button>
            <button onClick={() => {
                localStorage.setItem('cart', JSON.stringify(cart));
                window.location.href = '/commande';
            }}>Commander</button>
        </div>
    )
        : (<button onClick={() => setIsOpen(true)}>Ouvrir le Panier</button>);

}
export default Cart
