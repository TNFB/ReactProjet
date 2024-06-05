import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { useState, useEffect, useContext } from 'react'
import { QuestionnaireContext } from '../context'
import Banner from '../components/Banner'
import Footer from '../components/Footer'


function Questionnaire() {
    const { questionNumber } = useParams()
    const questionNumberInt = parseInt(questionNumber)
    const prevQuestionNumber = questionNumberInt === 1 ? 1 : questionNumberInt - 1
    const nextQuestionNumber = questionNumberInt + 1
    const [surveyData, setSurveyData] = useState({})
    const { reponses, saveReponses } = useContext(QuestionnaireContext)
    function saveReply(answer) {
        saveReponses({ [questionNumber]: answer })
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
            })
    }, [])

    return (
        <div>
            <Banner />
            <h1>Questionnaire sur votre expérience d'achat</h1>
            <h2>Question {questionNumber}</h2>
            <span>{surveyData[questionNumber]}</span>
            <br />
            <button onClick={() => saveReply(true)} >
                Oui</button>
            <button onClick={() => saveReply(false)} >
                Non</button>
            <br />


            {questionNumberInt === 1 ? (
                <Link to="/"></Link>
            ) : (
                <Link to={`/questionnaire/${prevQuestionNumber}`}>Précédent</Link>
            )}
            {questionNumberInt === 6 ? (
                <Link to="/results">Résultats</Link>
            ) : (
                <Link to={`/questionnaire/${nextQuestionNumber}`}>Suivant</Link>
            )}
            <Footer />
        </div>
    )
}
export default Questionnaire
