import Link from 'next/link'
import BrandName from './BrandName'
import Container from './container'

type HeaderLinkProps = {
  children: string
  href: string
  white?: boolean
}

const HeaderLink = ({ children, href, white }: HeaderLinkProps) => {
  const colorClass = !!white ? 'text-white hover:text-white' : ''
  return (
    <Link href={href}>
      <a className={'font-semibold hover:underline ml-8 ' + colorClass}>
        {children}
      </a>
    </Link>
  )
}

type Props = {
  dark?: boolean
}

const Header = ({ dark }: Props) => {
  const links = [
    { text: 'Posts', href: '/posts' },
    { text: 'Categorías', href: '/categorias' },
    { text: 'Contacto', href: '/contacto' },
  ]

  const colorClass = !!dark ? 'bg-black' : 'bg-white/60 backdrop-blur-md'

  return (
    <header className={'sticky top-0 z-50 ' + colorClass}>
      <Container>
        <div className="flex flex-row items-center justify-between container mx-auto pt-6 pb-6">
          <BrandName white={dark} />
          <div className="hidden md:block">
            {links.map((link) => (
              <HeaderLink href={link.href} white={dark}>
                {link.text}
              </HeaderLink>
            ))}
          </div>
        </div>
      </Container>
    </header>
  )
}

export default Header
