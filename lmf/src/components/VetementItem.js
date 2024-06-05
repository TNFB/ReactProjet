import '../styles/VetementItem.css';

function VetementItem(props) {
    const { id, cover, name, taille, confort, price } = props;

    return (
        <div className='lmf-vetement-item-container'>
            <a href={`/detail/${id}`}>
                <img className='lmf-vetement-item-cover' src={cover} alt={name} />
            </a>
            <div className='lmf-vetement-item-details'>
                <div className='lmf-vetement-item-name'>{name}</div>
                <div className='lmf-vetement-item-taille'>Taille : {taille}</div>
                <div className='lmf-vetement-item-confort'>Confort : {confort}</div>
                <span className='lmf-vetement-item-price'>{price}€</span>
            </div>
        </div>
    );
}

export default VetementItem;
