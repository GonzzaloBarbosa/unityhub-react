import FotoFundo from '../media/fotofundo.jpg';
import Foto1 from '../media/Diana.jpg';
import Foto2 from '../media/Goncalo.jpg';
import '../styles/Sobre.css';

function SobreHero() {
  return (
    <div className='heroContainer'>
      <div className='overlay'></div>
      <div className='fotoSobre'>
        {/* Foto de fundo */}
        <img src={FotoFundo} alt='Foto de fundo' className='imagem-fundo' />

        {/* Primeira foto*/}
        <div className='sobreItem'>
          <div className='imagem-container'>
            <img src={Foto1} alt='Diana Alves Leite' className='imagem-sobre' />
            <a href='https://github.com/Dianaleite01' target='_blank' rel='noopener noreferrer' className='github-link'>
              <i className='fab fa-github'></i>
            </a>
          </div>
          <div className='texto-sobre'>
            <h2>Diana Alves Leite</h2>
            <p>aluno23392@ipt.pt</p>
          </div>
        </div>

        {/* Segunda foto*/}
        <div className='sobreItem'>
          <div className='imagem-container'>
            <img src={Foto2} alt='Gonçalo Henrique da Silva Barbosa' className='imagem-sobre' />
            <a href='https://github.com/GonzzaloBarbosa' target='_blank' rel='noopener noreferrer' className='github-link'>
              <i className='fab fa-github'></i>
            </a>
          </div>
          <div className='texto-sobre'>
            <h2>Gonçalo Henrique da Silva Barbosa</h2>
            <p>aluno23395@ipt.pt</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SobreHero;
