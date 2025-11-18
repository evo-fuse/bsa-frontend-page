import { useState, useEffect, useRef } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import CountdownTimer from '../components/CountdownTimer'
import SlideShow from '../components/SlideShow'
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
// Partner/Technology logos

// Custom Tooltip Component for Recharts
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0]
  return (
      <div className="bg-white/95 border-2 border-white rounded-lg p-4 shadow-2xl backdrop-blur-sm">
        <p className="text-[rgb(3,100,200)] font-bold text-lg mb-1">{data.name}</p>
        <p className="text-[rgb(3,100,200)] font-semibold text-base">
          {data.value}% ({Math.round(data.value * 1000000 / 100)}M tokens)
        </p>
      </div>
    )
  }
  return null
}

// Tokenomics Chart Component with Recharts
const TokenomicsChart = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (chartRef.current) {
      observer.observe(chartRef.current)
    }

    return () => {
      if (chartRef.current) {
        observer.unobserve(chartRef.current)
      }
    }
  }, [])

  const tokenDistribution = [
    { name: 'Pre-Sale', value: 35, color: 'rgba(3, 100, 200, 0.65)' },
    { name: 'Liquidity', value: 25, color: 'rgba(3, 100, 200, 0.50)' },
    { name: 'Team', value: 15, color: 'rgba(3, 100, 200, 0.40)' },
    { name: 'Marketing', value: 12, color: 'rgba(3, 100, 200, 0.30)' },
    { name: 'Advisors', value: 8, color: 'rgba(3, 100, 200, 0.20)' },
    { name: 'Reserve', value: 5, color: 'rgba(3, 100, 200, 0.15)' },
  ]

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index)
  }

  const onPieLeave = () => {
    setActiveIndex(null)
  }

  return (
    <div 
      ref={chartRef}
      className={`relative w-[800px] h-[800px] md:w-[1000px] md:h-[1000px] flex-shrink-0 transition-all duration-1000 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
      }`}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
                    <defs>
            {tokenDistribution.map((_, index) => (
              <filter key={`glow-${index}`} id={`glow-${index}`}>
                        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
            ))}
                    </defs>
          <Pie
            data={tokenDistribution}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={false}
            outerRadius={280}
            innerRadius={140}
            fill="#8884d8"
            dataKey="value"
            startAngle={90}
            endAngle={-270}
            animationBegin={isVisible ? 0 : undefined}
            animationDuration={2000}
            animationEasing="ease-out"
            onMouseEnter={onPieEnter}
            onMouseLeave={onPieLeave}
          >
            {tokenDistribution.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={entry.color}
                stroke="rgba(255, 255, 255, 1)"
                strokeWidth={activeIndex === index ? 6 : 4}
                style={{
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  filter: activeIndex === index ? `url(#glow-${index})` : undefined,
                }}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      {/* Center Circle with Text - Overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative">
          <div 
            className="rounded-full border-4 border-white"
                    style={{
              width: '280px',
              height: '280px',
              backgroundColor: 'rgba(3, 100, 200, 0.95)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)',
            }}
          >
            <div className="text-white text-3xl md:text-4xl font-bold drop-shadow-lg mb-2">
              Total
            </div>
            <div className="text-white text-2xl md:text-3xl drop-shadow-lg">
              100M
                  </div>
              </div>
            </div>
          </div>
        </div>
  )
}

const Home = () => {
  return (
    <div className="min-h-screen relative w-full overflow-x-hidden">
      {/* Full Screen Slide Show - Takes up entire viewport */}
      <SlideShow />
      
      {/* Content Sections - Positioned after slideshow */}
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-[rgb(3,100,200)]/95 w-full max-w-full overflow-x-hidden">
        <div className="container mx-auto max-w-7xl relative z-10">
          {/* Badge */}
          <div className="mb-6 text-center">

        </div>

          {/* Introduction and Timer in One Line */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
            {/* Left - Introduction */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white text-shadow-glow leading-tight">
                What is AI-Chain Protocol?
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-6 leading-relaxed">
                AI-Chain Protocol, inspired by Bitcoin and Ethereum, is a state-of-the-art Layer 1 blockchain 
                that plans to make AI-powered decentralized intelligence accessible for all. With a go-to-market 
                strategy, our goal is to advance the crypto industry by blending the best of existing blockchain 
                technologies with groundbreaking speed, flexibility, and innovation.
              </p>
            </div>

            {/* Right - Presale Timer */}
            <div className="flex flex-col items-center lg:items-end">
              <div className="text-white/80 mb-4">
                {/* <p className="mb-4 text-center lg:text-right font-semibold text-lg">Pre-Sale Ends in:</p> */}
                <div className="flex justify-center lg:justify-end overflow-visible">
                  <CountdownTimer />
              </div>
            </div>
              </div>
            </div>

          {/* Stats and Buttons */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left - Raised Amount */}
            <div className="bg-white/20 border-2 border-white p-6 glow-cyan border-pulse relative">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-white mb-2">$2.5M+ Million Raised</div>
                <p className="text-white/80 text-sm">Join the presale and see your contribution grow</p>
                </div>
                  </div>

            {/* Right - Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-end">
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
      <section className="py-20 bg-white relative w-full max-w-full overflow-x-hidden">
        <div className="container mx-auto max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[rgb(3,100,200)] text-shadow-glow">
            The Numbers Don't Lie
              </h2>
          <p className="text-xl text-center text-[rgb(3,100,200)]/70 mb-16">
            AI-Chain Protocol is rewriting the rules of crypto
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-[rgb(3,100,200)] rounded-xl p-6 text-center shadow-lg">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2 text-glow">50K+</div>
              <div className="text-white/90 text-sm">Holders and Counting</div>
              <div className="text-white/80 text-xs mt-2">Growing daily</div>
            </div>
            <div className="bg-[rgb(3,100,200)] rounded-xl p-6 text-center shadow-lg">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2 text-glow">$2.5M+</div>
              <div className="text-white/90 text-sm">Raised</div>
              <div className="text-white/80 text-xs mt-2">Presale ongoing</div>
            </div>
            <div className="bg-[rgb(3,100,200)] rounded-xl p-6 text-center shadow-lg">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2 text-glow">25K+</div>
              <div className="text-white/90 text-sm">Community Members</div>
              <div className="text-white/80 text-xs mt-2">Across 80+ countries</div>
            </div>
            <div className="bg-[rgb(3,100,200)] rounded-xl p-6 text-center shadow-lg">
              <div className="text-3xl md:text-4xl font-bold text-white mb-2 text-glow">99.9%</div>
              <div className="text-white/90 text-sm">Uptime</div>
              <div className="text-white/80 text-xs mt-2">Network reliability</div>
            </div>
          </div>
            </div>
      </section>

      {/* Why Choose AI-Chain Protocol Section */}
      <section className="py-20 bg-[rgb(3,100,200)]/95 relative w-full max-w-full overflow-x-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left - Enhanced 3D Cube with Connected Spheres */}
            <div className="flex justify-center perspective-2000 order-2 lg:order-1">
              <div className="relative w-80 h-80">
                {/* Central 3D Cube */}
                <div 
                  className="relative w-64 h-64 mx-auto"
                  style={{ 
                    transformStyle: 'preserve-3d',
                    transform: 'rotateX(25deg) rotateY(-25deg)',
                  }}
                >
                  {/* Front face */}
                  <div 
                    className="absolute w-48 h-48 bg-gradient-to-br from-white/40 to-white/30 border-2 border-white glow-cyan left-1/2 top-1/2 backface-hidden"
                    style={{ 
                      transform: 'translate(-50%, -50%) translateZ(60px)',
                    }}
                  >
                    <div className="p-4 h-full flex flex-col justify-center items-center text-white">
                      <div className="text-sm font-semibold mb-2 text-shadow-glow">AI Enhanced</div>
                      <div className="text-xs text-center">Security</div>
                    </div>
                  </div>
                  {/* Top face */}
                  <div 
                    className="absolute w-48 h-48 bg-gradient-to-br from-white/50 to-white/40 border-2 border-white glow-cyan left-1/2 top-1/2 backface-hidden"
                    style={{ 
                      transform: 'translate(-50%, -50%) rotateX(90deg) translateZ(60px)',
                    }}
                  >
                    <div className="p-4 h-full flex flex-col justify-center items-center text-white">
                      <div className="text-sm font-semibold mb-2 text-shadow-glow">AI Engine</div>
                      <div className="text-xs text-center">Processor</div>
                    </div>
                  </div>
                  {/* Right face */}
                  <div 
                    className="absolute w-48 h-48 bg-gradient-to-br from-white/30 to-white/20 border-2 border-white glow-cyan left-1/2 top-1/2 backface-hidden"
                    style={{ 
                      transform: 'translate(-50%, -50%) rotateY(90deg) translateZ(60px)',
                    }}
                  >
                    <div className="p-4 h-full flex flex-col justify-center items-center text-white">
                      <div className="text-sm font-semibold mb-2 text-shadow-glow">Network</div>
                      <div className="text-xs text-center">Outputs</div>
                    </div>
                  </div>
                  {/* Bottom face */}
                  <div 
                    className="absolute w-48 h-48 bg-gradient-to-br from-white/20 to-white/10 border-2 border-white glow-cyan left-1/2 top-1/2 backface-hidden"
                    style={{ 
                      transform: 'translate(-50%, -50%) rotateX(-90deg) translateZ(60px)',
                    }}
                  >
                    <div className="p-4 h-full flex flex-col justify-center items-center text-white">
                      <div className="text-sm font-semibold mb-2 text-shadow-glow">Mechanical</div>
                      <div className="text-xs text-center">Security</div>
                    </div>
                  </div>
                </div>

                {/* Connected Spheres */}
                {[
                  { x: 0, y: 0, label: 'AI Engine\nProcessor', angle: -45 },
                  { x: 100, y: -50, label: 'Network\nOutputs', angle: 0 },
                  { x: 0, y: 100, label: 'Mechanical\nSecurity', angle: 45 },
                  { x: -100, y: -50, label: 'AI Enhanced\nSecurity', angle: 180 },
                ].map((sphere, i) => (
                  <div
                    key={i}
                    className="absolute"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `translate(calc(-50% + ${sphere.x}px), calc(-50% + ${sphere.y}px))`,
                    }}
                  >
                    {/* Connection Line */}
                    <svg
                      className="absolute"
                      width="200"
                      height="200"
                      style={{
                        left: `${sphere.x > 0 ? -100 : sphere.x < 0 ? 100 : 0}px`,
                        top: `${sphere.y > 0 ? -100 : sphere.y < 0 ? 100 : 0}px`,
                        transform: 'translate(-50%, -50%)',
                      }}
                    >
                      <line
                        x1="100"
                        y1="100"
                        x2={100 + sphere.x}
                        y2={100 + sphere.y}
                        stroke="currentColor"
                        strokeWidth="2"
                        className="text-white/50"
                      />
                    </svg>
                    {/* Sphere */}
                    <div className="relative">
                      <div className="w-20 h-20 bg-gradient-to-br from-white/50 to-white/30 border-2 border-white glow-cyan">
                        <div className="w-full h-full flex flex-col items-center justify-center text-white text-xs font-semibold text-center p-2">
                          {sphere.label.split('\n').map((line, idx) => (
                            <div key={idx}>{line}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right - Text */}
            <div className="order-1 lg:order-2">
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



      {/* Core Features Section */}
      <section className="py-20 bg-white relative w-full max-w-full overflow-x-hidden">
        <div className="container mx-auto max-w-7xl">
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
                className="h-full bg-[rgb(3,100,200)] rounded-xl p-8 shadow-lg hover-lift"
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
                className="bg-[rgb(3,100,200)] rounded-xl p-8 shadow-lg hover-lift"
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
                className="bg-[rgb(3,100,200)] rounded-xl p-6 shadow-lg hover-lift"
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
                className="bg-[rgb(3,100,200)] rounded-xl p-6 shadow-lg hover-lift"
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
                className="bg-[rgb(3,100,200)] rounded-xl p-6 shadow-lg hover-lift"
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

      {/* Tokenomics & Statistics Section */}
      <section className="py-8 bg-[rgb(3,100,200)]/95 relative w-full max-w-full overflow-x-hidden">
        <div className="container mx-auto max-w-7xl">
          <div className="w-full">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white text-shadow-glow text-center">
              Tokenomics & Statistics
              </h2>
              
            <div className="flex items-center justify-center overflow-visible">
              <TokenomicsChart />
            </div>
          </div>
              </div>
      </section>

      {/* Powered By Section */}
      <section className="py-20 bg-[rgb(15,30,60)] relative w-full max-w-full overflow-x-hidden">
        <div className="container mx-auto max-w-7xl">
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
    </div>
  )
}

export default Home
