import '../styles/Detail.css'
import Banner from '../components/Banner'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
function Detail() {
    const { idArticle } = useParams()
    const [detailVetement, setData] = useState({})
    const [listAvis, setListAvis] = useState([])
    const [isEditing, setIsEditing] = useState(false);
    const [updatedVetement, setUpdatedVetement] = useState({
        name: '', cover: '', price: 0, confort: 0, taille: ''
    });
    useEffect(() => {
        fetch(`http://localhost:3002/${idArticle}`)
            .then((response) => response.json())
            .then((detailVetement) => {
                setData(detailVetement);
                setUpdatedVetement(detailVetement);
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération du détail vêtement:', error);
            })
    }, [idArticle]);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        //console.log(value);
        setUpdatedVetement((prevVetement) => ({
            ...prevVetement,
            [name]: value
        }));
    };
    const handleUpdateVetement = () => {
        fetch(`http://localhost:3002/${idArticle}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedVetement)
        })
            .then(response => response.json())
            .then(data => {
                setData(data);
                setIsEditing(false);
            })
            .catch(error => console.error('Erreur lors de la requête PUT :', error));
    };
    const [image, setImage] = useState(null);
    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };
    const handleImageUpload = () => {
        const formData = new FormData();
        formData.append('image', image);
        formData.append('vetementId', idArticle);
        fetch('http://localhost:3002/upload', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                const imageUrl = data.imageUrl;
                // Mettre à jour l'URL de l'image dans le state
                setUpdatedVetement({ ...updatedVetement, cover: imageUrl });
                setIsEditing(false);
            })
            .catch(error => {
                console.error('Erreur téléchargement image :', error);
            });
    };
    useEffect(() => {
        fetch(`http://localhost:3002/avis/${idArticle}`)
            .then((response) => response.json())
            .then((listAvis) => {
                setListAvis(listAvis);
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des avis:', error);
            })
    }, [idArticle]);

    let userId = localStorage.getItem('userId');
    if (!userId) {
        userId = 0
    }
    const [envoiAvis, setEnvoiAvis] = useState("");
    const [errorMessage, setErrorMessage] = useState(''); // Stocke les messages d'erreur à afficher.
    const handleSubmitAvis = async (e) => { 
        e.preventDefault();
        try {
            const url =`http://localhost:3002/avis/${idArticle}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({envoiAvis, userId})
            });
            if (!response.ok) {// Si la réponse n'est pas OK, gérer l'erreur
                const errorMessage = await response.text();
                setErrorMessage(errorMessage);
                throw new Error(errorMessage);
            }
            const data = await response.json(); // on récupère les données du json si ok
            console.log(data);
            window.location.href = '/detail/'+idArticle;
        } catch (error) {
            console.error('Erreur lors de la modification :', error);
            setErrorMessage('Erreur'); // Affiche message erreur à utilisateur
        }
    };

    return (
        <div className="detail-container">
            <Banner />
            <h1 className="detail-heading">Détail de mon vêtement</h1>
            <h2 className="article-id">id Article {idArticle}</h2>
            {!isEditing ? (
                <div>
                    <h1 >{detailVetement.name}</h1>
                    <img src={detailVetement.cover}
                        alt={`${detailVetement.name} cover`}
                    />
                    <h2 >Prix : {detailVetement.price} euros</h2>
                    <h2 >Confort : {detailVetement.confort}</h2>
                    <h2 >Taille : {detailVetement.taille}</h2>
                    <button onClick={() => setIsEditing(true)}>Modifier</button>
                    {listAvis.length > 0 && (
                        <div>
                            <h2 >Avis :</h2>
                            <ul>
                                {listAvis.map((avis) => (
                                    <li key={avis.idAvis}>{avis.prenom} a commenté : {avis.avis}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                    <form onSubmit={handleSubmitAvis}>
                        <input type="text" placeholder="Votre avis" value={envoiAvis} onChange={(e) => setEnvoiAvis(e.target.value)} />
                        <button type="submit">Envoyer</button>
                    </form>
                </div>
            ) : (
                <div className="form-container">
                    <label className="form-label">Nom:</label>
                    <input className="form-input" type="text" name="name" value={updatedVetement.name} onChange={handleInputChange} />
                    <input type="file" onChange={handleImageChange} />
                    <button className="form-button" onClick={() => { handleUpdateVetement(); handleImageUpload(); }}>Enregistrer</button>
                    <button className="form-button" onClick={() => setIsEditing(false)}>Annuler</button>
                </div>
            )}
        </div>
    )
}
export default Detail
