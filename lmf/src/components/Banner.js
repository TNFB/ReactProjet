import logo from '../assets/logo.jpeg'
import '../styles/Banner.css';
function Banner() {
    const title = 'Le Mal Fringué'
    return (
        <div className='lmf-banner'>
            <img src={logo}
                alt='Le Mal Fringué'
                className='lmf-logo'
            />
            <h1 className='lmf-title'>{title}</h1>
        </div>
    )
}

export default Banner
