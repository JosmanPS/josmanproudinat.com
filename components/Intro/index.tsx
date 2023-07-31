import { CMS_NAME } from '../../lib/constants'
import Container from '../container'
import Buttons from './buttons'
import NextImage from 'next/image'

const Intro = () => {
  return (
    <section
      className="flex flex-col-reverse md:flex-row items-center md:justify-between md:min-h-[650px] py-36 relative -z-20"
      style={{
        background:
          'linear-gradient(135deg, rgba(0,0,0,1) 0%, rgba(141,140,145,1) 100%)',
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
            enseñanzas.<br />
            <b>
              Mi meta es poder ayudarte a cumplir la misión de Jesús para tu
              vida.
            </b>{' '}
          </p>
          <div className="mb-8">
            <Buttons />
          </div>
        </div>
      </Container>
      <div className="absolute w-full h-full bottom-0 right-0 md:right-48 overflow-hidden" style={{}}>
        <NextImage
          className="-z-10"
          src="/img/josman-sin-fondo.png"
          alt="Josman Proudinat"
          layout="fill"
          objectFit="contain"
          objectPosition="right bottom"
          quality={100}
        />
      </div>
    </section>
  )
}

export default Intro
