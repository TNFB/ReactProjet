import '../styles/ShoppingList.css';
import VetementItem from './VetementItem';
import { useState, useEffect } from 'react';

function ShoppingList({ cart, updateCart }) {
    function addToCart(name, price) {
        const currentVetementAdded = cart.find((vetement) => vetement.name === name);
        if (currentVetementAdded) {
            const cartFiltered = cart.filter((vetement) => vetement.name !== name);
            updateCart([
                ...cartFiltered,
                { name, price, amount: currentVetementAdded.amount + 1 }
            ]);
        } else {
            updateCart([...cart, { name, price, amount: 1 }]);
        }
    }

    const [vetementsList, setVetementsList] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:3002/`)
            .then((response) => response.json())
            .then((vetementsList) => {
                setVetementsList(vetementsList);
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des vêtements:', error);
            });
    }, []);

    return (
        <div className='lmf-shopping-list-container'>
            <ul className='lmf-vetement-list'>
                {vetementsList.map((vetement) => (
                    <li key={vetement.id} className='lmf-vetement-item'>
                        {vetement.isSpecialOffer === 1 && <div className='lmf-sales'>Soldes</div>}
                        <VetementItem
                            id={vetement.id}
                            cover={vetement.cover}
                            name={vetement.name}
                            taille={vetement.taille}
                            confort={vetement.confort}
                            price={vetement.price}
                        />
                        <button
                            className='lmf-button-add'
                            onClick={() => addToCart(vetement.name, vetement.price)}
                        >
                            Ajouter
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ShoppingList;
