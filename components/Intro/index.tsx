import Container from '../container'
import Buttons from './buttons'
import NextImage from 'next/image'

const Intro = () => {
  return (
    <section
      className="relative overflow-hidden bg-neutral-900 text-white pt-16 md:pt-24 lg:pt-28 pb-0 border-b border-neutral-800"
      style={{
        background:
          'radial-gradient(circle at 80% 20%, rgba(64,64,64,0.35) 0%, rgba(10,10,10,1) 70%)',
      }}
    >
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 items-end gap-8">
          <div className="md:col-span-7 z-10 text-center md:text-left pb-6 md:pb-24 lg:pb-28">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-neutral-400 border border-neutral-800 bg-neutral-900/80 rounded-full px-3.5 py-1 mb-6">
              Teología • Liderazgo • Misión
            </span>
            <h1 className="text-white text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] mb-6">
              Hola, soy Josman Proudinat.
            </h1>
            <p className="text-neutral-300 text-lg md:text-xl leading-relaxed mb-4 max-w-xl mx-auto md:mx-0">
              He creado este espacio para compartir mis artículos, predicaciones
              y notas de enseñanza bíblica.
            </p>
            <p className="text-white font-semibold text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto md:mx-0">
              Mi meta es ayudarte a cumplir la misión de Jesús para tu vida.
            </p>
            <Buttons />
          </div>

          <div className="md:col-span-5 self-end relative h-80 sm:h-96 md:h-[480px] lg:h-[520px] w-full leading-none">
            <NextImage
              priority
              src="/img/josman-sin-fondo.png"
              alt="Josman Proudinat"
              layout="fill"
              objectFit="contain"
              objectPosition="center bottom"
              quality={100}
            />
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Intro
