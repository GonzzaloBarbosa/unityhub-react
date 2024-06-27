import FotoFundo from '../media/fundo2.jpg';
import '../styles/ContactoForm.css'

function Contacto(){
    return(
        <>
        <img src={FotoFundo} alt='Foto de fundo' className='imagem-fundo' />
        <div className='titulo'>
            <h1>Contacto</h1>
        </div>
        <div className='from-container'>
            <h1>Entre em contacto conosco!</h1>
            <form>
                <input placeholder="Nome"/>
                <input placeholder="Email"/>
                <input placeholder="Assunto"/>
                <textarea placeholder='Mensagem' rows='4'></textarea>
                <button>Enviar Mensagem</button>
            </form>
        </div>
        </>
    )
}

export default Contacto;