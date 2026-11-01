import React from 'react'
import Image from 'next/image'
import Container from '../../container'

export default function MisionPosibleBanner() {
  return (
    <section className="bg-neutral-50 dark:bg-neutral-900/60 border-b border-neutral-200/80 dark:border-neutral-800 py-20 md:py-24">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-12 max-w-6xl mx-auto">
          <div className="lg:col-span-5 max-w-sm mx-auto w-full drop-shadow-xl">
            <Image
              src="/img/mision-posible/mockup-01.png"
              alt="Libro Misión Posible de Josman Proudinat"
              layout="responsive"
              width={600}
              height={600}
              objectFit="contain"
            />
          </div>

          <div className="lg:col-span-7 text-center lg:text-left">
            <span className="inline-block text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-amber-100 text-amber-900 dark:bg-amber-500/15 dark:text-amber-300 mb-4">
              Libro Disponible
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight text-neutral-900 dark:text-white mb-4">
              <span className="italic text-amber-600 dark:text-amber-400">
                Misión Posible:
              </span>{' '}
              Evangeliza. Haz discípulos. Vive la misión de Jesús en tu día a
              día.
            </h2>

            <p className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-4 leading-relaxed">
              ¡La razón por la que muchos no están haciendo nuevos discípulos
              para Jesús es porque no saben cómo hacerlo!
            </p>

            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 mb-4 leading-relaxed">
              En <em>Misión Posible</em>, Josman Proudinat te muestra cómo
              llevar el mensaje de Jesús a cada persona que encuentres en tu
              vida diaria, transformando así el mundo a tu alrededor.
            </p>

            <p className="text-base md:text-lg text-neutral-600 dark:text-neutral-400 mb-8 leading-relaxed">
              No importa si eres un creyente nuevo o si has estado siguiendo a
              Cristo por años, esta guía práctica te equipará paso a paso para
              vivir como un verdadero misionero dondequiera que estés.
            </p>

            <div>
              <a
                href="https://www.amazon.com/dp/9997905652/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-lg bg-amber-400 hover:bg-amber-500 text-black font-bold py-3.5 px-8 duration-200 transition-all shadow-sm hover:shadow"
              >
                Comprar en Amazon ↗
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
