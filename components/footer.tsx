import Container from './container'
import { EXAMPLE_PATH } from '../lib/constants'
import BrandName from './BrandName'

const Footer = () => {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <Container>
        <div className="py-12 flex flex-col lg:flex-row items-center lg:justify-between">
          <BrandName />
          <div></div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
