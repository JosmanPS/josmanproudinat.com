import Link from 'next/link'
import { useEffect, useState } from 'react'
import useCurrentTheme from '../hooks/useCurrentTheme'
import BrandName from './BrandName'
import Container from './container'
import DarkModeSwitch from './DarkModeSwitch'

type HeaderLinkProps = {
  children: any
  href: string
  white?: boolean
}

const HeaderLink = ({ children, href, white }: HeaderLinkProps) => {
  const colorClass = !!white ? 'text-white hover:text-white' : ''
  return (
    <Link href={href}>
      <a
        className={'block py-2 pr-4 pl-3 md:p-0 hover:underline ' + colorClass}
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
  const [darkMode, setDarkMode] = useState(false)

  const [currentTheme, setTheme] = useCurrentTheme()

  const links = [
    { text: 'Posts', href: '/posts' },
    { text: 'Categorías', href: '/categorias' },
    { text: 'Contacto', href: '/contacto' },
  ]

  useEffect(() => {
    const theme = !!dark ? 'dark' : currentTheme
    setDarkMode(theme === 'dark')
  }, [currentTheme])

  const colorClass = !!darkMode ? 'bg-black' : 'bg-white/60 backdrop-blur-md'

  const ToggleButton = () => (
    <button
      data-collapse-toggle="mobile-menu"
      type="button"
      className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      aria-controls="mobile-menu"
      aria-expanded="false"
      onClick={() => setShowMobileNav(!showMobileNav)}
    >
      <span className="sr-only">Open main menu</span>
      <svg
        className="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
          clipRule="evenodd"
        ></path>
      </svg>
      <svg
        className="hidden w-6 h-6"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clipRule="evenodd"
        ></path>
      </svg>
    </button>
  )

  return (
    <nav className={'sticky top-0 z-50 ' + colorClass}>
      <Container>
        <div className="container flex flex-wrap justify-between items-center mx-auto pt-6 pb-6">
          <BrandName white={dark} />
          <div className='flex flex-row'>
            <DarkModeSwitch />
            <ToggleButton />
          </div>
          <div className="hidden w-full md:block md:w-auto" id="mobile-menu">
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium items-center">
              <DarkModeSwitch />
              {links.map((link) => (
                <li key={link.href}>
                  <HeaderLink href={link.href} white={dark}>
                    {link.text}
                  </HeaderLink>
                </li>
              ))}
            </ul>
          </div>
          {showMobileNav && (
            <div className="w-full md:hidden" id="mobile-menu">
              <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
                {links.map((link) => (
                  <li>
                    <HeaderLink href={link.href} white={dark}>
                      {link.text}
                    </HeaderLink>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Container>
    </nav>
  )
}

export default Header
