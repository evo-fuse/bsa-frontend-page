import PageHeader from '../components/PageHeader'
import AnimatedSection from '../components/AnimatedSection'
import LinesAnimation from '../components/LinesAnimation'
import aboutUsImage from '../assets/pages/about_us.jpg'
import thumbnail1 from '../assets/thumbnails/1.jpg'
import thumbnail2 from '../assets/thumbnails/2.jpg'
import thumbnail3 from '../assets/thumbnails/3.jpg'
import thumbnail4 from '../assets/thumbnails/4.jpg'

const About = () => {
  const thumbnails = [thumbnail1, thumbnail2, thumbnail3, thumbnail4]
  
  const beliefs = [
    {
      title: "People deserve an equitable future",
      description: "We are committed to building open-source protocols that give anyone, anywhere the power to create value for people everywhere through decentralized technology."
    },
    {
      title: "The community is our backbone",
      description: "We are committed to developing a thriving ecosystem by empowering and investing in developers, partners, community members, and users worldwide."
    },
    {
      title: "Blockchain will change the world",
      description: "We are committed to building protocols, programs, and services that will accelerate the mass adoption of blockchain technology to bring more value to people."
    },
    {
      title: "In AI's transformative power",
      description: "We are committed to integrating artificial intelligence at the core of blockchain technology to create more intelligent, adaptive, and efficient networks."
    }
  ];

  return (
    <div className="min-h-screen pb-20 bg-white relative">
      <LinesAnimation />
      <PageHeader 
        title="Creating a more intelligent, secure, and decentralized future"
        subtitle="BSA redistributes the power and value of the internet to its users, by building a network of open source protocols that provide unified liquidity, unlimited scalability and AI-powered intelligence for builders."
        height="396px"
        backgroundImage={aboutUsImage}
      />
      <AnimatedSection animation="fadeIn">
        <div className="container mx-auto max-w-7xl">

        {/* Our Beliefs Section */}
        <div className="mb-24">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-[rgb(3,100,200)]">Our Beliefs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {beliefs.map((belief, index) => (
              <div 
                key={index} 
                className={`h-full p-8 shadow-lg relative animate-slide-up flex flex-col ${index === 0 ? 'animate-delay-100' : index === 1 ? 'animate-delay-200' : index === 2 ? 'animate-delay-300' : 'animate-delay-400'}`}
                style={{
                  backgroundImage: `url(${thumbnails[index]})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  minHeight: '320px',
                }}
              >
                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-[rgb(3,100,200)]/80 z-0" style={{ overflow: 'hidden' }}></div>
                {/* Badge - positioned at top-left corner, 3/4 outside card */}
                <div 
                  className="absolute -top-5 -left-5 w-10 h-10 bg-[rgb(3,100,200)] rounded-full border-4 border-white flex items-center justify-center z-10"
                  style={{
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3), 0 2px 6px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  <span className="text-white font-bold text-lg">{index + 1}</span>
                </div>
                {/* Content */}
                <div className="mt-8 relative z-10 flex-1 flex flex-col" style={{ overflow: 'hidden' }}>
                  <h3 className="text-2xl font-bold mb-3 text-white uppercase">{belief.title}</h3>
                  {/* Separator Line */}
                  <div className="h-px mb-4 bg-white/30"></div>
                  <p className="text-white/90 leading-relaxed flex-1">{belief.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BSA At A Glance Section */}
        <div className="mb-24">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-[rgb(3,100,200)]">BSA At A Glance</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-[rgb(3,100,200)] p-8 text-center shadow-lg relative">
              {/* Badge */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-[rgb(3,100,200)] rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-white font-bold text-lg">1</span>
              </div>
              {/* Content */}
              <div className="mt-8">
                <div className="text-5xl font-bold text-white mb-3 text-glow">40+</div>
                <div className="text-white/90 text-sm md:text-base">Countries represented</div>
              </div>
            </div>
            <div className="bg-[rgb(3,100,200)] p-8 text-center shadow-lg relative">
              {/* Badge */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-[rgb(3,100,200)] rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-white font-bold text-lg">2</span>
              </div>
              {/* Content */}
              <div className="mt-8">
                <div className="text-5xl font-bold text-white mb-3 text-glow">Remote</div>
                <div className="text-white/90 text-sm md:text-base">First</div>
              </div>
            </div>
            <div className="bg-[rgb(3,100,200)] p-8 text-center shadow-lg relative">
              {/* Badge */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-[rgb(3,100,200)] rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-white font-bold text-lg">3</span>
              </div>
              {/* Content */}
              <div className="mt-8">
                <div className="text-5xl font-bold text-white mb-3 text-glow">10K+</div>
                <div className="text-white/90 text-sm md:text-base">dApps Scaling</div>
              </div>
            </div>
            <div className="bg-[rgb(3,100,200)] p-8 text-center shadow-lg relative">
              {/* Badge */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-[rgb(3,100,200)] rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-white font-bold text-lg">4</span>
              </div>
              {/* Content */}
              <div className="mt-8">
                <div className="text-5xl font-bold text-white mb-3 text-glow">1M+</div>
                <div className="text-white/90 text-sm md:text-base">Deployed Smart Contracts</div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-[rgb(3,100,200)] p-6 text-center shadow-lg relative">
            {/* Badge */}
            <div className="absolute top-4 right-4 w-10 h-10 bg-[rgb(3,100,200)] rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-white font-bold text-lg">5</span>
            </div>
            {/* Content */}
            <div className="mt-8">
              <div className="text-4xl font-bold text-white mb-2 text-glow">100M+</div>
              <div className="text-white/90">Total Supply</div>
            </div>
          </div>
          <div className="bg-[rgb(3,100,200)] p-6 text-center shadow-lg relative">
            {/* Badge */}
            <div className="absolute top-4 right-4 w-10 h-10 bg-[rgb(3,100,200)] rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-white font-bold text-lg">6</span>
            </div>
            {/* Content */}
            <div className="mt-8">
              <div className="text-4xl font-bold text-white mb-2 text-glow">50K+</div>
              <div className="text-white/90">Community Members</div>
            </div>
          </div>
          <div className="bg-[rgb(3,100,200)] p-6 text-center shadow-lg relative">
            {/* Badge */}
            <div className="absolute top-4 right-4 w-10 h-10 bg-[rgb(3,100,200)] rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-white font-bold text-lg">7</span>
            </div>
            {/* Content */}
            <div className="mt-8">
              <div className="text-4xl font-bold text-white mb-2 text-glow">99.9%</div>
              <div className="text-white/90">Uptime</div>
            </div>
          </div>
        </div>
        </div>
      </AnimatedSection>
    </div>
  )
}

export default About

