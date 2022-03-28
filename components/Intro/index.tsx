import { CMS_NAME } from '../../lib/constants'
import Container from '../container'
import Buttons from './buttons'

const Intro = () => {
  return (
    <section
      className="flex flex-col-reverse md:flex-row items-center md:justify-between min-h-[600px] py-36"
      style={{
        backgroundImage: "url('/img/josman-hero-bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}
    >
      <Container>
        <div className="max-w-2xl">
          <h1 className="text-white text-center md:text-left text-2xl md:text-4xl font-bold leading-tight md:pr-8">
            Hola, soy Josman Proudinat
          </h1>
          <p className="text-neutral-300 text-center md:text-left text-lg mt-5 leading-10 mb-12">
            He creado este espacio para compartir mis notas, predicaciones y
            enseñanzas dadas en MRF Church y Escuela de Avivamiento. <br />
            <b>
              Mi meta es poder ayudarte a cumplir la misión de Jesús para tu
              vida.
            </b>{' '}
          </p>
          <div className='mb-8'>
            <Buttons />
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Intro
