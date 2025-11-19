import { useState, useEffect, useRef } from 'react'
import { HiLockClosed, HiLightningBolt, HiTrendingUp } from 'react-icons/hi'
import PageHeader from '../components/PageHeader'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

const Tokenomics = () => {
  const [isVisible, setIsVisible] = useState(false)
  const chartRef = useRef<HTMLDivElement>(null)
  const tokenDistribution = [
    { name: 'Pre-Sale & Pool', value: 30, color: '#1e3a8a' }, // Dark Blue
    { name: 'Liquidity Pool', value: 25, color: '#06b6d4' }, // Cyan/Light Blue
    { name: 'Marketing', value: 10, color: '#10b981' }, // Green
    { name: 'Team & Advisors', value: 15, color: '#ef4444' }, // Red
    { name: 'Team & Advisors', value: 15, color: '#a855f7' }, // Purple
    { name: 'Ecosystem Dev', value: 20, color: '#eab308' }, // Yellow
  ]

  // Custom label renderer for pie chart
  const renderCustomLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize={12}
        fontWeight="600"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border-2 border-primary-500 rounded-lg p-4 shadow-lg">
          <p className="font-semibold text-gray-900 mb-1">{payload[0].name}</p>
          <p className="text-[rgb(3,100,200)] font-bold text-lg">{payload[0].value}%</p>
        </div>
      )
    }
    return null
  }

  const tokenDetails = [
    { label: 'Total Supply', value: '100,000,000', unit: 'CNT' },
    { label: 'Pre-Sale Price', value: '$0.05', unit: 'per token' },
    { label: 'Public Sale Price', value: '$0.10', unit: 'per token' },
    { label: 'Accepted Currencies', value: 'ETH, USDT, USDC', unit: '' },
  ]

  // Intersection Observer for scroll animation
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

  return (
    <div className="min-h-screen pb-20 bg-white">
      <PageHeader 
        title="Tokenomics & Distribution"
        subtitle="Transparent token distribution and economic model designed for long-term sustainability"
        height="396px"
      />
      <div className="container mx-auto max-w-6xl">

        {/* Token Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {tokenDetails.map((detail, index) => (
            <div
              key={index}
              className="bg-[rgb(3,100,200)] rounded-xl p-6 shadow-lg relative"
            >
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
                <h3 className="text-white font-bold text-lg uppercase mb-2">{detail.label}</h3>
                <p className="text-white/90 text-sm leading-relaxed">{detail.value} {detail.unit}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Distribution Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16 items-center">
          {/* Left Group - First 3 bars */}
          <div className="bg-transparent rounded-xl p-8">
            <div className="space-y-6">
              {tokenDistribution.slice(0, 3).map((item, index) => {
                const total = tokenDistribution.reduce((sum, i) => sum + i.value, 0)
                const percentage = (item.value / total) * 100
                return (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[rgb(3,100,200)] font-semibold text-base">{item.name}</span>
                      <span className="text-[rgb(3,100,200)] font-bold text-lg">{item.value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden drop-shadow-light">
                      <div
                        className="h-full transition-all duration-1000 rounded-full"
                        style={{ 
                          width: `${percentage}%`,
                          backgroundColor: item.color,
                          boxShadow: `0 2px 4px rgba(0, 0, 0, 0.2)`,
                        }}
                      ></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Center - Pie Chart Visualization */}
          <div className="bg-transparent rounded-xl p-8">
            <h2 className="text-2xl font-semibold mb-6 text-[rgb(3,100,200)] text-center uppercase">Token Distribution</h2>
            <div 
              ref={chartRef}
              className={`relative w-full h-96 mx-auto transition-all duration-1000 ${
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
                    label={renderCustomLabel}
                    outerRadius={140}
                    innerRadius={60}
                    fill="#8884d8"
                    dataKey="value"
                    animationBegin={isVisible ? 0 : undefined}
                    animationDuration={1500}
                    animationEasing="ease-out"
                  >
                    {tokenDistribution.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={entry.color}
                        stroke="#ffffff"
                        strokeWidth={3}
                        style={{
                          filter: `url(#glow-${index})`,
                          transition: 'all 0.3s ease',
                        }}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right Group - Last 3 bars */}
          <div className="bg-transparent rounded-xl p-8">
            <div className="space-y-6">
              {tokenDistribution.slice(3, 6).map((item, index) => {
                const total = tokenDistribution.reduce((sum, i) => sum + i.value, 0)
                const percentage = (item.value / total) * 100
                return (
                  <div key={index + 3}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[rgb(3,100,200)] font-semibold text-base">{item.name}</span>
                      <span className="text-[rgb(3,100,200)] font-bold text-lg">{item.value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden drop-shadow-light">
                      <div
                        className="h-full transition-all duration-1000 rounded-full"
                        style={{ 
                          width: `${percentage}%`,
                          backgroundColor: item.color,
                          boxShadow: `0 2px 4px rgba(0, 0, 0, 0.2)`,
                        }}
                      ></div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Token Utility */}
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-8 text-[rgb(3,100,200)] text-center">Token Utility</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[rgb(3,100,200)] rounded-xl p-6 shadow-lg relative">
              {/* Badge */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-[rgb(3,100,200)] rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-white font-bold text-lg">1</span>
              </div>
              {/* Icon in bottom-right */}
              <div className="absolute bottom-4 right-4 text-white/60">
                <HiLockClosed className="text-2xl" />
              </div>
              {/* Content */}
              <div className="mt-8">
                <h3 className="text-white font-bold text-lg uppercase mb-2">Governance</h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  Vote on protocol upgrades and participate in network decisions
                </p>
              </div>
            </div>
            <div className="bg-[rgb(3,100,200)] rounded-xl p-6 shadow-lg relative">
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
                <h3 className="text-white font-bold text-lg uppercase mb-2">Staking Rewards</h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  Earn passive income by staking tokens and securing the network
                </p>
              </div>
            </div>
            <div className="bg-[rgb(3,100,200)] rounded-xl p-6 shadow-lg relative">
              {/* Badge */}
              <div className="absolute top-4 right-4 w-10 h-10 bg-[rgb(3,100,200)] rounded-full border-2 border-white flex items-center justify-center">
                <span className="text-white font-bold text-lg">3</span>
              </div>
              {/* Icon in bottom-right */}
              <div className="absolute bottom-4 right-4 text-white/60">
                <HiLightningBolt className="text-2xl" />
              </div>
              {/* Content */}
              <div className="mt-8">
                <h3 className="text-white font-bold text-lg uppercase mb-2">Transaction Fees</h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  Use tokens to pay for network transactions and AI services
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Pre-Sale Info */}
        <div className="bg-[rgb(3,100,200)] border-2 border-primary-500 p-8 shadow-lg">
          <div className="text-center">
            <h2 className="text-3xl font-semibold mb-4 text-white">Join the Pre-Sale</h2>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Secure your tokens at the exclusive pre-sale price of $0.05 per token. Limited time offer!
            </p>
            <button className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:from-primary-400 hover:to-primary-500 drop-shadow-light ">
              Participate in Pre-Sale Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Tokenomics
