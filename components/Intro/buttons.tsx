import React from 'react'
import Button from '../Button'

export default function Buttons() {
  return (
    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 justify-center md:justify-start">
      <Button.White href="/posts/ultimo">Leer último post</Button.White>
      <Button.WhiteOutline href="/predicaciones">
        Ver predicaciones
      </Button.WhiteOutline>
    </div>
  )
}
