import { useContext } from 'react'
import { QuestionnaireContext } from '../context'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
function formatQuestionList(reponse, index) {
    let title = ''
    reponse ? title = 'oui' : title = 'non' //si réponse vaut true, affiche oui
    return "Réponse " + (index + 1) + " : " + title // affiche la réponse       
}

function Results() {
    const { reponses } = useContext(QuestionnaireContext)
    //console.log(reponses)
    const reponseValues = Object.values(reponses)
    return (
        <div>
            <Banner />
            <h1>Résultats</h1>
            <ul >
                {reponseValues && reponseValues.map((reponse, index) => (
                    <span>{formatQuestionList(reponse, index)}<br /></span>))}
            </ul>
            <Footer />
        </div>
    )

}
export default Results

