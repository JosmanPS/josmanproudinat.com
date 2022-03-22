import { CMS_NAME } from '../lib/constants'

const Intro = () => {
  return (
    <section className="flex-col flex md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        JosmanProudinat.
      </h1>
      <p className="text-center md:text-left text-lg mt-5 leading-10">
        Hola mundo 👋 <br />
        He creado este espacio para compartir mis notas,
        predicaciones y enseñanzas dadas en MRF Church y Escuela de Avivamiento. <br/>
        <b>Mi meta es poder ayudarte a cumplir la misión de Jesús para tu vida.</b> <br />
        Si quieres conversar, puedes contactarme por Instagram o Twitter.
      </p>
    </section>
  )
}

export default Intro
