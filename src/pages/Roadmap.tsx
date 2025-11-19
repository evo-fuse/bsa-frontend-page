import { useState } from 'react'
import { HiUsers, HiChatAlt2, HiCog, HiTrendingUp, HiGlobe, HiLightningBolt, HiSparkles } from 'react-icons/hi'
import PageHeader from '../components/PageHeader'

interface RoadmapItemProps {
  milestone: {
    phase: string
    title: string
    quarter: string
    keywords: string
    description: string
    details: string[]
    icon: any
  }
  index: number
  IconComponent: any
}

const RoadmapItem = ({ milestone, index, IconComponent }: RoadmapItemProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const isLeft = index % 2 === 0 // Even indices (0, 2, 4...) on left, odd (1, 3, 5...) on right
  
  // Calculate opacity based on step number (higher step = more transparent)
  // Step 1: 1.0, Step 2: 0.92, Step 3: 0.84, Step 4: 0.76, Step 5: 0.68, Step 6: 0.60, Step 7: 0.52
  const opacity = Math.max(0.4, 1.0 - (index * 0.08))
  const baseColor = 'rgb(3,100,200)'
  const colorWithOpacity = `rgba(3, 100, 200, ${opacity})`

  return (
    <div 
      className="w-full relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`flex items-center gap-8 max-h-[320px] ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}>
        {/* Circle Container */}
        <div className="relative flex-shrink-0">
          {/* Background Ring - Half colored, half transparent */}
          <div 
            className="absolute inset-0 pointer-events-none z-0 transition-transform duration-700 ease-in-out"
            style={{ 
              transform: `scale(1.15) ${isHovered ? 'rotate(360deg)' : 'rotate(0deg)'}`,
            }}
          >
            <svg className="w-full h-full" viewBox="0 0 288 288">
              <circle
                cx="144"
                cy="144"
                r="136"
                fill="none"
                stroke={baseColor}
                strokeWidth="16"
                strokeLinecap="round"
                strokeDasharray={`${Math.PI * 136} ${Math.PI * 136}`}
                strokeDashoffset={index % 2 === 0 ? '0' : `${Math.PI * 136}`}
                opacity={opacity * 0.3}
                transform={index % 2 === 0 ? 'rotate(-90 144 144)' : 'rotate(90 144 144)'}
              />
            </svg>
          </div>

          {/* Colored Arc - Half circle border (left or right based on step) */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <svg className="w-full h-full" viewBox="0 0 288 288">
              <path
                d={isLeft 
                  ? "M 144 8 A 136 136 0 0 1 144 280"
                  : "M 144 8 A 136 136 0 0 0 144 280"
                }
                fill="none"
                stroke={baseColor}
                strokeWidth="16"
                strokeLinecap="round"
                opacity={opacity}
              />
            </svg>
          </div>

          {/* Main White Circle */}
          <div 
            className={`relative bg-white rounded-full w-72 h-72 shadow-lg flex flex-col items-center justify-start pt-12 pb-10 px-8 z-10 transition-all duration-500 ease-in-out ${
              isHovered ? 'scale-105 shadow-xl' : 'scale-100'
            }`}
            style={{
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
              boxShadow: isHovered 
                ? `0 20px 25px -5px rgba(0, 0, 0, 0.15), 0 10px 10px -5px rgba(0, 0, 0, 0.1)`
                : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            }}
          >
            {/* Icon at top */}
            <div 
              className="mb-5 transition-all duration-500 ease-in-out"
              style={{ 
                color: colorWithOpacity,
                transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
              }}
            >
              <IconComponent className="text-7xl" />
            </div>
            
            {/* Keywords text */}
            <p 
              className="text-sm leading-relaxed text-center font-semibold transition-all duration-500 ease-in-out"
              style={{ 
                color: colorWithOpacity,
                opacity: isHovered ? 1 : 0.9,
              }}
            >
              {milestone.keywords}
            </p>
          </div>

          {/* Number Badge - Position based on left/right alignment */}
          <div 
            className={`absolute top-1/2 transform -translate-y-1/2 bg-white flex items-center justify-center z-20 transition-all duration-500 ease-in-out ${
              isLeft ? '-right-8' : '-left-8'
            } ${isHovered ? 'scale-110' : 'scale-100'}`}
            style={{ 
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              filter: isHovered 
                ? 'drop-shadow(0 10px 15px rgba(0, 0, 0, 0.3))'
                : 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.2))',
            }}
          >
            <span 
              className="text-4xl font-bold transition-all duration-500 ease-in-out"
              style={{ 
                color: colorWithOpacity,
                transform: isHovered ? 'scale(1.1)' : 'scale(1)',
              }}
            >
              {index + 1}
            </span>
          </div>
        </div>

        {/* Sidebar - Always visible, enhanced shadow on hover */}
        <div className="flex-shrink-0 w-[800px] max-h-[320px]">
          <div 
            className={`bg-white border-2 rounded-xl p-6 transition-all duration-500 ease-in-out h-full relative overflow-hidden ${
              isLeft ? 'ml-4' : 'mr-4'
            } ${isHovered ? 'shadow-2xl translate-y-[-4px]' : 'shadow-lg translate-y-0'}`}
            style={{
              borderColor: isHovered ? colorWithOpacity : baseColor,
              boxShadow: isHovered 
                ? `0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 2px rgba(3, 100, 200, ${opacity * 0.25})`
                : `0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(3, 100, 200, ${opacity * 0.125})`,
            }}
          >
            {/* Date Tag Ribbon - Top Right Corner */}
            <div 
              className="absolute top-0 right-0 w-40 h-40 overflow-hidden z-10"
            >
              <div 
                className="absolute top-0 right-0 w-56 h-11 transform rotate-45 translate-x-12 -translate-y-1 flex items-center justify-center shadow-lg transition-all duration-500 ease-in-out"
                style={{
                  backgroundColor: colorWithOpacity,
                  boxShadow: isHovered 
                    ? `0 4px 8px rgba(3, 100, 200, ${opacity * 0.375})`
                    : `0 2px 4px rgba(3, 100, 200, ${opacity * 0.25})`,
                }}
              >
                <span 
                  className="text-white font-bold text-sm uppercase tracking-wider whitespace-nowrap pl-[48px]"
                >
                  {milestone.quarter}
                </span>
              </div>
            </div>
            <div className="flex flex-col h-full">
              <div className="mb-4 flex-shrink-0">
                <div className="flex items-center justify-between mb-2">
                  <span 
                    className="text-sm font-semibold uppercase tracking-wider"
                    style={{ 
                      color: colorWithOpacity,
                    }}
                  >
                    {milestone.phase}
                  </span>
                </div>
                <h3 
                  className="text-2xl font-bold mb-3 uppercase"
                  style={{ 
                    color: colorWithOpacity,
                  }}
                >
                  {milestone.title}
                </h3>
                {/* Separator Line */}
                <div 
                  className="h-px mb-4"
                  style={{
                    backgroundColor: baseColor,
                    opacity: opacity * 0.3,
                  }}
                />
                <p className="text-gray-700 leading-relaxed text-sm mb-4">
                  {milestone.description}
                </p>
              </div>

              {/* Detailed Items - Horizontal Layout */}
              <div className="flex-1">
                <h4 className="text-base font-semibold mb-3 text-gray-800">
                  Key Milestones:
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  {milestone.details.map((detail, detailIndex) => (
                    <div 
                      key={detailIndex} 
                      className="flex items-start text-gray-700"
                    >
                      <span 
                        className="mr-2 mt-1 text-lg flex-shrink-0"
                        style={{ 
                          color: colorWithOpacity,
                        }}
                      >
                        ▸
                      </span>
                      <span className="leading-relaxed text-sm pt-2">
                        {detail}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const Roadmap = () => {
  const milestones = [
    {
      phase: 'Phase 1',
      title: 'Foundation & Launch',
      quarter: 'Q1 2026',
      keywords: 'Team • Contracts • Pre-Sale • Community',
      description: 'Project conceptualization and team assembly. Smart contract development and auditing. Token pre-sale launch and community building.',
      details: [
        'Project conceptualization and team assembly',
        'Smart contract development and auditing',
        'Token pre-sale launch',
        'Community building and marketing',
      ],
      icon: HiUsers,
    },
    {
      phase: 'Phase 2',
      title: 'Core Development',
      quarter: 'Q2 2026',
      keywords: 'AI Framework • Testnet • Security • Partnerships',
      description: 'AI integration framework development. Testnet deployment and security audits. Partnership announcements and optimizations.',
      details: [
        'AI integration framework development',
        'Testnet deployment',
        'Security audits and optimizations',
        'Partnership announcements',
      ],
      icon: HiChatAlt2,
    },
    {
      phase: 'Phase 3',
      title: 'Mainnet Launch',
      quarter: 'Q3 2026',
      keywords: 'Mainnet • DEX • Staking • Governance',
      description: 'Mainnet deployment and DEX listing. Staking mechanism activation. Governance system launch and network stabilization.',
      details: [
        'Mainnet deployment',
        'DEX listing',
        'Staking mechanism activation',
        'Governance system launch',
      ],
      icon: HiCog,
    },
    {
      phase: 'Phase 4',
      title: 'Ecosystem Expansion',
      quarter: 'Q4 2026',
      keywords: 'SDK • Integrations • AI Features • Expansion',
      description: 'Developer tools and SDK release. Third-party integrations and advanced AI features. Global expansion initiatives.',
      details: [
        'Developer tools and SDK release',
        'Third-party integrations',
        'Advanced AI features',
        'Global expansion initiatives',
      ],
      icon: HiTrendingUp,
    },
    {
      phase: 'Phase 5',
      title: 'Global Adoption',
      quarter: 'Q1 2027',
      keywords: 'International • Multi-Chain • Enterprise • Solutions',
      description: 'International market expansion and partnerships. Multi-chain integration and cross-platform compatibility. Enterprise solutions deployment.',
      details: [
        'International market expansion and partnerships',
        'Multi-chain integration and cross-platform compatibility',
        'Enterprise solutions deployment',
        'Global market penetration',
      ],
      icon: HiGlobe,
    },
    {
      phase: 'Phase 6',
      title: 'Advanced AI Features',
      quarter: 'Q2 2027',
      keywords: 'AI Models • ML • Autonomous • Security',
      description: 'Next-generation AI models integration. Machine learning optimization and autonomous smart contracts. Enhanced security protocols.',
      details: [
        'Next-generation AI models integration',
        'Machine learning optimization',
        'Autonomous smart contracts',
        'Enhanced security protocols',
      ],
      icon: HiLightningBolt,
    },
    {
      phase: 'Phase 7',
      title: 'Future Innovations',
      quarter: '2027+',
      keywords: 'Quantum • Cross-Chain • Marketplace • Dominance',
      description: 'Quantum-resistant cryptography. Advanced cross-chain interoperability. Decentralized AI marketplace and global network dominance.',
      details: [
        'Quantum-resistant cryptography',
        'Advanced cross-chain interoperability',
        'Decentralized AI marketplace',
        'Global network dominance',
      ],
      icon: HiSparkles,
    },
  ]

  return (
    <div className="min-h-screen pb-20 bg-white">
      <PageHeader 
        title="Development Roadmap"
        subtitle="Our journey towards building the future of AI-powered blockchain networks"
        height="396px"
      />
      <div className="container mx-auto max-w-7xl px-6">
        {/* Vertical Layout with Hover Sidebars */}
        <div className="flex flex-col items-start py-16 space-y-9 md:space-y-12">
          {milestones.map((milestone, index) => {
            const IconComponent = milestone.icon
  return (
              <RoadmapItem 
                key={index}
                milestone={milestone}
                index={index}
                IconComponent={IconComponent}
              />
            )
          })}
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <div className="bg-[rgb(3,100,200)] border-2 border-primary-500 p-8 shadow-lg inline-block">
            <h2 className="text-3xl font-semibold mb-4 text-white">Join Us on This Journey</h2>
            <p className="text-white/90 mb-6 max-w-2xl">
              Be part of the revolution. Join our community and stay updated on our progress.
            </p>
            <button className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:from-primary-400 hover:to-primary-500 drop-shadow-light transform hover:scale-105">
              Join Community
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Roadmap

