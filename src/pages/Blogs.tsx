import { useState } from 'react'
import bsaLogo from '../assets/BSA.png'
import PageHeader from '../components/PageHeader'
import AnimatedSection from '../components/AnimatedSection'
import { HiTrendingUp } from 'react-icons/hi'

const Blogs = () => {
  const [activeTab, setActiveTab] = useState('Entries')

  const blogPosts = [
    {
      id: 1,
      title: "Introducing BSA AI Protocol 2.0: Beyond 50K TPS with AI-Enhanced Finality",
      author: 'BSA AI',
      date: 'December 15',
      excerpt: "Today, the BSA AI team is excited to announce Protocol 2.0, a major upgrade that leverages artificial intelligence to achieve unprecedented transaction speeds while maintaining the highest security standards. This breakthrough represents a significant leap forward in",
      thumbnail: {
        bgColor: 'bg-[rgb(3,100,200)]/60',
        title: 'Protocol 2.0',
        subtitle: 'BSA AI',
        pattern: 'geometric'
      },
      collected: 8
    },
    {
      id: 2,
      title: 'AI-Enhanced Smart Contracts: The Future of Decentralized Intelligence',
      author: 'BSA AI',
      date: 'December 10',
      excerpt: "BSA AI's revolutionary smart contract system uses machine learning to optimize gas efficiency and execution speed. Our AI-powered contracts can adapt to network conditions in real-time, reducing costs by up to 40% while maintaining full compatibility with",
      thumbnail: {
        bgColor: 'bg-[rgb(3,100,200)]',
        title: 'AI Smart Contracts',
        subtitle: 'Innovation',
        pattern: 'dark'
      },
      collected: 12
    },
    {
      id: 3,
      title: 'Building the Decentralized AI Ecosystem: A Developer\'s Guide',
      author: 'BSA AI',
      date: 'December 05',
      excerpt: "Developers are discovering the power of BSA AI's decentralized AI infrastructure. This comprehensive guide explores how to build AI-powered dApps, leverage federated learning networks, and create intelligent smart contracts that learn and adapt. Whether you're building",
      thumbnail: {
        bgColor: 'bg-[rgb(3,100,200)]',
        title: 'Developer Guide',
        subtitle: 'Ecosystem',
        pattern: 'dark'
      },
      collected: 15
    },
    {
      id: 4,
      title: 'AI-Powered Consensus: Revolutionizing Blockchain Security',
      author: 'BSA AI',
      date: 'November 28',
      excerpt: 'BSA AI introduces an AI-enhanced consensus mechanism that adapts to network threats in real-time. Our machine learning algorithms continuously analyze network patterns, detect anomalies, and prevent attacks before they occur, creating a self-healing blockchain infrastructure.',
      thumbnail: {
        bgColor: 'bg-[rgb(3,100,200)]/60',
        title: 'AI Consensus',
        subtitle: 'Security',
        pattern: 'geometric'
      },
      collected: 18
    },
    {
      id: 5,
      title: 'Federated Learning on Blockchain: Privacy-Preserving AI',
      author: 'BSA AI',
      date: 'November 15',
      excerpt: 'Discover how BSA AI enables federated learning on the blockchain, allowing multiple parties to train AI models collaboratively without sharing raw data. This breakthrough technology ensures data privacy while unlocking the collective intelligence of decentralized networks.',
      thumbnail: {
        bgColor: 'bg-[rgb(3,100,200)]',
        title: 'Federated Learning',
        subtitle: 'Privacy',
        pattern: 'dark'
      },
      collected: 22
    },
    {
      id: 6,
      title: 'BSA Token Economics: Incentivizing AI Contribution',
      author: 'BSA AI',
      date: 'November 01',
      excerpt: 'Our tokenomics model rewards network participants for contributing computational resources, data, and AI models. Learn how BSA tokens create a sustainable economy that incentivizes innovation while ensuring fair distribution of rewards across the ecosystem.',
      thumbnail: {
        bgColor: 'bg-[rgb(3,100,200)]/60',
        title: 'Token Economics',
        subtitle: 'Incentives',
        pattern: 'geometric'
      },
      collected: 14
    },
    {
      id: 7,
      title: 'Interoperability Protocol: Connecting AI Blockchains',
      author: 'BSA AI',
      date: 'October 20',
      excerpt: 'BSA AI\'s interoperability protocol enables seamless communication between different AI-powered blockchains. Our cross-chain AI bridge allows models and data to flow securely between networks, creating a unified ecosystem of decentralized intelligence.',
      thumbnail: {
        bgColor: 'bg-[rgb(3,100,200)]',
        title: 'Interoperability',
        subtitle: 'Protocol',
        pattern: 'dark'
      },
      collected: 11
    },
    {
      id: 8,
      title: 'AI-Enhanced Security Auditing: Automated Vulnerability Detection',
      author: 'BSA AI',
      date: 'October 05',
      excerpt: 'Our AI-powered security auditing system automatically scans smart contracts for vulnerabilities, reducing audit time by 90% while improving detection rates. This technology helps developers build more secure applications and protects users from potential exploits.',
      thumbnail: {
        bgColor: 'bg-[rgb(3,100,200)]/60',
        title: 'AI Security Audit',
        subtitle: 'Automation',
        pattern: 'geometric'
      },
      collected: 19
    },
    {
      id: 9,
      title: 'The Future of Decentralized AI: Roadmap to 2025',
      author: 'BSA AI',
      date: 'September 25',
      excerpt: 'Explore BSA AI\'s vision for the future of decentralized artificial intelligence. From quantum-resistant cryptography to autonomous AI agents, discover how we\'re building the infrastructure for the next generation of intelligent blockchain applications.',
      thumbnail: {
        bgColor: 'bg-[rgb(3,100,200)]',
        title: 'Future Vision',
        subtitle: 'Roadmap',
        pattern: 'dark'
      },
      collected: 25
    },
  ]

  return (
    <div className="min-h-screen pb-20 bg-white">
      <PageHeader height="396px" />

      <AnimatedSection animation="fadeIn">
        <div className="container mx-auto max-w-7xl px-6 relative z-10">
        {/* Circular Logo and Profile Section */}
        <div className="flex flex-col items-center mb-8 -mt-28 relative z-10">
          {/* Circular Logo */}
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[rgb(3,100,200)] to-blue-900 flex items-center justify-center mb-4 shadow-lg border-4 border-white overflow-hidden">
            <img 
              src={bsaLogo} 
              alt="BSA AI Logo" 
              className="w-20 h-20 object-contain"
            />
          </div>
          
          {/* Name and Identifier */}
          <h1 className="text-4xl font-bold text-gray-900 mb-1">BSA AI</h1>
          
          {/* Description */}
          <p className="text-lg text-gray-700 mb-6 max-w-3xl text-center">
            The AI-powered blockchain network: an ever expanding decentralized intelligence platform, secured by advanced cryptography and machine learning.
          </p>
          
          {/* Links */}
          <div className="flex items-center justify-center gap-4 text-sm mb-8">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              <a href="#" className="text-primary-500 hover:text-primary-600 transition-colors">
                bsa-ai.io
              </a>
            </div>
            <a href="#" className="text-primary-500 hover:text-primary-600 transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
              </svg>
            </a>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center justify-center gap-8 border-b border-gray-200 pb-4 w-full">
            <button
              onClick={() => setActiveTab('Entries')}
              className={`text-base font-medium transition-colors ${
                activeTab === 'Entries'
                  ? 'text-gray-900 border-b-2 border-primary-500 pb-2'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Entries
            </button>
            <button
              onClick={() => setActiveTab('Collection')}
              className={`text-base font-medium transition-colors ${
                activeTab === 'Collection'
                  ? 'text-gray-900 border-b-2 border-primary-500 pb-2'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              Collection
            </button>
          </div>
        </div>

        {/* Subscription Section */}
          <div className="bg-[rgb(3,100,200)] rounded-xl p-8 mb-12 shadow-lg relative">
          {/* Badge - positioned at top-left corner, 3/4 outside card */}
          <div className="absolute -top-5 -left-5 w-10 h-10 bg-[rgb(3,100,200)] rounded-full border-4 border-white flex items-center justify-center z-10">
            <span className="text-white font-bold text-lg">1</span>
          </div>
          {/* Icon in bottom-right */}
          <div className="absolute bottom-4 right-4 text-white/60">
            <HiTrendingUp className="text-2xl" />
          </div>
          {/* Content */}
          <div className="mt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-2 uppercase">Subscribe to BSA AI</h2>
              <p className="text-white/90">Receive the latest updates directly to your inbox.</p>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter email address"
                className="flex-1 md:w-80 px-4 py-3 bg-white/20 border-2 border-white/50 rounded-lg focus:outline-none focus:border-white text-white placeholder-white/60"
              />
              <button className="bg-white text-[rgb(3,100,200)] px-6 py-3 rounded-lg font-medium hover:bg-white/90 transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-transparent border-2 border-[rgb(3,100,200)] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer relative"
            >
              {/* Thumbnail */}
              <div className={`${post.thumbnail.bgColor} h-48 relative p-6 flex flex-col justify-between overflow-hidden backdrop-blur-sm`}>
                {post.thumbnail.pattern === 'geometric' && (
                  <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border-4 border-white/40 rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-4 border-white/40 rounded-full"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-4 border-white/40 rounded-full"></div>
                  </div>
                )}
                <div className="relative z-10">
                  <div className="text-xs font-semibold text-white/80 mb-2">BSA AI</div>
                </div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-1 text-white">
                    {post.thumbnail.title}
                  </h3>
                  {post.thumbnail.subtitle && (
                    <p className="font-medium text-primary-300">
                      {post.thumbnail.subtitle}
                    </p>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h2 className="text-lg font-bold text-[rgb(3,100,200)] mb-3 line-clamp-2 uppercase">
                  {post.title}
                </h2>
                <div className="flex items-center gap-2 text-sm text-[rgb(3,100,200)]/80 mb-3">
                  <span>{post.author}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
                <p className="text-[rgb(3,100,200)]/90 text-sm mb-4 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between pt-4 border-t border-[rgb(3,100,200)]/20">
                  <div className="flex items-center gap-2 text-sm text-[rgb(3,100,200)]/80">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    <span>{post.collected} Collected</span>
                  </div>
                  <button className="text-[rgb(3,100,200)] hover:text-[rgb(3,100,200)]/80 font-medium text-sm transition-colors border-2 border-[rgb(3,100,200)]/50 px-3 py-1 rounded-lg">
                    Read More
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
        </div>
      </AnimatedSection>
    </div>
  )
}

export default Blogs

