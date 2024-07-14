import videoHome from '../media/video_1.mp4'
import '../styles/Hero.css';
import SearchBar from './SearchBar';

function Hero(){
    return(
        <>
        <div className='heroVideo'>
            <video autoPlay muted loop className='homeVideo'>
                <source src={videoHome} type='video/mp4'/>
            </video>
            <div className='texto-hero'>
                <h1>Corações Unidos para Fazer a Diferença</h1>
                <p>Participe de nossa missão de transformar vidas através do voluntariado e faça a diferença hoje.</p>
                
            </div>
            <SearchBar />
        </div>
        </>
    );
}

export default Hero;