import '../styles/Cart.css'
import { useState, useEffect } from 'react'

function Cart({ cart, updateCart }) {

    //const tshirtPrice = 8
    //const pullPrice = 10
    //const pantalonPrice = 15
    //const [cart, updateCart] = useState(0)
    const [isOpen, setIsOpen] = useState(false)
    const total = cart.reduce(
        (acc, vetementType) => acc + vetementType.amount * vetementType.price, 0)
    useEffect(() => {
        document.title = `LMF: ${total}€ d'achats`
    }, [total])

    return isOpen ? (
        <div className='lmf-cart'>
            <button onClick={() => setIsOpen(false)}>Fermer</button>
            <h2>Panier</h2>
            {/*<div>
                        t-shirt : {tshirtPrice}€
                        <button onClick={() => updateCart(cart + 1)}>
                        Ajouter
                        </button>
                    </div>*/}
            <ul>
                {cart.map(({ name, price, amount }, index) => (
                    <div>
                        {name} {price}€ x {amount}
                    </div>
                ))}
            </ul>
            {/*<h3>Total : {tshirtPrice * cart }€</h3>*/}
            <h3>Total : {total}€</h3>
            {/*<button onClick={() => updateCart(0)}>Vider le panier</button>*/}
            <button onClick={() => updateCart([])}>Vider le panier</button>
            <button onClick={() => {
                localStorage.setItem('cart', JSON.stringify(cart));
                window.location.href = '/commande';
            }}>Commander</button>
        </div>
    )
        : (<button onClick={() => setIsOpen(true)}>Ouvrir le Panier</button>)

}
export default Cart
