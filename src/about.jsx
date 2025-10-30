import React, { useState } from 'react';
import { useNavigate, Routes, Route, Link } from 'react-router-dom';
import './index.css';
import Home from './App';

function About() {
  return (
    <Routes>
      <Route path="/" element={<AboutLayout />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}


function AboutLayout() {
  const navigate = useNavigate();
  function handleExploreClick(){
    navigate('/explore')
  }

  function handlesurpriseMeClick(){
    navigate('/surpriseMe')
  }
  function handleHomeClick(){
    navigate('/Home')
  }
  function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-zinc-900 text-white px-4 py-6 relative">
      <div className="max-w-6xl mx-auto flex justify-center sm:justify-between items-center relative">

        {/* Title */}
        <button onClick={()=>navigate('/')}>
          <h1 className="text-2xl font-bold text-center sm:text-left w-full sm:w-auto flex items-center">
            🎬 Movie Finder
            <span className="text-xs bg-red-500 text-white px-3 py-1 rounded-full ml-3">Beta</span>
          </h1>
        </button>
        

        {/* Hamburger menu */}
        <div className="absolute right-4 sm:static flex items-center gap-4">
          {/* Desktop Nav */}
          <Nav />

          <button
            className="sm:hidden text-white text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <nav className="flex flex-col items-center text-center gap-4 mt-4 px-4 sm:hidden mx-auto w-full">
          <button onClick={()=>navigate('/home')} className="hover:underline">Home</button>
        </nav>
      )}
    </header>
  );
}

function Nav() {
  console.log('App loaded!!!')
  return (
    <nav className="hidden sm:flex flex-row gap-6 text-lg text-right">
      <button onClick={()=>navigate('/home')} className="hover:underline">Home</button>
    </nav>
  );
}





  function Body() {
  return (
    <main className="bg-zinc-800 text-white py-20 px-4 flex-grow">
        <div class="max-w-3xl mx-auto my-12 px-6">
        {/* Box */}
          <div class="bg-zinc-900 text-white p-8 rounded-2xl shadow-lg">
            {/* Title */}
            <h1 class="text-3xl font-bold mb-4">About Me</h1>
        
            {/* Text */}
            <p class="mb-4">
              Hey there! This is <strong>What Should I Watch</strong> chill little web app for discovering what to watch without hustle. 🍿
            </p>
            <p class="mb-4">
              Built with <strong>React</strong> and <strong>Tailwind CSS</strong>, this project is all about making movie discovery fast and effortless.
            </p>
            <p class="mb-6">
              This project is <strong>open source</strong>. Feel free to check out the source code, drop a star ⭐, or contribute!!!
            </p>
            {/* Github */}
            <a
              href="https://github.com/Gokulprasad33/What-Should-I-Watch" 
              target="_blank" // Open in next tab
              rel="noopener noreferrer"
              class="inline-block bg-white text-zinc-900 font-semibold px-5 py-3 rounded-lg hover:bg-gray-200 transition"
            >
              Open in GitHub ↗
            </a>
          </div>
        </div>

    </main>
  );
}


  function Footer() {
    return (
      <footer className="bg-zinc-900 text-gray-400 py-6 text-center px-4">
        <div className="max-w-4xl mx-auto">
          <p>© 2025 Movie Finder. Built with ❤️ By <a href="https://github.com/Gokulprasad33" target="_blank" rel="noopener noreferrer"><strong>Gokul</strong></a></p>
        </div>
      </footer>
    );
  }

  return (
    <>
      <div className='min-h-screen flex flex-col'>
        <Header />
        <Body/>
        <Footer />
      </div>
    </>
  );
}

export default About;