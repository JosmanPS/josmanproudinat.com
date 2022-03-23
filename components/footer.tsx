import { FaTwitter, FaInstagram } from 'react-icons/fa'
import Container from './container'
import BrandName from './BrandName'
import CircleIcon from './CircleIcon'

const Footer = () => {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <Container>
        <div className="py-12 flex flex-col lg:flex-row items-center lg:justify-between">
          <div className='mb-4'>
           <BrandName />
          </div>
          <div>
            <CircleIcon
              href={`https://twitter.com/JosmanProudinat`}
              title={`Twitter @JosmanProudinat`}
              marginRight
            >
              <FaTwitter />
            </CircleIcon>
            <CircleIcon
              href={`https://instagram.com/JosmanProudinat`}
              title={`Instagram @JosmanProudinat`}
            >
              <FaInstagram />
            </CircleIcon>
          </div>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
