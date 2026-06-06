import { Link } from 'react-router-dom'

const HomeBottomText = () => {
  return (
    <div className='font-[font2] flex items-center justify-center gap-2 sm:mb-20'>
      <Link className='text-[5vw] hover:border-[#D3FD50] hover:text-[#D3FD50] leading-[7ww] border-2 border-white rounded-full lg:px-8 py-2 pt-3 uppercase px-4' to={'/projects'}>Projects</Link>
      <Link className='text-[5vw] hover:border-[#D3FD50] hover:text-[#D3FD50] leading-[7ww] border-2 border-white rounded-full lg:px-8 py-2 pt-3 uppercase px-4' to={'/agence'}>Agence</Link>
    </div>
  )
}

export default HomeBottomText