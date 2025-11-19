import PageHeader from '../components/PageHeader'
import { HiTrendingUp } from 'react-icons/hi'

const About = () => {
  const milestones = [
    {
      year: "2023",
      date: "Q1 2023",
      title: "BSA Network Founded",
      description: "BSA Network is founded with a vision to revolutionize blockchain through AI integration."
    },
    {
      year: "2023",
      date: "Aug 2023",
      title: "Token Launch",
      description: "BSA token launches on major exchanges, marking the beginning of our ecosystem."
    },
    {
      year: "2026",
      date: "Jan 2026",
      title: "Mainnet Launch",
      description: "BSA mainnet launches with AI-powered smart contracts and intelligent consensus mechanism."
    },
    {
      year: "2026",
      date: "Jun 2026",
      title: "AI Integration Complete",
      description: "Full AI integration completed, enabling decentralized machine learning and adaptive protocols."
    },
    {
      year: "2026",
      date: "Oct 2026",
      title: "Ecosystem Expansion",
      description: "Major partnerships established, expanding BSA's reach across DeFi, NFTs, and enterprise solutions."
    },
    {
      year: "2025",
      date: "Jan 2025",
      title: "Global Adoption",
      description: "BSA achieves global recognition with 10K+ dApps and 1M+ smart contracts deployed."
    }
  ];

  const beliefs = [
    {
      title: "People deserve an equitable future",
      description: "We are committed to building open-source protocols that give anyone, anywhere the power to create value for people everywhere."
    },
    {
      title: "The community is our backbone",
      description: "We are committed to developing a thriving ecosystem by empowering and investing in developers, partners, community, and users."
    },
    {
      title: "Blockchain will change the world for good",
      description: "We are committed to building protocols, programs, and services that will accelerate the mass adoption of blockchain technology to bring more value to people."
    },
    {
      title: "In AI's transformative power",
      description: "We are committed to integrating artificial intelligence at the core of blockchain technology to create more intelligent, adaptive, and efficient networks."
    }
  ];

  return (
    <div className="min-h-screen pb-20 bg-white">
      <PageHeader 
        title="Creating a more intelligent, secure, and decentralized future"
        subtitle="BSA redistributes the power and value of the internet to its users, by building a network of open source protocols that provide unified liquidity, unlimited scalability and AI-powered intelligence for builders."
        height="396px"
      />
      <div className="container mx-auto max-w-7xl">

        {/* Our Beliefs Section */}
        <div className="mb-24">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-white">Our Beliefs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {beliefs.map((belief, index) => (
              <div key={index} className="bg-[rgb(3,100,200)] rounded-xl p-8 shadow-lg relative">
            {/* Badge - positioned at top-left corner, 3/4 outside card */}
            <div className="absolute -top-5 -left-5 w-10 h-10 bg-[rgb(3,100,200)] rounded-full border-4 border-white flex items-center justify-center z-10">
              <span className="text-white font-bold text-lg">{index + 1}</span>
            </div>
                {/* Icon in bottom-right */}
                <div className="absolute bottom-4 right-4 text-white/60">
                  <HiTrendingUp className="text-2xl" />
                </div>
                {/* Content */}
                <div className="mt-8">
                  <h3 className="text-2xl font-bold mb-4 text-white uppercase">{belief.title}</h3>
                  <p className="text-white/90 leading-relaxed">{belief.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BSA At A Glance Section */}
        <div className="mb-24">
          <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-white">BSA At A Glance</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-[rgb(3,100,200)] rounded-xl p-8 text-center shadow-lg relative">
              {/* Badge */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-[rgb(3,100,200)] rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-white font-bold text-lg">1</span>
              </div>
              {/* Icon in bottom-right */}
              <div className="absolute bottom-4 right-4 text-white/60">
                <HiTrendingUp className="text-2xl" />
              </div>
              {/* Content */}
              <div className="mt-8">
                <div className="text-5xl font-bold text-white mb-3 text-glow">40+</div>
                <div className="text-white/90 text-sm md:text-base">Countries represented</div>
              </div>
            </div>
            <div className="bg-[rgb(3,100,200)] rounded-xl p-8 text-center shadow-lg relative">
              {/* Badge */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-[rgb(3,100,200)] rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-white font-bold text-lg">2</span>
              </div>
              {/* Icon in bottom-right */}
              <div className="absolute bottom-4 right-4 text-white/60">
                <HiTrendingUp className="text-2xl" />
              </div>
              {/* Content */}
              <div className="mt-8">
                <div className="text-5xl font-bold text-white mb-3 text-glow">Remote</div>
                <div className="text-white/90 text-sm md:text-base">First</div>
              </div>
            </div>
            <div className="bg-[rgb(3,100,200)] rounded-xl p-8 text-center shadow-lg relative">
              {/* Badge */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-[rgb(3,100,200)] rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-white font-bold text-lg">3</span>
              </div>
              {/* Icon in bottom-right */}
              <div className="absolute bottom-4 right-4 text-white/60">
                <HiTrendingUp className="text-2xl" />
              </div>
              {/* Content */}
              <div className="mt-8">
                <div className="text-5xl font-bold text-white mb-3 text-glow">10K+</div>
                <div className="text-white/90 text-sm md:text-base">dApps Scaling</div>
              </div>
            </div>
            <div className="bg-[rgb(3,100,200)] rounded-xl p-8 text-center shadow-lg relative">
              {/* Badge */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-[rgb(3,100,200)] rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-white font-bold text-lg">4</span>
              </div>
              {/* Icon in bottom-right */}
              <div className="absolute bottom-4 right-4 text-white/60">
                <HiTrendingUp className="text-2xl" />
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
          <div className="bg-[rgb(3,100,200)] rounded-xl p-6 text-center shadow-lg relative">
            {/* Badge */}
            <div className="absolute top-4 right-4 w-10 h-10 bg-[rgb(3,100,200)] rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-white font-bold text-lg">5</span>
            </div>
            {/* Icon in bottom-right */}
            <div className="absolute bottom-4 right-4 text-white/60">
              <HiTrendingUp className="text-2xl" />
            </div>
            {/* Content */}
            <div className="mt-8">
              <div className="text-4xl font-bold text-white mb-2 text-glow">100M+</div>
              <div className="text-white/90">Total Supply</div>
            </div>
          </div>
          <div className="bg-[rgb(3,100,200)] rounded-xl p-6 text-center shadow-lg relative">
            {/* Badge */}
            <div className="absolute top-4 right-4 w-10 h-10 bg-[rgb(3,100,200)] rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-white font-bold text-lg">6</span>
            </div>
            {/* Icon in bottom-right */}
            <div className="absolute bottom-4 right-4 text-white/60">
              <HiTrendingUp className="text-2xl" />
            </div>
            {/* Content */}
            <div className="mt-8">
              <div className="text-4xl font-bold text-white mb-2 text-glow">50K+</div>
              <div className="text-white/90">Community Members</div>
            </div>
          </div>
          <div className="bg-[rgb(3,100,200)] rounded-xl p-6 text-center shadow-lg relative">
            {/* Badge */}
            <div className="absolute top-4 right-4 w-10 h-10 bg-[rgb(3,100,200)] rounded-full border-2 border-white flex items-center justify-center">
              <span className="text-white font-bold text-lg">7</span>
            </div>
            {/* Icon in bottom-right */}
            <div className="absolute bottom-4 right-4 text-white/60">
              <HiTrendingUp className="text-2xl" />
            </div>
            {/* Content */}
            <div className="mt-8">
              <div className="text-4xl font-bold text-white mb-2 text-glow">99.9%</div>
              <div className="text-white/90">Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About

