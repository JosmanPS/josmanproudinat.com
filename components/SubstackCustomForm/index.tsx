import React, { useEffect } from 'react'

export default function SubstackCustomForm() {
  useEffect(() => {
    window.CustomSubstackWidget = {
      substackUrl: 'josmanproudinat.substack.com',
      placeholder: 'example@gmail.com',
      buttonText: 'Suscríbete',
      theme: 'custom',
      colors: {
        primary: '#000',
        input: '#FFFFFF',
        email: '#000',
        text: '#FFF',
      },
    }

    const script = document.createElement('script')
    script.src = 'https://substackapi.com/widget.js'
    script.async = true

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <div className="bg-neutral-50 border border-neutral-200 dark:bg-neutral-800 dark:border-neutral-600 py-8 px-6 mb-8">
      <h2 className="text-3xl font-bold mb-4">¡Suscríbete!</h2>
      <p className="mb-4">
        Si deseas ser notificado cada vez que se publique un nuevo post, te
        invito a suscribirte.
      </p>
      <div id="custom-substack-embed"></div>
    </div>
  )
}
