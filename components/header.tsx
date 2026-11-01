import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'
import BrandName from './BrandName'
import Container from './container'
import DarkModeSwitch from './DarkModeSwitch'

type HeaderLinkProps = {
  children: React.ReactNode
  href: string
  active?: boolean
}

const HeaderLink = ({ children, href, active }: HeaderLinkProps) => {
  return (
    <Link href={href}>
      <a
        className={`block py-2 px-3 md:p-0 text-sm font-medium transition-colors ${
          active
            ? 'text-black dark:text-white font-semibold'
            : 'text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white'
        }`}
      >
        {children}
      </a>
    </Link>
  )
}

type Props = {
  dark?: boolean
}

const Header = ({ dark }: Props) => {
  const [showMobileNav, setShowMobileNav] = useState(false)
  const router = useRouter()

  const links = [
    { text: 'Inicio', href: '/' },
    { text: 'Posts', href: '/posts' },
    { text: 'Predicaciones', href: '/predicaciones' },
    { text: 'Contacto', href: '/contacto' },
  ]

  const isLinkActive = (href: string) => {
    if (href === '/') return router.pathname === '/'
    return router.pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200/80 dark:border-neutral-800/80 bg-white/85 dark:bg-neutral-900/85 backdrop-blur-md transition-colors">
      <Container>
        <div className="flex flex-wrap justify-between items-center py-4">
          <BrandName />

          <div className="flex items-center gap-2 md:hidden">
            <DarkModeSwitch />
            <button
              type="button"
              className="inline-flex items-center justify-center w-9 h-9 text-neutral-600 rounded-lg hover:bg-neutral-100 focus:outline-none dark:text-neutral-300 dark:hover:bg-neutral-800"
              aria-label="Abrir menú"
              onClick={() => setShowMobileNav(!showMobileNav)}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                {showMobileNav ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-8">
            <ul className="flex flex-row space-x-8 items-center">
              {links.map((link) => (
                <li key={link.href}>
                  <HeaderLink
                    href={link.href}
                    active={isLinkActive(link.href)}
                  >
                    {link.text}
                  </HeaderLink>
                </li>
              ))}
            </ul>
            <div className="pl-2 border-l border-neutral-200 dark:border-neutral-800">
              <DarkModeSwitch />
            </div>
          </div>

          {showMobileNav && (
            <div className="w-full md:hidden pt-4 pb-2 border-t border-neutral-200 dark:border-neutral-800 mt-4">
              <ul className="flex flex-col space-y-1">
                {links.map((link) => (
                  <li key={link.href}>
                    <HeaderLink
                      href={link.href}
                      active={isLinkActive(link.href)}
                    >
                      {link.text}
                    </HeaderLink>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Container>
    </header>
  )
}

export default Header
