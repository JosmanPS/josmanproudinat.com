import React from 'react'
import { useForm, ValidationError } from '@formspree/react'
import Alert from '../Alert'

export default function ContactForm() {
  const [state, handleSubmit] = useForm('mayvdoeg')

  return (
    <>
      {state.succeeded && (
        <Alert type="success">
          ✅ Tu mensaje ha sido enviado. Pronto me pondré en contacto contigo.
        </Alert>
      )}
      <div className="rounded-2xl bg-neutral-50 border border-neutral-200/80 dark:bg-neutral-900 dark:border-neutral-800 p-8 md:p-10 mb-12 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="hidden"
            name="_subject"
            value="Nuevo contacto desde josmanproudinat.com"
          />
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-2"
            >
              Nombre
            </label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder="Tu nombre completo"
              className="w-full rounded-lg border-neutral-300 focus:border-black focus:ring-black dark:border-neutral-700 dark:focus:border-white dark:focus:ring-white py-3 px-4"
              required
            />
            <ValidationError
              prefix="Nombre"
              field="name"
              errors={state.errors}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-2"
            >
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              name="_replyto"
              placeholder="tu@correo.com"
              className="w-full rounded-lg border-neutral-300 focus:border-black focus:ring-black dark:border-neutral-700 dark:focus:border-white dark:focus:ring-white py-3 px-4"
              required
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-semibold text-neutral-800 dark:text-neutral-200 mb-2"
            >
              Mensaje
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="¿En qué puedo ayudarte?"
              className="w-full rounded-lg border-neutral-300 focus:border-black focus:ring-black dark:border-neutral-700 dark:focus:border-white dark:focus:ring-white py-3 px-4"
              required
            />
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
          </div>
          <button
            type="submit"
            className="btn-primary w-full py-3.5"
            disabled={state.submitting}
          >
            {state.submitting ? 'Enviando…' : 'Enviar mensaje'}
          </button>
        </form>
      </div>
    </>
  )
}
