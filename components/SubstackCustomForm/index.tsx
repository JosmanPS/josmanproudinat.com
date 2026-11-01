import React, { useEffect } from 'react'

export default function SubstackCustomForm() {
  useEffect(() => {
    window.CustomSubstackWidget = {
      substackUrl: 'josmanproudinat.substack.com',
      placeholder: 'tu@correo.com',
      buttonText: 'Suscribirme',
      theme: 'custom',
      colors: {
        primary: '#171717',
        input: '#FFFFFF',
        email: '#171717',
        text: '#FFFFFF',
      },
    }

    const script = document.createElement('script')
    script.src = 'https://substackapi.com/widget.js'
    script.async = true

    document.body.appendChild(script)

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  return (
    <div className="rounded-2xl bg-neutral-50 border border-neutral-200/80 dark:bg-neutral-900 dark:border-neutral-800 p-8 md:p-12 my-12 text-center">
      <span className="inline-block text-xs font-bold uppercase tracking-widest text-neutral-500 dark:text-neutral-400 mb-2">
        Boletín Semanal
      </span>
      <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-3">
        Recibe nuevos artículos en tu correo
      </h2>
      <p className="text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto mb-6 leading-relaxed">
        Suscríbete gratis a mi publicación en Substack para recibir cada nueva
        enseñanza y reflexión teológica directamente en tu bandeja de entrada.
      </p>
      <div className="flex justify-center">
        <div id="custom-substack-embed"></div>
      </div>
    </div>
  )
}
