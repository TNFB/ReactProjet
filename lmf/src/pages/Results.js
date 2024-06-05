import { useContext } from 'react';
import { QuestionnaireContext } from '../context';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import '../styles/Results.css';

function formatQuestionList(reponse, index) {
    let title = reponse ? 'oui' : 'non';
    return "Réponse " + (index + 1) + " : " + title;
}

function Results() {
    const { reponses } = useContext(QuestionnaireContext);
    const reponseValues = Object.values(reponses);

    return (
        <div className="results-container">
            <Banner />
            <h1 className="results-title">Résultats</h1>
            <ul className="results-list">
                {reponseValues && reponseValues.map((reponse, index) => (
                    <li key={index} className="results-item">
                        {formatQuestionList(reponse, index)}
                    </li>
                ))}
            </ul>
            <Footer />
        </div>
    );
}

export default Results;
