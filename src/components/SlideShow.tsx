import { useState, useEffect } from 'react'
import slide1 from '../assets/slide/slide1.jpg'
import slide2 from '../assets/slide/slide2.jpg'
import slide3 from '../assets/slide/slide3.jpg'
import slide4 from '../assets/slide/slide4.jpg'

const SlideShow = () => {
  const slides = [slide1, slide2, slide3, slide4]
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <div 
      className="relative w-full h-screen overflow-hidden"
      style={{
        width: '100%',
        height: '100vh',
      }}
    >
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${slide})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            height: '100%',
          }}
        />
      ))}
    </div>
  )
}

export default SlideShow

