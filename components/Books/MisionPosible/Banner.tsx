import React from 'react'
import Image from 'next/image'
import Container from '../../container'

export default function MisionPosibleBanner() {
  return (
    <section className="bg-neutral-200 dark:bg-neutral-800 py-24">
      <Container>
        <div className="flex flex-col lg:flex-row justify-center align-middle gap-8">
          <div className="w-full">
            <Image
              src="/img/mision-posible/mockup-01.png"
              layout="responsive"
              width="100%"
              height="100%"
              objectFit="contain"
            />
          </div>
          <div className="prose prose-lg dark:text-neutral-300">
            <h2 className="dark:text-white">
              <em className="dark:text-yellow-500">Misión Posible:</em>{' '}
              Evangeliza. Haz discípulos. Vive la misión de Jesús en tu día a
              día.
            </h2>
            <p>
              <b>
                ¡La razón por la que muchos no están haciendo nuevos discípulos
                para Jesús es porque no saben por cómo hacerlo!
              </b>
            </p>

            <p>
              En Misión Posible, Josman Proudinat te muestra cómo llevar el
              mensaje de Jesús a cada persona que encuentres en tu vida diaria,
              transformando así el mundo a tu alrededor.
            </p>

            <p className="mb-12">
              No importa si eres un creyente nuevo o si has estado siguiendo a
              Cristo por años, Misión Posible te guiará paso a paso para que te
              conviertas en un verdadero misionero en el lugar donde te
              encuentres. Descubrirás que evangelizar y hacer discípulos no es
              solo para algunos, sino que es la misión de todos los seguidores
              de Jesús.
            </p>

            <div className='text-center lg:text-left'>
              <a
                href="https://www.amazon.com/dp/9997905652/"
                target="_blank"
                className="bg-yellow-400 hover:bg-yellow-500 border text-black font-bold py-4 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
              >
                Comprar en Amazon
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
