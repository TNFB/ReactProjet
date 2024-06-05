import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { QuestionnaireContext } from '../context';
import Banner from '../components/Banner';
import Footer from '../components/Footer';
import '../styles/Questionnaire.css';

function Questionnaire() {
    const { questionNumber } = useParams();
    const questionNumberInt = parseInt(questionNumber);
    const prevQuestionNumber = questionNumberInt === 1 ? 1 : questionNumberInt - 1;
    const nextQuestionNumber = questionNumberInt + 1;
    const [surveyData, setSurveyData] = useState({});
    const { reponses, saveReponses } = useContext(QuestionnaireContext);

    function saveReply(answer) {
        saveReponses({ [questionNumber]: answer });
    }

    useEffect(() => {
        fetch(`http://localhost:8000/survey`)
            .then((response) => response.json())
            .then(data => {
                const surveyData = data.surveyData;
                setSurveyData(surveyData);
            })
            .catch((error) => {
                console.error('Erreur lors de la récupération des données du questionnaire:', error);
            });
    }, [questionNumber]);

    return (
        <div className="questionnaire-container">
            <Banner />
            <h1 className="questionnaire-title">Questionnaire sur votre expérience d'achat</h1>
            <h2 className="questionnaire-question-title">Question {questionNumber}</h2>
            <span className="questionnaire-question">{surveyData[questionNumber]}</span>
            <br />
            <div className="questionnaire-buttons">
                <button className="questionnaire-button" onClick={() => saveReply(true)}>Oui</button>
                <button className="questionnaire-button" onClick={() => saveReply(false)}>Non</button>
            </div>
            <div className="questionnaire-navigation">
                {questionNumberInt === 1 ? (
                    <Link to="/" className="questionnaire-link">Accueil</Link>
                ) : (
                    <Link to={`/questionnaire/${prevQuestionNumber}`} className="questionnaire-link">Précédent</Link>
                )}
                {questionNumberInt === 6 ? (
                    <Link to="/results" className="questionnaire-link">Résultats</Link>
                ) : (
                    <Link to={`/questionnaire/${nextQuestionNumber}`} className="questionnaire-link">Suivant</Link>
                )}
            </div>
            <Footer />
        </div>
    );
}

export default Questionnaire;
