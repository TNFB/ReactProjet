import { useState } from 'react'
import '../styles/Footer.css'
function Footer() {
        const [inputValue, setInputValue] = useState('Entrez votre mail')
        function handleBlur() {
                if (!inputValue.includes('@'))
                        alert("Attention, il n'y a pas d'@, ceci n'est pas une adresse valide")
        }
        return (
                <footer className='lmf-footer'>
                        <div className='social-media'>
                                <a href='https://www.facebook.com/lmf' target='_blank' rel='noreferrer'>
                                        <img src='https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg' alt='facebook' />
                                </a>
                                <a href='https://x.com/lmf' target='_blank' rel='noreferrer'>
                                        <img src='https://upload.wikimedia.org/wikipedia/commons/5/53/X_logo_2023_original.svg' alt='x.com' />
                                </a>
                                <a href='https://www.instagram.com/lmf/' target='_blank' rel='noreferrer'>
                                        <img src='https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png' alt='instagram' />
                                </a>
                        </div>
                        <div className='lmf-footer-elem'>
                                Pour les passionné·e·s de vêtements
                        </div>
                        <div className='lmf-footer-elem'>Laissez-nous votre mail :</div>
                        <textarea
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                onBlur={handleBlur}
                        />
                </footer>
        )
}
export default Footer
