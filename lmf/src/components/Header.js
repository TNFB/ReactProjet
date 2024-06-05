import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Header() {

    const role = localStorage.getItem('role');

    const [isLogged, setisLogged] = useState(false) // Etat pour vérifier si l'utilisateur est connecté


    useEffect(() => {
        if (role === "user" || role === "admin") {
            setisLogged(true)
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);

    
    

    return (
        <nav>
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            <Link to="/">Accueil</Link>
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            <Link to="/questionnaire/1">Questionnaire</Link>
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            {!isLogged && <Link to="/login">Connexion</Link>}
            {role === "user" && <Link to="/profile">Profil</Link>}
            {role === "admin" && <Link to="/admin">Admin</Link>}
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            <Link to="/suivi">Suivi</Link>
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            {role === "admin" && <Link to="/gestionArticles">Gestion Articles</Link>}
        </nav>
    )
}
export default Header
