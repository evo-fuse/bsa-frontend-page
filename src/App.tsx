import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Blogs from './pages/Blogs'
import Tokenomics from './pages/Tokenomics'
import Roadmap from './pages/Roadmap'
import Support from './pages/Support'

function App() {
  return (
    <div className="min-h-screen flex flex-col relative w-full overflow-x-hidden">
      {/* Background overlay for better text readability */}
      {/* <div className="fixed inset-0 bg-[rgb(3,100,200)]/20 pointer-events-none z-0"></div> */}
      
      <div className="relative z-10 w-full">
        <Navbar />
        <main className="flex-grow w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tokenomics" element={<Tokenomics />} />
            <Route path="/roadmap" element={<Roadmap />} />
            <Route path="/about" element={<About />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/support" element={<Support />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default App
