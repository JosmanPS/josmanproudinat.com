import Footer from './footer'
import Header from './header'
import Meta from './meta'

type Props = {
  preview?: boolean
  headerDark?: boolean
  children: React.ReactNode
}

const Layout = ({ preview, children, headerDark }: Props) => {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <Header dark={headerDark} />
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}

export default Layout
