import React, { useState, useEffect } from 'react';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import '../styles/GestionArticles.css';

function GestionArticles() {
    const role = localStorage.getItem('role');

    if (!(role === "user" || role === "admin")) {
        window.location.href = '/login';
    }

    const [name, setName] = useState('');
    const [cover, setCover] = useState('');
    const [category, setCategory] = useState('');
    const [isSpecialOffer, setIsSpecialOffer] = useState(false);
    const [price, setPrice] = useState('');
    const [confort, setConfort] = useState('');
    const [taille, setTaille] = useState('');
    const [video, setVideo] = useState('');
    const [articles, setArticles] = useState([]);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3002/')
            .then(response => response.json())
            .then(data => setArticles(data));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const article = { name, cover, category, isSpecialOffer, confort, taille, price, video };
        const response = await fetch('http://localhost:3002/gestionArticles/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(article)
        });
        if (response.ok) {
            alert('Article ajouté avec succès');
            window.location.reload();
        } else {
            alert('Erreur lors de l\'ajout de l\'article');
        }
    };

    const handleEdit = (article) => {
        setEditId(article.id);
        setName(article.name);
        setCover(article.cover);
        setCategory(article.category);
        setIsSpecialOffer(article.isSpecialOffer);
        setPrice(article.price);
        setConfort(article.confort);
        setTaille(article.taille);
        setVideo(article.video);
    };

    const handleSave = async (id) => {
        const article = { name, cover, category, isSpecialOffer, price, confort, taille, video };
        const response = await fetch(`http://localhost:3002/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(article)
        });
        if (response.ok) {
            alert('Article modifié avec succès');
            setEditId(null);
            window.location.reload();
        } else {
            alert('Erreur lors de la modification de l\'article');
        }
    };

    const handleDelete = async (id) => {
        const response = await fetch(`http://localhost:3002/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            alert('Article supprimé avec succès');
            window.location.reload();
        } else {
            alert('Erreur lors de la suppression de l\'article');
        }
    };

    return (
        <div className="gestion-container">
            <Banner />
            {!editId && (
                <form className="gestion-form" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Nom" value={name} onChange={e => setName(e.target.value)} required />
                    <input type="text" placeholder="Cover URL" value={cover} onChange={e => setCover(e.target.value)} />
                    <input type="text" placeholder="Catégorie" value={category} onChange={e => setCategory(e.target.value)} />
                    <label>
                        <input type="checkbox" checked={isSpecialOffer} onChange={e => setIsSpecialOffer(e.target.checked)} />
                        Promo
                    </label>
                    <input type="number" placeholder="Prix" value={price} onChange={e => setPrice(e.target.value)} />
                    <input type="text" placeholder="Confort" value={confort} onChange={e => setConfort(e.target.value)} />
                    <input type="text" placeholder="Taille" value={taille} onChange={e => setTaille(e.target.value)} />
                    <input type="text" placeholder="Video URL" value={video} onChange={e => setVideo(e.target.value)} />
                    <button type="submit" className="gestion-button">Ajouter</button>
                </form>
            )}
            <div className="articles-container">
                {articles.map(article => (
                    <div key={article.id} className="article-item">
                        {editId === article.id ? (
                            <div className="edit-form">
                                <input type="text" value={name} onChange={e => setName(e.target.value)} />
                                <input type="text" value={cover} onChange={e => setCover(e.target.value)} />
                                <input type="text" value={category} onChange={e => setCategory(e.target.value)} />
                                <label>
                                    <input type="checkbox" checked={isSpecialOffer} onChange={e => setIsSpecialOffer(e.target.checked)} />
                                    Promo
                                </label>
                                <input type="number" value={price} onChange={e => setPrice(e.target.value)} />
                                <input type="text" value={confort} onChange={e => setConfort(e.target.value)} />
                                <input type="text" value={taille} onChange={e => setTaille(e.target.value)} />
                                <input type="text" value={video} onChange={e => setVideo(e.target.value)} />
                                <button className="gestion-button" onClick={() => handleSave(article.id)}>Enregistrer</button>
                            </div>
                        ) : (
                            <div className="article-details">
                                <p>Nom : {article.name}</p>
                                <img src={article.cover} alt="Cover" className="article-cover" />
                                <p>Catégorie : {article.category}</p>
                                <p>Promo : {article.isSpecialOffer ? 'Oui' : 'Non'}</p>
                                <p>Prix : {article.price}</p>
                                <p>Confort : {article.confort}</p>
                                <p>Taille : {article.taille}</p>
                                <p>Video : {article.video}</p>
                                <button className="gestion-button" onClick={() => handleEdit(article)}>Modifier</button>
                                <button className="gestion-button" onClick={() => handleDelete(article.id)}>Supprimer</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
}

export default GestionArticles;
