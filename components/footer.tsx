import Link from 'next/link'
import { FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'
import Container from './container'
import BrandName from './BrandName'
import CircleIcon from './CircleIcon'
import { YOUTUBE_PLAYLIST_URL } from '../lib/constants'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-neutral-50 border-t border-neutral-200/80 dark:bg-neutral-900 dark:border-neutral-800/80">
      <Container>
        <div className="py-12 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <BrandName />
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-2">
              Teología, liderazgo saludable y la misión de Jesús.
            </p>
          </div>

          <nav className="flex flex-wrap justify-center gap-6 text-sm font-medium text-neutral-600 dark:text-neutral-400">
            <Link href="/">
              <a className="hover:text-black dark:hover:text-white transition-colors">
                Inicio
              </a>
            </Link>
            <Link href="/posts">
              <a className="hover:text-black dark:hover:text-white transition-colors">
                Posts
              </a>
            </Link>
            <Link href="/predicaciones">
              <a className="hover:text-black dark:hover:text-white transition-colors">
                Predicaciones
              </a>
            </Link>
            <Link href="/contacto">
              <a className="hover:text-black dark:hover:text-white transition-colors">
                Contacto
              </a>
            </Link>
          </nav>

          <div className="flex items-center">
            <CircleIcon
              href={YOUTUBE_PLAYLIST_URL}
              title="YouTube - Predicaciones Josman Proudinat"
              marginRight
            >
              <FaYoutube />
            </CircleIcon>
            <CircleIcon
              href="https://twitter.com/JosmanProudinat"
              title="Twitter @JosmanProudinat"
              marginRight
            >
              <FaTwitter />
            </CircleIcon>
            <CircleIcon
              href="https://instagram.com/JosmanProudinat"
              title="Instagram @JosmanProudinat"
            >
              <FaInstagram />
            </CircleIcon>
          </div>
        </div>

        <div className="py-6 border-t border-neutral-200/60 dark:border-neutral-800/60 text-center text-xs text-neutral-500 dark:text-neutral-500">
          © {year} Josman Proudinat. Todos los derechos reservados.
        </div>
      </Container>
    </footer>
  )
}

export default Footer
