import { CMS_NAME } from '../lib/constants'

const Intro = () => {
  return (
    <section className="flex flex-col-reverse md:flex-row items-center md:justify-between mt-16 mb-16 md:mb-12">
      <div className="md:pr-8">
        <h1 className="text-2xl md:text-4xl font-bold tracking-tighter leading-tight md:pr-8">
          Hola, soy Josman 👋
        </h1>
        <p className="text-center md:text-left text-lg mt-5 leading-10">
          He creado este espacio para compartir mis notas, predicaciones y
          enseñanzas dadas en MRF Church y Escuela de Avivamiento. <br />
          <b>
            Mi meta es poder ayudarte a cumplir la misión de Jesús para tu vida.
          </b>{' '}
          <br />
          Si quieres conversar, puedes contactarme por Instagram o Twitter.
        </p>
      </div>
      <div className='mb-12 md:mb-0'>
        <img
          src={'/assets/blog/authors/josman.png'}
          className="rounded-full"
          width={290}
          alt={'Josman Proudinat'}
        />
      </div>
    </section>
  )
}

export default Intro
