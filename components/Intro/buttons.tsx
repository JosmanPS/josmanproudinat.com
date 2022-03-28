import React from 'react'
import Button from '../Button'



export default function Buttons() {
  return (
    <div className="flex flex-col md:flex-row items-center">
      <div className="md:mr-3 mb-8 md:mb-0">
        <Button.White href={`/posts/ultimo`}>Último post</Button.White>
      </div>
      <div>
        <Button.WhiteOutline href="/contacto">Contacto</Button.WhiteOutline>
      </div>
    </div>
  )
}
