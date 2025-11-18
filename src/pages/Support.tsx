import { HiMail, HiTrendingUp } from 'react-icons/hi'
import { FaDiscord, FaTwitter, FaTelegram } from 'react-icons/fa'
import PageHeader from '../components/PageHeader'

const Support = () => {
  const faqs = [
    {
      question: 'What is BSA?',
      answer:
        'BSA is an AI-powered blockchain network protocol that combines decentralized intelligence with blockchain security. It enables AI-driven smart contracts, decentralized AI model training, and intelligent transaction processing.',
    },
    {
      question: 'How do I participate in the pre-sale?',
      answer:
        'To participate in the pre-sale, click the "Buy Tokens" button on our website, connect your wallet, and follow the instructions. We accept ETH, USDT, and USDC.',
    },
    {
      question: 'What is the token price?',
      answer:
        'The pre-sale price is $0.05 per token. After the pre-sale, the public sale price will be $0.10 per token.',
    },
    {
      question: 'When will the tokens be distributed?',
      answer:
        'Tokens will be distributed immediately after the pre-sale ends. You will receive your tokens in your connected wallet.',
    },
    {
      question: 'Can I stake my tokens?',
      answer:
        'Yes! Once the mainnet launches, you will be able to stake your tokens to earn passive rewards and help secure the network.',
    },
    {
      question: 'What makes BSA different?',
      answer:
        'BSA integrates AI at the protocol level, enabling intelligent automation, adaptive security, and optimized performance that traditional blockchains cannot achieve.',
    },
  ]

  const contactMethods = [
    {
      Icon: HiMail,
      title: 'Email Support',
      description: 'Get help via email',
      contact: 'support@bsa.ai',
    },
    {
      Icon: FaDiscord,
      title: 'Discord Community',
      description: 'Join our Discord server',
      contact: 'discord.gg/bsa',
    },
    {
      Icon: FaTwitter,
      title: 'Twitter',
      description: 'Follow us on Twitter',
      contact: '@BSAAI',
    },
    {
      Icon: FaTelegram,
      title: 'Telegram',
      description: 'Join our Telegram group',
      contact: 't.me/bsa',
    },
  ]

  return (
    <div className="min-h-screen pb-20">
      <PageHeader 
        title="Support & FAQs"
        subtitle="Find answers to common questions and get the help you need"
        height="396px"
      />
      <div className="container mx-auto max-w-6xl">

        {/* Contact Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactMethods.map((method, index) => {
            const IconComponent = method.Icon
            return (
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
                <div className="mt-8 text-center">
                  <div className="flex justify-center mb-4 text-white">
                    <IconComponent className="text-5xl" />
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-white uppercase">{method.title}</h3>
                  <p className="text-white/90 text-sm mb-2">{method.description}</p>
                  <p className="text-white text-sm font-semibold">{method.contact}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* FAQs */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-8 text-white text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
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
                  <h3 className="text-xl font-bold mb-3 text-white uppercase">{faq.question}</h3>
                  <p className="text-white/90 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
          <div className="bg-[rgb(3,100,200)] rounded-xl p-8 shadow-lg relative">
          {/* Icon in bottom-right */}
          <div className="absolute bottom-4 right-4 text-white/60">
            <HiTrendingUp className="text-2xl" />
          </div>
          {/* Content */}
          <div>
            <h2 className="text-3xl font-bold mb-6 text-white text-center uppercase">Get in Touch</h2>
            <form className="max-w-2xl mx-auto space-y-6">
            <div>
              <label className="block text-white mb-2">Name</label>
              <input
                type="text"
                className="w-full bg-white/20 border-2 border-white/50 px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:border-white drop-shadow-light rounded-lg"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-white mb-2">Email</label>
              <input
                type="email"
                className="w-full bg-white/20 border-2 border-white/50 px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:border-white drop-shadow-light rounded-lg"
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label className="block text-white mb-2">Subject</label>
              <input
                type="text"
                className="w-full bg-white/20 border-2 border-white/50 px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:border-white drop-shadow-light rounded-lg"
                placeholder="What can we help you with?"
              />
            </div>
            <div>
              <label className="block text-white mb-2">Message</label>
              <textarea
                rows={6}
                className="w-full bg-white/20 border-2 border-white/50 px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:border-white drop-shadow-light resize-none rounded-lg"
                placeholder="Your message..."
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-8 py-4 text-lg font-semibold transition-all duration-300 hover:from-primary-400 hover:to-primary-500 drop-shadow-light transform hover:scale-105"
              >
                Send Message
              </button>
            </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Support

