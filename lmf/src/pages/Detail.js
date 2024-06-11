import '../styles/Detail.css';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Banner from '../components/Banner';
import Footer from '../components/Footer';

function Detail() {
    const { idArticle } = useParams();
    const [detailVetement, setData] = useState({});
    const [listAvis, setListAvis] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedVetement, setUpdatedVetement] = useState({
        name: '', cover: '', price: 0, confort: 0, taille: ''
    });

    useEffect(() => {
        fetch(`http://localhost:3001/${idArticle}`)
            .then((response) => response.json())
            .then((detailVetement) => {
                setData(detailVetement);
                setUpdatedVetement(detailVetement);
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération du détail vêtement:', error);
            });
    }, [idArticle]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedVetement((prevVetement) => ({
            ...prevVetement,
            [name]: value
        }));
    };

    const handleUpdateVetement = () => {
        fetch(`http://localhost:3001/${idArticle}`, {
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
        fetch('http://localhost:3001/upload', {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                const imageUrl = data.imageUrl;
                setUpdatedVetement({ ...updatedVetement, cover: imageUrl });
                setIsEditing(false);
            })
            .catch(error => {
                console.error('Erreur téléchargement image :', error);
            });
    };

    useEffect(() => {
        fetch(`http://localhost:3001/avis/${idArticle}`)
            .then((response) => response.json())
            .then((listAvis) => {
                setListAvis(listAvis);
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des avis:', error);
            });
    }, [idArticle]);

    let userId = localStorage.getItem('userId');
    if (!userId) {
        userId = 0;
    }
    const [envoiAvis, setEnvoiAvis] = useState("");
    const [errorMessage, setErrorMessage] = useState(''); 

    const handleSubmitAvis = async (e) => {
        e.preventDefault();
        try {
            const url = `http://localhost:3001/avis/${idArticle}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ envoiAvis, userId })
            });
            if (!response.ok) {
                const errorMessage = await response.text();
                setErrorMessage(errorMessage);
                throw new Error(errorMessage);
            }
            const data = await response.json();
            console.log(data);
            window.location.href = '/detail/' + idArticle;
        } catch (error) {
            console.error('Erreur lors de la modification :', error);
            setErrorMessage('Erreur');
        }
    };

    return (
        <div className="detail-container">
            <Banner />
            <h1 className="detail-heading">Détail du vêtement</h1>
            {!isEditing ? (
                <div className="detail-content">
                    <h1 className="detail-name">{detailVetement.name}</h1>
                    <img className="detail-cover" src={detailVetement.cover} alt={`${detailVetement.name} cover`} />
                    {detailVetement.video && (
                        <iframe
                            width="560"
                            height="315"
                            src={detailVetement.video + "?autoplay=1"}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    )}
                    <h2 className="detail-price">Prix : {detailVetement.price} euros</h2>
                    <h2 className="detail-confort">Confort : {detailVetement.confort}</h2>
                    <h2 className="detail-taille">Taille : {detailVetement.taille}</h2>
                    <button className="detail-edit-button" onClick={() => setIsEditing(true)}>Modifier</button>
                    {listAvis.length > 0 && (
                        <div className="detail-avis">
                            <h2 className="detail-avis-title">Avis :</h2>
                            <ul className="detail-avis-list">
                                {listAvis.map((avis) => (
                                    <li key={avis.idAvis} className="detail-avis-item">{avis.prenom} a commenté : {avis.avis}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {errorMessage && <p className="error-message" style={{ color: 'red' }}>{errorMessage}</p>}
                    <form className="detail-avis-form" onSubmit={handleSubmitAvis}>
                        <input className="detail-avis-input" type="text" placeholder="Votre avis" value={envoiAvis} onChange={(e) => setEnvoiAvis(e.target.value)} />
                        <button className="detail-avis-submit" type="submit">Envoyer</button>
                    </form>
                </div>
            ) : (
                <div className="form-container">
                    <label className="form-label">Nom:</label>
                    <input className="form-input" type="text" name="name" value={updatedVetement.name} onChange={handleInputChange} />
                    <input className="form-input" type="file" onChange={handleImageChange} />
                    <button className="form-button" onClick={() => { handleUpdateVetement(); handleImageUpload(); }}>Enregistrer</button>
                    <button className="form-button" onClick={() => setIsEditing(false)}>Annuler</button>
                </div>
            )}
            <Footer />
        </div>
    );
}

export default Detail;
