import logo from '../assets/logo.jpg'
import '../styles/Banner.css';
function Banner() {
    const title = 'La maison fashion'
    return (
        <div className='lmf-banner'>
            <img src={logo}
                alt='La maison fashion'
                className='lmf-logo'
            />
            <h1 className='lmf-title'>{title}</h1>
        </div>
    )
}

export default Banner
