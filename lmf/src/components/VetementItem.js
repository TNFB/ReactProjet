import '../styles/VetementItem.css'
function VetementItem(props) {
    const idValue = props.id
    const coverValue = props.cover
    const nameValue = props.name
    const tailleValue = props.taille
    const confortValue = props.confort
    const priceValue = props.price
    return (
        <div>
            <a href={`/detail/${idValue}`}>
                <img className='lmf-vetement-item-cover' src={coverValue} alt={nameValue} /><br />
                <br />
            </a>
            {nameValue}<br />
            Taille : {tailleValue} <br />
            Confort : {confortValue}
            <span className='lmf-vetement-item-price'>{priceValue}€</span>

        </div>
    )
}
export default VetementItem
