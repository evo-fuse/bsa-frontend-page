import CountdownTimer from '../components/CountdownTimer'
import SlideShow from '../components/SlideShow'
import AnimatedSection from '../components/AnimatedSection'
import { HiShieldCheck, HiCog, HiGlobe, HiCode } from 'react-icons/hi'
import { FaBrain } from 'react-icons/fa'
// Exchange logos
import binanceLogo from '../assets/icons/binance.png'
import ethereumLogo from '../assets/icons/ethereum.png'
import tetherLogo from '../assets/icons/tether.png'
import trustLogo from '../assets/icons/trust.png'
import googleLogo from '../assets/icons/google.png'
import geminiLogo from '../assets/icons/gemini.png'
import telegramLogo from '../assets/icons/telegram.png'
import aiChainImage from '../assets/ai-chain.png'
// Partner/Technology logos

const Home = () => {
  return (
    <div className="min-h-screen relative w-full overflow-x-hidden">
      {/* Full Screen Slide Show - Takes up entire viewport */}
      <SlideShow />
      
      {/* Content Sections - Positioned after slideshow */}
      {/* About AI-Chain Protocol Section */}
      <AnimatedSection animation="slideUp">
        <section className="relative pt-32 pb-20 bg-white w-full max-w-full overflow-x-hidden min-h-[75vh] flex items-center">
          <div className="container mx-auto max-w-7xl relative z-10 w-full">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-[rgb(3,100,200)] text-shadow-glow leading-tight text-center">
                What is AI-Chain Protocol?
              </h1>
              <p className="text-lg md:text-xl text-[rgb(3,100,200)]/80 mb-6 leading-relaxed text-center">
                AI-Chain Protocol, inspired by Bitcoin and Ethereum, is a state-of-the-art Layer 1 blockchain 
                that plans to make AI-powered decentralized intelligence accessible for all. With a go-to-market 
                strategy, our goal is to advance the crypto industry by blending the best of existing blockchain 
                technologies with groundbreaking speed, flexibility, and innovation.
              </p>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Token Presale Timer Section */}
      <section className="relative py-20 bg-[rgb(3,100,200)] w-full max-w-full overflow-x-hidden min-h-[75vh] flex items-center">
        <div className="container mx-auto max-w-7xl relative z-10 w-full">
          <div className="flex flex-col items-center gap-8">
            {/* Top - Raised Amount */}
            <div className="bg-white/20 border-2 border-white p-6 glow-cyan border-pulse relative w-full max-w-md">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-2">$2.5M+ Million Raised</div>
                <p className="text-white/90 text-sm">Join the presale and see your contribution grow</p>
              </div>
            </div>

            {/* Middle - Presale Timer */}
            <div className="flex flex-col items-center">
              <div className="text-white mb-4">
                <div className="flex justify-center overflow-visible">
                  <CountdownTimer />
                </div>
              </div>
            </div>

            {/* Bottom - Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-[rgb(3,100,200)] px-8 py-4 text-lg font-bold transition-all duration-300 hover:bg-white/90 glow-cyan hover-lift active:scale-95">
                Buy Now
              </button>
              <button className="bg-white/20 border-2 border-white text-white px-8 py-4 text-lg font-bold transition-all duration-300 hover:bg-white/30 hover:border-white/80 glow-cyan hover-lift active:scale-95">
                How to Buy?
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - The Numbers Don't Lie */}
      <AnimatedSection animation="slideUp" delay={100}>
        <section className="py-20 bg-white relative w-full max-w-full overflow-x-hidden min-h-[75vh] flex items-center">
        <div className="container mx-auto max-w-7xl w-full">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[rgb(3,100,200)] text-shadow-glow">
            The Numbers Don't Lie
              </h2>
          <p className="text-xl text-center text-[rgb(3,100,200)]/70 mb-16">
            AI-Chain Protocol is rewriting the rules of crypto
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-[rgb(3,100,200)] p-6 text-center shadow-lg">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2 text-glow">50K+</div>
              <div className="text-white/90 text-sm">Holders and Counting</div>
              <div className="text-white/80 text-xs mt-2">Growing daily</div>
            </div>
            <div className="bg-[rgb(3,100,200)] p-6 text-center shadow-lg">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2 text-glow">$2.5M+</div>
              <div className="text-white/90 text-sm">Raised</div>
              <div className="text-white/80 text-xs mt-2">Presale ongoing</div>
            </div>
            <div className="bg-[rgb(3,100,200)] p-6 text-center shadow-lg">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2 text-glow">25K+</div>
              <div className="text-white/90 text-sm">Community Members</div>
              <div className="text-white/80 text-xs mt-2">Across 80+ countries</div>
            </div>
            <div className="bg-[rgb(3,100,200)] p-6 text-center shadow-lg">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2 text-glow">99.9%</div>
              <div className="text-white/90 text-sm">Uptime</div>
              <div className="text-white/80 text-xs mt-2">Network reliability</div>
            </div>
          </div>
            </div>
      </section>

      {/* Why Choose AI-Chain Protocol Section */}
      <section 
        className="py-20 relative w-full max-w-full overflow-x-hidden min-h-[75vh] flex items-center"
        style={{ 
          backgroundImage: `url(${aiChainImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-[rgb(3,100,200)]/80"></div>
        <div className="container mx-auto max-w-7xl relative z-10 w-full">
          <div className="grid grid-cols-1 gap-16 items-center">
            {/* Text Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white text-shadow-glow">
                Why Choose AI-Chain Protocol?
              </h2>
              <p className="text-white/80 leading-relaxed mb-4">
                AI-Chain Protocol represents the next evolution in blockchain technology, seamlessly integrating
                artificial intelligence at the protocol level to create a truly intelligent and adaptive network.
              </p>
              <p className="text-white/80 leading-relaxed mb-4">
                Our revolutionary platform combines the security and transparency of blockchain with the learning
                capabilities of AI, enabling self-optimizing smart contracts, intelligent transaction routing,
                and adaptive security protocols that evolve with emerging threats.
              </p>
              <p className="text-white/80 leading-relaxed mb-6">
                Built on a foundation of decentralized intelligence, AI-Chain Protocol empowers developers and
                users with unprecedented capabilities while maintaining the core principles of blockchain technology.
              </p>
              <div className="flex gap-4">
                <button className="bg-white text-[rgb(3,100,200)] px-6 py-3 font-semibold transition-all duration-300 hover:bg-white/90">
                  Explore
                </button>
                <button className="bg-white/20 border-2 border-white text-white px-6 py-3 font-semibold transition-all duration-300 hover:bg-white/30 hover:border-white/80">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
        </section>
      </AnimatedSection>

      {/* Core Features Section */}
      <AnimatedSection animation="fadeIn" delay={200}>
        <section className="py-20 bg-white relative w-full max-w-full overflow-x-hidden min-h-[75vh] flex items-center">
        <div className="container mx-auto max-w-7xl w-full">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[rgb(3,100,200)] text-shadow-glow">
            Core Attributes
          </h2>
          <p className="text-xl text-center text-[rgb(3,100,200)]/70 mb-16">
            Built for speed, security, and scalability
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left - Large Vertical Rectangle */}
            <div className="lg:col-span-1 lg:row-span-2">
              <div
                className="h-full bg-[rgb(3,100,200)] p-8 shadow-lg hover-lift"
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex justify-center mb-4 text-white drop-shadow-light">
                    <HiCog className="text-7xl" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-semibold mb-3 text-white text-center">Lightning Fast</h3>
                  <p className="text-white/90 text-center leading-relaxed">Process thousands of transactions per second, outpacing traditional blockchains.</p>
                </div>
              </div>
            </div>

            {/* Top Right - Wide Horizontal Rectangle */}
            <div className="lg:col-span-3">
              <div
                className="bg-[rgb(3,100,200)] p-8 shadow-lg hover-lift"
              >
                <div className="flex items-center gap-6">
                  <div className="flex-shrink-0">
                    <HiGlobe className="text-7xl text-white drop-shadow-light" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-semibold mb-3 text-white">Decentralized</h3>
                    <p className="text-white/90 leading-relaxed">Our hybrid proof-of-work consensus mechanism ensures an extremely high degree of decentralization.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Right - Three Smaller Rectangles */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div
                className="bg-[rgb(3,100,200)] p-6 shadow-lg hover-lift"
              >
                <div className="flex flex-col items-center">
                  <div className="flex justify-center mb-4 text-white drop-shadow-light">
                    <HiShieldCheck className="text-6xl" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2 text-white text-center">Secure</h3>
                  <p className="text-white/90 text-center leading-relaxed text-sm">Advanced cryptography ensures unparalleled network security and data integrity.</p>
                </div>
              </div>

              <div
                className="bg-[rgb(3,100,200)] p-6 shadow-lg hover-lift"
              >
                <div className="flex flex-col items-center">
                  <div className="flex justify-center mb-4 text-white drop-shadow-light">
                    <HiCode className="text-6xl" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2 text-white text-center">EVM Compatible</h3>
                  <p className="text-white/90 text-center leading-relaxed text-sm">Seamless interoperability with Ethereum's ecosystem.</p>
                </div>
              </div>

              <div
                className="bg-[rgb(3,100,200)] p-6 shadow-lg hover-lift"
              >
                <div className="flex flex-col items-center">
                  <div className="flex justify-center mb-4 text-white drop-shadow-light">
                    <FaBrain className="text-6xl" />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2 text-white text-center">AI-Powered</h3>
                  <p className="text-white/90 text-center leading-relaxed text-sm">Intelligent smart contracts that learn and adapt to optimize performance.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        </section>
      </AnimatedSection>

      {/* Powered By Section */}
      <AnimatedSection animation="slideUp" delay={100}>
        <section className="py-20 bg-[rgb(3,100,200)] relative w-full max-w-full overflow-x-hidden min-h-[75vh] flex items-center">
        <div className="container mx-auto max-w-7xl w-full">
          {/* POWERED BY */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
              POWERED BY
            </h2>
            
            {/* Animated Logo Rows - 2 Rows */}
            <div className="space-y-0 mb-8">
              {/* Row 1 - Scrolling Left */}
              <div className="overflow-hidden">
                <div className="flex animate-scroll gap-12">
                  {[
                    { name: 'Binance', logo: binanceLogo, symbol: 'BN' },
                    { name: 'Ethereum', logo: ethereumLogo, symbol: 'ETH' },
                    { name: 'Tether', logo: tetherLogo, symbol: 'USDT' },
                    { name: 'Trust Wallet', logo: trustLogo, symbol: 'TW' },
                  ].map((exchange, i) => (
                    <div key={i} className="flex-shrink-0 w-[153.6px] h-[153.6px] flex items-center justify-center">
                      <img
                        src={exchange.logo}
                        alt={`${exchange.name} logo`}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                          const fallback = target.nextElementSibling as HTMLElement
                          if (fallback) {
                            fallback.style.display = 'flex'
                          }
                        }}
                      />
                      <div className="text-white font-bold text-2xl text-center absolute inset-0 flex items-center justify-center hidden">
                        {exchange.symbol}
                </div>
                </div>
                  ))}
                  {/* Duplicate for seamless loop */}
                  {[
                    { name: 'Binance', logo: binanceLogo, symbol: 'BN' },
                    { name: 'Ethereum', logo: ethereumLogo, symbol: 'ETH' },
                    { name: 'Tether', logo: tetherLogo, symbol: 'USDT' },
                    { name: 'Trust Wallet', logo: trustLogo, symbol: 'TW' },
                  ].map((exchange, i) => (
                    <div key={`dup-${i}`} className="flex-shrink-0 w-[153.6px] h-[153.6px] flex items-center justify-center">
                      <img
                        src={exchange.logo}
                        alt={`${exchange.name} logo`}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                          const fallback = target.nextElementSibling as HTMLElement
                          if (fallback) {
                            fallback.style.display = 'flex'
                          }
                        }}
                      />
                      <div className="text-white font-bold text-2xl text-center absolute inset-0 flex items-center justify-center hidden">
                        {exchange.symbol}
                </div>
              </div>
                  ))}
                  {/* Third duplicate for extra seamless flow */}
                  {[
                    { name: 'Binance', logo: binanceLogo, symbol: 'BN' },
                    { name: 'Ethereum', logo: ethereumLogo, symbol: 'ETH' },
                    { name: 'Tether', logo: tetherLogo, symbol: 'USDT' },
                    { name: 'Trust Wallet', logo: trustLogo, symbol: 'TW' },
                  ].map((exchange, i) => (
                    <div key={`dup2-${i}`} className="flex-shrink-0 w-[153.6px] h-[153.6px] flex items-center justify-center">
                      <img
                        src={exchange.logo}
                        alt={`${exchange.name} logo`}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                          const fallback = target.nextElementSibling as HTMLElement
                          if (fallback) {
                            fallback.style.display = 'flex'
                          }
                        }}
                      />
                      <div className="text-white font-bold text-2xl text-center absolute inset-0 flex items-center justify-center hidden">
                        {exchange.symbol}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Row 2 - Scrolling Right (Reverse) */}
              <div className="overflow-hidden -mt-8">
                <div className="flex animate-scroll-reverse gap-12">
                  {[
                    { name: 'Google', logo: googleLogo, symbol: 'G' },
                    { name: 'Gemini', logo: geminiLogo, symbol: 'GM' },
                    { name: 'Telegram', logo: telegramLogo, symbol: 'TG' },
                  ].map((exchange, i) => (
                    <div key={i} className="flex-shrink-0 w-[153.6px] h-[153.6px] flex items-center justify-center">
                      <img
                        src={exchange.logo}
                        alt={`${exchange.name} logo`}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                          const fallback = target.nextElementSibling as HTMLElement
                          if (fallback) {
                            fallback.style.display = 'flex'
                          }
                        }}
                      />
                      <div className="text-white font-bold text-2xl text-center absolute inset-0 flex items-center justify-center hidden">
                        {exchange.symbol}
              </div>
            </div>
                  ))}
                  {/* Duplicate for seamless loop */}
                  {[
                    { name: 'Google', logo: googleLogo, symbol: 'G' },
                    { name: 'Gemini', logo: geminiLogo, symbol: 'GM' },
                    { name: 'Telegram', logo: telegramLogo, symbol: 'TG' },
                  ].map((exchange, i) => (
                    <div key={`dup2-${i}`} className="flex-shrink-0 w-[153.6px] h-[153.6px] flex items-center justify-center">
                      <img
                        src={exchange.logo}
                        alt={`${exchange.name} logo`}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                          const fallback = target.nextElementSibling as HTMLElement
                          if (fallback) {
                            fallback.style.display = 'flex'
                          }
                        }}
                      />
                      <div className="text-white font-bold text-2xl text-center absolute inset-0 flex items-center justify-center hidden">
                        {exchange.symbol}
                      </div>
                      </div>
                  ))}
                  {/* Third duplicate for extra seamless flow */}
                  {[
                    { name: 'Google', logo: googleLogo, symbol: 'G' },
                    { name: 'Gemini', logo: geminiLogo, symbol: 'GM' },
                    { name: 'Telegram', logo: telegramLogo, symbol: 'TG' },
                  ].map((exchange, i) => (
                    <div key={`dup3-${i}`} className="flex-shrink-0 w-[153.6px] h-[153.6px] flex items-center justify-center">
                      <img
                        src={exchange.logo}
                        alt={`${exchange.name} logo`}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = 'none'
                          const fallback = target.nextElementSibling as HTMLElement
                          if (fallback) {
                            fallback.style.display = 'flex'
                          }
                        }}
                      />
                      <div className="text-white font-bold text-2xl text-center absolute inset-0 flex items-center justify-center hidden">
                        {exchange.symbol}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        </section>
      </AnimatedSection>
    </div>
  )
}

export default Home
