import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import bsaLogo from '../assets/BSA.png'

const Navbar = () => {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsScrolled(scrollPosition > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path: string) => location.pathname === path

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/tokenomics', label: 'Tokenomics' },
    { path: '/roadmap', label: 'RoadMaps' },
    { path: '/about', label: 'About Us' },
    { path: '/blogs', label: 'Blogs' },
    { path: '/support', label: 'Support' },
  ]

  return (
    <nav 
      className={`fixed z-50 backdrop-blur-md border-b border-primary-500/20 transition-all duration-300 ease-in-out ${
        isScrolled 
          ? 'top-0 left-0 right-0 bg-[rgb(3,100,200)]/80' 
          : 'top-8 left-8 right-8 bg-[rgb(3,100,200)]/50'
      }`}
      style={{
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 6px rgba(0, 0, 0, 0.1)',
        borderRadius: isScrolled ? '0' : '12px',
      }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 relative drop-shadow-light transform transition-transform duration-300 group-hover:scale-110">
              <img 
                src={bsaLogo} 
                alt="BSA AI Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xl md:text-2xl font-bold text-white text-glow">BSA</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 transition-all duration-300 ${
                  isActive(link.path)
                    ? 'text-primary-400 font-semibold drop-shadow-light'
                    : 'text-white hover:text-primary-400'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Buy Tokens Button */}
          <div className="hidden md:block">
            <button className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-2 font-semibold transition-all duration-300 hover:from-primary-400 hover:to-primary-500 drop-shadow-light">
              Buy Tokens
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white hover:text-primary-400 transition-colors duration-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-primary-500/20 pt-4">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2 transition-all duration-300 ${
                    isActive(link.path)
                    ? 'text-white font-semibold drop-shadow-light'
                    : 'text-white/80 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <button className="bg-gradient-to-r from-[rgb(3,100,200)] to-[rgba(3,100,200,0.8)] text-white px-6 py-2 font-semibold transition-all duration-300 hover:from-[rgba(3,100,200,0.9)] hover:to-[rgba(3,100,200,0.7)] drop-shadow-light transform hover:scale-105 w-full text-left">
                Buy Tokens
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar

