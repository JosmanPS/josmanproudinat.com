import { CMS_NAME } from '../lib/constants'

const Intro = () => {
  return (
    <section className="flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <div>
        <h1 className="text-2xl md:text-4xl font-bold tracking-tighter leading-tight md:pr-8">
          Hola, soy Josman Proudinat. 👋
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
      <div>
        <img
          src={'/assets/blog/authors/josman.png'}
          className="rounded-full ml-8"
          width={290}
          alt={'Josman Proudinat'}
        />
      </div>
    </section>
  )
}

export default Intro
