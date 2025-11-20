import backgroundImage from '../assets/background.png'

interface PageHeaderProps {
  title?: string
  subtitle?: string
  height?: string
  backgroundImage?: string
}

const PageHeader = ({ title, subtitle, height = '396px', backgroundImage: customBackgroundImage }: PageHeaderProps) => {
  const bgImage = customBackgroundImage || backgroundImage
  
  return (
    <div 
      className="w-full relative mb-16"
      style={{
        height: height,
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-[rgb(3,100,200)]/80 to-purple-800/80"></div>
      {title && (
        <div className="container mx-auto px-6 h-full flex items-center relative z-10">
          <div className="text-center w-full">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{title}</h1>
            {subtitle && (
              <p className="text-xl text-white/90 max-w-3xl mx-auto">{subtitle}</p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default PageHeader

