import React from 'react'
import { useForm, ValidationError } from '@formspree/react'
import Alert from '../Alert'

export default function ContactForm() {
  const [state, handleSubmit] = useForm('mayvdoeg')

  return (
    <>
      {state.succeeded && <Alert type="success">
        ✅ Tu mensaje ha sido enviado. Pronto me pondré en contacto contigo 😁.
      </Alert>}
      <div className="bg-neutral-50 border border-neutral-200 dark:bg-neutral-800 dark:border-neutral-600 py-8 px-6 mb-8">
        <form onSubmit={handleSubmit}>
          <input
            type="hidden"
            name="_subject"
            value="Nuevo contacto desde josmanproudinat.com"
          />
          <div className="mb-4">
            <label htmlFor="name">Nombre:</label>
            <input
              id="name"
              type="text"
              name="name"
              className="w-full rounded"
              required
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email">Email:</label>
            <input
              id="email"
              type="email"
              name="_replyto"
              className="w-full rounded"
              required
            />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="message">Mensaje:</label>
            <textarea
              id="message"
              name="message"
              className="w-full rounded"
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
            className="btn-primary w-full rounded"
            disabled={state.submitting}
          >
            Enviar
          </button>
        </form>
      </div>
    </>
  )
}
