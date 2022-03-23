import Link from 'next/link'
import BrandName from './BrandName'

const Header = () => {
  return (
    <header className='sticky top-0 z-50 bg-white/60 backdrop-blur-md'>
      <div className='container max-w-4xl mx-auto pt-6 pb-6'>
        <BrandName />
      </div>
    </header>
  )
}

export default Header
