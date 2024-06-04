import { useContext } from 'react'
import { QuestionnaireContext } from '../context'
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
            <h1>Résultats</h1>
            <ul >
                {reponseValues && reponseValues.map((reponse, index) => (
                    <span>{formatQuestionList(reponse, index)}<br /></span>))}
            </ul>
        </div>
    )

}
export default Results

