const express = require('express'); //on importe express
const cors = require('cors'); // Importez le module cors
const mysql = require('mysql2'); //on importe mysql2 
const multer = require('multer'); // Importez le module multer
const bcrypt = require('bcrypt'); // Importez le module bcrypt
const jwt = require('jsonwebtoken'); // Importez le module jsonwebtoken

const bodyParser = require('body-parser');

//app sera notre application express
const app = express();



// Activez CORS pour toutes les routes
app.use(cors());// Connexion à MySQL
app.use(bodyParser.json());


const connection = mysql.createConnection({
    host: '127.0.0.1',
    port: '32561',
    user: 'frontback',
    password: 'frontbackESEO2024',
    database: 'front_back',
});

connection.connect(err => {
    if (err) {
        console.error('Erreur de connexion à MySQL :', err);
    } else {
        console.log('Connexion à MySQL réussie !');
    }
});
// Exemple de requête SELECT à partir de votre table vêtement
app.get('/', async (req, res, next) => {
    connection.query('SELECT * FROM vetement', (error, results) => {
        if (error) {
            console.error('Erreur lors de la requête SELECT :', error);
            res.status(500).json({ error: 'Erreur serveur lors de la requête SELECT.' });
        } else {
            res.status(200).json(results);
        }
    });
});
//je récupère un seul vêtement en fonction de son id
app.get('/:id', async (req, res, next) => {
    const vetementId = req.params.id;
    connection.query('SELECT * FROM vetement WHERE id = ?', [vetementId], (error, results) => {
        if (error) {
            console.error('Erreur lors de la requête SELECT :', error);
            res.status(500).json({ error: 'Erreur serveur lors de la requête SELECT.' });
        } else {
            if (results.length > 0) {
                // Si des résultats sont trouvés, renvoyer le premier élément (le vêtement trouvé)
                res.status(200).json(results[0]);
            } else {
                // Si aucun résultat n'est trouvé, renvoyer une réponse 404
                res.status(404).json({ error: 'Aucun vêtement trouvé avec cet ID.' });
            }
        }
    });
});
//on modifie un seul vêtement en fonction de son id   
app.put('/:id', async (req, res, next) => {
    const vetementId = req.params.id;
    const updatedVetementData = req.body;
    connection.query('UPDATE vetement SET ? WHERE id = ?', [updatedVetementData, vetementId], (error, results) => {
        if (error) {
            console.error('Erreur lors de la requête UPDATE :', error);
            res.status(500).json({ error: 'Erreur serveur lors de la requête UPDATE.' });
        } else {
            // Après la mise à jour, récupérez à nouveau les données mises à jour
            const selectQuery = 'SELECT * FROM vetement WHERE id = ?';
            connection.query(selectQuery, [vetementId], (selectError, selectResults) => {
                if (selectError) {
                    console.error('Erreur lors récupération données mises à jour :', selectError);
                    res.status(500).json({ error: 'Erreur serveur récupération données mises à jour.' });
                } else {
                    if (selectResults.length > 0) {
                        res.status(200).json(selectResults[0]); // Renvoyez données mises à jour en réponse
                    } else {
                        res.status(404).json({ error: 'L\'objet n\'existe pas.' });
                    }
                }
            });
        }
    });
});

// Configuration du dossier où les images seront stockées
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const uploadDir = './images';
        callback(null, uploadDir);
    },
    filename: (req, file, callback) => {
        const fileName = `${Date.now()}-${file.originalname}`;
        callback(null, fileName);
    }
});
const upload = multer({ storage: storage });
// Route POST pour télécharger une image
// Définir le dossier contenant vos images comme dossier statique
app.use('/images', express.static('images'));

// Route pour gérer le téléchargement d'images
app.post('/upload', upload.single('image'), async (req, res) => {
    try {
        // req.file contient les informations sur le fichier téléchargé
        if (req.file) { // Si true, le fichier a été téléchargé avec succès
            const imageUrl = `https://backendkarminecorp.tomherault.fr/images/${req.file.filename}`;
            // Mise à jour du champ 'cover' dans MySQL avec la nouvelle URL de l'image
            const vetementId = req.body.vetementId; // Assurez-vous d'envoyer l'ID du vêtement avec la requête POST (côté Front)
            const updateQuery = 'UPDATE vetement SET cover = ? WHERE id = ?';
            connection.query(updateQuery, [imageUrl, vetementId], (error, results) => {
                if (error) {
                    console.error('Erreur mise à jour du champ cover dans MySQL :', error);
                    res.status(500).json({ error: 'Erreur serveur lors mise à jour image.' });
                } else {
                    // Après la MAJ image, on peut renvoyer l'URL de l'image comme réponse si besoin
                    res.status(200).json({ imageUrl: imageUrl });
                }
            });
        } else {
            res.status(400).json({ error: 'Aucun fichier téléchargé.' });
        }
    } catch (error) {
        console.error('Erreur mise à jour du champ cover dans MySQL :', error);
        res.status(500).json({ error: 'Erreur serveur lors mise à jour image.' });
    }
});


// Route POST pour créer un nouvel utilisateur
app.post('/signup', (req, res, next) => {
    const { email, password } = req.body;
    // Vérifiez si l'email et le mot de passe ont été envoyés
    if (email && password) {
        // Hasher le mot de passe avant de l'enregistrer dans la base de données
        bcrypt.hash(password, 10, (hashError, hashedPassword) => {
            if (hashError) {
                console.error('Erreur lors du hachage du mot de passe :', hashError);
                res.status(500).json({ error: 'Erreur serveur lors création utilisateur.' });
            } else {
                connection.query(
                    'INSERT INTO utilisateur (email, password) VALUES (?, ?)', [email, hashedPassword], (error, results) => {
                        if (error) {
                            console.error('Erreur insertion utilisateur dans la base de données :', error);
                            res.status(500).json({ error: 'Erreur serveur lors création utilisateur.' });
                        } else {
                            const userId = results.insertId; // Récupére ID utilisateur nouvellement créé
                            res.status(201).json({ message: 'Utilisateur créé avec succès.', userId: userId });
                        }
                    });
            }
        });
    } else {
        res.status(400).json({ error: 'Email et mot de passe requis pour inscription.' });
    }
});

// Route pour gérer l'authentification de l'utilisateur
app.post('/login', (req, res, next) => {
    const { email, password } = req.body;
    // Récupérer le mot de passe haché de l'utilisateur depuis la base de données
    connection.query('SELECT * FROM utilisateur WHERE email = ?', [email], (error, results) => {
        if (error) {
            console.error('Erreur lors recherche utilisateur dans base de données :', error);
            res.status(500).json({ error: 'Erreur serveur lors authentification.' });
        } else {
            if (results.length > 0) {
                const hashedPasswordFromDB = results[0].password;
                // Comparer le mot de passe fourni avec le mot de passe haché stocké dans MySQL
                bcrypt.compare(password, hashedPasswordFromDB, (compareError, match) => {
                    if (compareError) {
                        console.error('Erreur lors comparaison des mots de passe :', compareError);
                        res.status(500).json({ error: 'Erreur serveur lors authentification.' });
                    } else {
                        if (match) {
                            const userId = results[0].id; // 'id' est la colonne contenant l'ID utilisateur
                            const role = results[0].role; // 'role' est la colonne contenant le rôle de l'utilisateur
                            const nom = results[0].nom; // 'nom' est la colonne contenant le nom de l'utilisateur
                            const prenom = results[0].prenom; // 'prenom' est la colonne contenant le prénom de l'utilisateur
                            const adresse = results[0].adresse; // 'adresse' est la colonne contenant l'adresse de l'utilisateur
                            const token = jwt.sign({ userId }, 'votre_clé_secrète', { expiresIn: '24h' }); // Créez un jeton JWT
                            res.status(200).json({ message: 'Authentification réussie.', userId: userId , token: token, userEmail: email, role: role, nom: nom, prenom: prenom, adresse: adresse});
                        } else {
                            res.status(401).json({ error: 'Identifiants incorrects.' });
                        }
                    }
                });
            } else {
                res.status(401).json({ error: 'Identifiants incorrects.' });
            }
        }
    });
});

// Route pour modifier les informations de l'utilisateur
app.post('/modifyProfile/:id', (req, res, next) => {
    const userId = req.params.id;
    const { modify_email, modify_password, modify_nom, modify_prenom, modify_adresse } = req.body;
    // Vérifiez si l'email et le mot de passe ont été envoyés
    if (modify_email && modify_password) {
        // Hasher le mot de passe avant de l'enregistrer dans la base de données
        bcrypt.hash(modify_password, 10, (hashError, hashedPassword) => {
            if (hashError) {
                console.error('Erreur lors du hachage du mot de passe :', hashError);
                res.status(500).json({ error: 'Erreur serveur lors modification utilisateur.' });
            } else {
                connection.query(
                    'UPDATE utilisateur SET email = ?, password = ?, nom = ?, prenom = ?, adresse = ? WHERE id = ?', [modify_email, hashedPassword, modify_nom, modify_prenom, modify_adresse, userId], (error, results) => {
                        if (error) {
                            console.error('Erreur modification utilisateur dans la base de données :', error);
                            res.status(500).json({ error: 'Erreur serveur lors modification utilisateur.' });
                        } else {
                            res.status(200).json({ message: 'Utilisateur modifié avec succès.', userId: userId });
                        }
                    });
            }
        });
    } else {
        res.status(400).json({ error: 'Email et mot de passe requis pour modification.' });
    }
});

// Affichage des avis
app.get('/avis/:id', async (req, res, next) => {
    const idArticle = req.params.id;
    connection.query('SELECT * FROM avis WHERE idArticle = ?', [idArticle], (error, results) => {
        if (error) {
            console.error('Erreur lors de la requête SELECT :', error);
            res.status(500).json({ error: 'Erreur serveur lors de la requête SELECT.' });
        } else {
            if (results.length > 0) {
                res.status(200).json(results);
            } else {
                // Si aucun résultat n'est trouvé, renvoyer une réponse 404
                res.status(404).json({ error: 'Aucun avis trouvé avec cet ID d\'article.' });
            }
        }
    });
});

// Route pour ajouter un avis dans la BDD
app.post('/avis/:id', (req, res, next) => {
    const idArticle = req.params.id;
    const {envoiAvis, userId} = req.body;
    connection.query(
        'INSERT INTO avis (idArticle, avis, idUser) VALUES (?, ?, ?)', [idArticle, envoiAvis, userId], (error, results) => {
            if (error) {
                console.error('Erreur insertion avis dans la base de données :', error);
                res.status(500).json({ error: 'Erreur serveur lors ajout avis.' });
            } else {
                res.status(201).json({ message: 'Avis ajouté avec succès.' });
            }
        });
});



module.exports = app;
