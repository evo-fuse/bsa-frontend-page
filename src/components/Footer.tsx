import { Link } from 'react-router-dom'
import { HiMail } from 'react-icons/hi'
import { FaTwitter, FaDiscord, FaTelegram } from 'react-icons/fa'
import bsaLogo from '../assets/BSA.png'

const Footer = () => {
  return (
    <footer className="bg-[rgb(3,100,200)]/80 border-t border-primary-500/20 py-12 px-6 drop-shadow-light">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 relative drop-shadow-light">
                <img 
                  src={bsaLogo} 
                  alt="BSA AI Logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span className="text-xl font-bold text-white text-glow">BSA</span>
            </div>
            <p className="text-white/70 text-sm">
              Empowering the future of AI with decentralized intelligence.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/70 hover:text-primary-400 transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-white/70 hover:text-cyan-400 transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/tokenomics" className="text-white/70 hover:text-cyan-400 transition-colors duration-300">
                  Tokenomics
                </Link>
              </li>
              <li>
                <Link to="/roadmap" className="text-white/70 hover:text-cyan-400 transition-colors duration-300">
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blogs" className="text-white/70 hover:text-cyan-400 transition-colors duration-300">
                  Blogs
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-white/70 hover:text-cyan-400 transition-colors duration-300">
                  Support
                </Link>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-cyan-400 transition-colors duration-300">
                  Whitepaper
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-cyan-400 transition-colors duration-300">
                  Documentation
                </a>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-white/70 hover:text-cyan-400 transition-colors duration-300 text-2xl">
                <FaTwitter />
              </a>
              <a href="#" className="text-white/70 hover:text-cyan-400 transition-colors duration-300 text-2xl">
                <FaDiscord />
              </a>
              <a href="#" className="text-white/70 hover:text-cyan-400 transition-colors duration-300 text-2xl">
                <FaTelegram />
              </a>
              <a href="#" className="text-white/70 hover:text-cyan-400 transition-colors duration-300 text-2xl">
                <HiMail />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-primary-500/20 pt-8 text-center">
          <p className="text-white/60 text-sm">
            © 2026 BSA AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

