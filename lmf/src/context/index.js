import { useState, createContext } from 'react'

export const QuestionnaireContext = createContext()

export const QuestionnaireProvider = ({ children }) => {
            const [reponses, setReponses] = useState({})
            const saveReponses = (newReponses) => {
                setReponses({ ...reponses, ...newReponses })
            }
        return (
                <QuestionnaireContext.Provider value={{ reponses, saveReponses }}>
                    {children}
                </QuestionnaireContext.Provider>
            )
    }
    
    