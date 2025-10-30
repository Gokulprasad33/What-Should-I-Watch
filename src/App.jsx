import { useNavigate } from 'react-router-dom';
import { useState, useEffect, use } from 'react';
import { Routes, Route } from 'react-router-dom';
import './index.css';
import About from './about';


function App() {
  return (
    <Routes>
    <Route path="/" element={<SurpriseMeLayout />} />
    <Route path="/about" element={<About />} />
    <Route path="*" element={<SurpriseMeLayout />} />
    </Routes>

  );
} 

function SurpriseMeLayout() {
  const [loading,setLoading]=useState(false);
  const [showError,setShowError]=useState(false);
  const [errorMessage,setErrorMessage]=useState("No result found")
  const [showResults,setShowResults]=useState(false)
  const [cardNum,setCardNum]=useState(0)
  const [data, setData] = useState([]);
  const [currentCardData, setCurrentCardData] = useState(null);
  const [resultLen, setResultLen] = useState();
  const [blockedMovies,setBlockedMovies] = useState([])
  const [watchList,setWatchList] = useState([])
  const [showMovieDetail,setshowMovieDetail] = useState(false)   
  const [showServerStatus,setServerStatus]=useState(false)
  let blockId=0;
  let watchListId=0;

  
  const navigate = useNavigate();

  // Storing user preference
  const [userPreference, setUserPreference] = useState({
    genre: "",
    year: "",
    language: "",
    nsfw:"False",
    toprated:"False",
    blockedMovie:blockedMovies,
    watchLists:watchList
  });

  // Fetching data
  const handleSearch = async()=>{
    setShowResults(false)
    setLoading(true)
    setShowError(false)
    if (
      userPreference.genre === "" &&
      userPreference.language === "" &&
      userPreference.year === ""
    ){
      setErrorMessage("Choose your options ! ! !")
      setShowError(true);
      setLoading(false)
      return;
    }

    try{
      setLoading(true)
      // Sending request
      const backend_url=import.meta.env.VITE_RENDER_BACKEND_LINK;
      const response = await fetch(`${backend_url}/api/suggest-a-movie`, { 
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        genre: userPreference.genre,
        language: userPreference.language,
        releaseyear: userPreference.year,
        nsfw: userPreference.nsfw,
        toprated: userPreference.toprated,
        blockedMovies:userPreference.blockedMovie,
        watchList:userPreference.watchLists
      })});
      const result = await response.json();
      if(response.status !== 200 || result.length === 0) {
        setErrorMessage("No Result Found")
        setShowResults(false)
        setShowError(true)
        setLoading(false)
      }else {
        setResultLen(result.length)
        setData(result);               
        setCardNum(0);
        setShowResults(true);
        setLoading(false)
      }
    }catch(err){
      console.log(err)
    }finally{
      setLoading(false)
    }
  }
  const handleCard = ()=>{
    if (!data || data.length === 0) return;    

    const currentCard=data[cardNum]
    if (!currentCard) return;
    const cardData = {
      title: currentCard.title,
      poster_id: currentCard.poster_path,
      runtime: currentCard.runtime,
      original_name:currentCard.original_title,
      budget:currentCard.budget,
      imbd_id:currentCard.imdb_id,
      id:currentCard.id,
      home_page:currentCard.homepage,
      rating: Math.round(currentCard.vote_average * 10)/10,
      adult: currentCard.adult, 
      backdrop_path: currentCard.backdrop_path,
      genres: currentCard.genres,
      keywords: currentCard.keywords,
      original_language: currentCard.original_language,
      spoken_languages: currentCard.spoken_languages,
      overview: currentCard.overview,
      popularity: currentCard.popularity,
      production_companies: currentCard.production_companies,
      production_countries: currentCard.production_countries,
      release_date: currentCard.release_date,
      release_year: Math.round(currentCard.release_year),
      revenue: currentCard.revenue,
      status: currentCard.status,
      tagline: currentCard.tagline,
      title_clean: currentCard.title_clean,
      vote_average: currentCard.vote_average,
      vote_count: currentCard.vote_count,
      poster_image : `https://image.tmdb.org/t/p/w1280${currentCard.poster_path}`,
      thumbnail: `https://image.tmdb.org/t/p/w1280${currentCard.backdrop_path}`,
    };
    setLoading(false)
    setCurrentCardData(cardData);
  };

  useEffect(() => {
  if (data.length > 0) {
    handleCard();
  }
}, [cardNum, data]); // Run every time cardNum or data changes


useEffect(()=>{
  const url=import.meta.env.VITE_RENDER_BACKEND_LINK;
  const initiate=async() =>{
    try {
      const response =await fetch(`${url}/api/initiate`, {
        method:"POST",
        headers:{
          "Content-Type": "application/json"
        }
      });
      const Status=await response.json();
      console.log("Status response:", Status);
      if(Status.status === true) {
        setServerStatus(true);
      }else{
        setServerStatus(false);
      }
    }catch(error) {
      setServerStatus(false);
    }
  };

  initiate();
}, []);


const language_map = {ta: 'Tamil',en: 'English',ko: 'Korean',ja: 'Japanese',hi: 'Hindi',it: 'Italian',pt: 'Portuguese',es: 'Spanish',zh: 'Chinese',lv: 'Latvian',fr: 'French',tr: 'Turkish',ru: 'Russian',ar: 'Arabic',sv: 'Swedish',de: 'German',da: 'Danish',fa: 'Persian',th: 'Thai',hu: 'Hungarian',bn: 'Bengali',pl: 'Polish',nl: 'Dutch',el: 'Greek',sr: 'Serbian',te: 'Telugu',uk: 'Ukrainian',id: 'Indonesian',ro: 'Romanian',no: 'Norwegian',cs: 'Galician',ga: 'Irish Gaelic',bs: 'Bosnian',fi: 'Finnish',is: 'Icelandic',ml: 'Malayalam',la: 'Latin',tn: 'Tswana',km: 'Khmer',he: 'Hebrew',eu: 'Basque',lt: 'Lithuanian'};

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
          <button onClick={()=>navigate('/about')} className="hover:underline">About</button>
        </nav>
      )}
    </header>
  );
}

function Nav() {
  const navigate = useNavigate();
  return (
    <nav className="hidden sm:flex flex-row gap-6 text-lg text-right">
      <button onClick={()=>navigate('/about')} className="hover:underline">About</button>
    </nav>
  );
}





  function Body() {
  // Strong preferences
  
  const languages_list = ['Tamil','English','Japanese','Italian','Portuguese','Spanish','Chinese','Latvian','French','Turkish','Malayalam','Hindi','Telugu','Korean','Russian','Arabic','Swedish','German','Danish','Persian','Thai','Hungarian','Bengali','Polish','Dutch','Estonian','Serbian','Ukrainian','Serbo-Croatian','Indonesian','Greek','Romanian','Norwegian','Galician','Czech','Irish Gaelic','Bosnian','Finnish','Icelandic','Latin','Tswana','Khmer','Hebrew','Basque','Lithuanian']
  return (
  <main className="bg-zinc-800 text-white py-10 px-4 flex-grow">
    <h2 className="text-3xl sm:text-5xl font-extrabold mb-10 text-center pt-20">
      🎬 Discover a Movie
    </h2>
    <div className='p-6 border-2 border-gray-600 shadow-2xl mx-auto max-w-2xl rounded-2xl bg-zinc-700'>
      <h3 className='text-2xl font-semibold text-white mb-6 text-center'>Choose your preferences</h3>

      <div className='flex flex-col gap-6'>

        {/* Genre Filter */}
        <div className='relative'>
          <h4 className='text-lg mb-2'>Genre</h4>
          <button id='genre-choose-button'
            onClick={() => {
              const dropDown = document.getElementById('genre-dropdown');
              dropDown.classList.toggle('hidden');
            }}
            className='bg-zinc-500 text-white px-4 py-2 rounded-md w-full text-left'
          >
            {userPreference.genre ? `Genre: ${userPreference.genre}` : "Choose Genre"} 
            {/* If  userPreference.genre has some value it returns first userPreference.genre else Choose genre  */}
          </button>
          <div id='genre-dropdown' className='hidden absolute mt-2 w-full bg-white text-black rounded-md shadow-md z-20 max-h-60 overflow-y-auto'>
            {['Action','Adventure','Animation','Comedy','Crime','Documentary','Drama','Family','Fantasy','History','Horror','Music','Mystery','Romance','Science Fiction','TV Movie','Thriller','War','Western'].map(item => (
              <p
              key={item}
              onClick={()=>{
                setUserPreference(prev =>({...prev,genre:item}));
                document.getElementById('genre-dropdown').classList.toggle('hidden');
              }}
                className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>
                  {item}
              </p>
            ))}
          </div>
        </div>

        {/* Year Filter */}
        <div className='relative'>
          <h4 className='text-lg mb-2'>Released Year</h4>
          <button
            onClick={() => {
              const dropDown = document.getElementById('year-dropdown');
              dropDown.classList.toggle('hidden');
            }}
            className='bg-zinc-500 text-white px-4 py-2 rounded-md w-full text-left'
          >
            {userPreference.year ? `Year : ${userPreference.year}` : "Choose year"}
          </button>
          <div id='year-dropdown' className='hidden absolute mt-2 w-full bg-white text-black rounded-md shadow-md z-20 max-h-60 overflow-y-auto'>
            {['2020-2025', '2010-2020', "2000's", '1990-2000', '1980-1990','1970-1980', '1960-1970', '1950-1960', "1900-1950"].map(year => (
              <p 
              key={year} 
              onClick={
                ()=>{ setUserPreference(prev =>({...prev,year:year}));
                document.getElementById('year-dropdown').classList.toggle('hidden');
                }}
                className='px-4 py-2 hover:bg-gray-100 cursor-pointer'>{year}</p>
            ))}
          </div>
        </div>

        {/* Language Filter */}
        <div className='relative'>
          <h4 className='text-lg mb-2'>Language</h4>
          <button
            onClick={() => {
              const dropDown = document.getElementById('language-dropdown');
              dropDown.classList.toggle('hidden');
            }}
            className='bg-zinc-500 text-white px-4 py-2 rounded-md w-full text-left'
          >
            {userPreference.language ? `Language : ${userPreference.language}` : "Choose Language"}
          </button>
          <div id='language-dropdown' className='hidden absolute mt-2 w-full bg-white text-black rounded-md shadow-md z-20 max-h-40 overflow-y-auto'>
            {languages_list.map(lang => (
              <button 
              key={lang} 
              onClick={
                ()=>{setUserPreference(prev =>({...prev,language:lang})); 
                document.getElementById('language-dropdown').classList.toggle('hidden');
              }}
                className='block w-full text-left px-4 py-2 hover:bg-gray-100'>
                {lang}
              </button>
            ))}
          </div>
        </div>
        <div className='flex gap-4'>
          {/* Top Rated filter */}
          <div className='flex flex-col w-full'>
            <h4 className='text-lg mb-2'>Top Rated</h4>
            <button
              onClick={() =>
                setUserPreference((prev) => ({
                  ...prev,
                  toprated: !prev.toprated,
                }))
              }
              className={`bg-zinc-500 text-white px-4 py-2 rounded-md w-full text-left ${
                userPreference.toprated ? "ring-2 ring-blue-400" : ""
              }`}
            >
              {userPreference.toprated ? "Yes" : "No"}
            </button>
          </div>
            
          {/* NSFW filter */}
          <div className='flex flex-col w-full'>
            <h4 className='text-lg mb-2'>R-Rated</h4>
            <button
              onClick={() =>
                setUserPreference((prev) => ({
                  ...prev,
                  nsfw: !prev.nsfw,
                }))
              }
              className={`bg-zinc-500 text-white px-4 py-2 rounded-md w-full text-left ${
                userPreference.nsfw ? "ring-2 ring-red-400" : ""
              }`}
            >
              {userPreference.nsfw ? "Yes" : "No"}
            </button>
          </div>
        </div>
        
        {/* Search Button */}
        <div className='text-center mt-6 sm:flex sm:flex-col sm:items-center'>
          <button 
            onClick={handleSearch} 
            className='bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md transition'
          >
            Search
          </button>
          { !showResults && (
            <div className='mt-3 inline-block bg-yellow-100 text-yellow-800 text-sm px-4 py-2 rounded-md'>
              First search might take a few seconds!
            </div>
          )}
        </div>
      </div>
    </div>
  { loading && (
  <div id='load-indicator' className='flex justify-center items-center h-64'>
    <h1 className='text-xl font-semibold text-white bg-zinc-600 px-6 py-3 rounded-lg shadow-lg animate-pulse'>
      Loading... (hang on)
    </h1>
  </div>
  )
  }
  { showError &&(
    <div id='error-indicator' className='flex justify-center items-center h-64'>
      <h1 className='text-xl font-semibold text-white bg-red-500 px-6 py-3 rounded-lg shadow-lg'>
        {errorMessage}
      </h1>
    </div>
    )
  }
  { showResults && currentCardData && (
    <div id='movie-suggestion' className='flex justify-center items-center p-9 min-h-[60vh]'>
      <div className='bg-zinc-700 text-white rounded-xl shadow-lg overflow-hidden flex flex-col max-w-xs'>
        {/* Poster */}
        <div className='relative w-full aspect-[2/3] bg-black'>
          <img
          src={currentCardData.poster_image}
          alt={currentCardData.title}
          className='absolute top-0 left-0 w-full h-full object-contain'
        />
      </div>
      

      {/* Movie Details */}
      <div className='p-4 '>
      <div className='flex justify-between'>
        <div>
          <h3 className='text-2xl font-bold mb-2 p-0.5'>{currentCardData.title}</h3>
          <p className='text-sm text-gray-300 mb-2 p-0.5'>{currentCardData.tagline}</p>
        </div>
        <h3 className='text-l font-bold mb-2 p-0.5 pl-2 pt-2'>{currentCardData.rating}/10</h3>
      </div>
          <h3>{currentCardData.overview}</h3>
          <div className='flex justify-center mt-4'>
            <button onClick={()=>{setshowMovieDetail(true)}} className='bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md transition'>Read more &gt;&gt;&gt;</button>
          </div>
      </div>
      </div>
    </div>
  )}
  { showResults && currentCardData && (
    // Todo - watchlist button should turn into bookmark_added onClick
  <div className="flex flex-wrap gap-4 justify-center items-center p-4 rounded-lg max-w-full">
    <button id='prev-movie-button' onClick={()=>{
      if(cardNum>0)
        setCardNum(cardNum-1);
      }}
      className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition">
        <span className="sm:hidden">&lt;</span>
        <span className="hidden sm:inline">&lt; Previous</span>
    </button>
    <button 
      onClick={()=>{
        setWatchList([
          ...watchList,
          {
            id:watchListId++,
            imbd_id:currentCardData.imbd_id}
        ]);
        }}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
          <span className="sm:hidden">
            <svg 
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3">
              <path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z"/>
            </svg>
          </span>
          <span className='hidden sm:inline'>
            <span className="flex items-center gap-1 text-sm text-gray-200">
              <svg 
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e3e3e3">
                <path d="M200-120v-640q0-33 23.5-56.5T280-840h400q33 0 56.5 23.5T760-760v640L480-240 200-120Zm80-122 200-86 200 86v-518H280v518Zm0-518h400-400Z"/>
              </svg>
              <p>WatchList</p>
            </span>
          </span>
    </button>
    <button onClick={()=>{
      setBlockedMovies([
        ...blockedMovies,
        {
          id:blockId++,
          imbd_id:currentCardData.imbd_id}
      ]);
      if(cardNum<resultLen){
          setCardNum(cardNum+1)
      }else{
        setShowResults(false)
        setErrorMessage("looks like you've reached the end !")
        setShowError(true)
      }
    }} className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition">
      {/* Mobile */}
    <span className='flex items-center gap-1 sm:hidden'>
      <svg 
        xmlns="http://www.w3.org/2000/svg"
        height="24px" 
        viewBox="0 -960 960 960" 
        width="24px" 
        fill="#e3e3e3">
        <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
      </svg>
      <p>Watched</p>
    </span>

    {/* Desktop */}
    <span className='hidden sm:flex items-center gap-1'>
      <svg 
        xmlns="http://www.w3.org/2000/svg"
        height="24px" 
        viewBox="0 -960 960 960" 
        width="24px" 
        fill="#e3e3e3">
        <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
      </svg>
      <p>Already Watched</p>
    </span>
    </button>
    <button onClick={()=>{
        if(cardNum<resultLen){
          setCardNum(cardNum+1)
        }
      }} className="px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition">
        <span className="sm:hidden">&gt;</span>
        <span className="hidden sm:inline">Next &gt;</span>
    </button>
  </div>
  )}
  {showMovieDetail && (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm overflow-y-auto">
      <div className="bg-zinc-900 text-white max-w-full sm:max-w-5xl lg:max-w-6xl w-full h-11/12 mt:2 mx-auto sm:h-11/12 overflow-y-auto rounded-3xl shadow-2xl p-4 sm:p-8 flex flex-col">
        {/* Close Button */}
        <button onClick={() => setshowMovieDetail(false)} className="ml-auto mb-2 p-2 hover:bg-zinc-700 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </button>
        {/* Image Full Width, 1/3 Height */}
        <div className="relative w-full h-[300px] sm:h-3/5 min-h-[300px] max-h-[80vh] overflow-y-auto shadow-lg mb-4">
          <img
            src={currentCardData.thumbnail}
            alt="Movie Thumbnail"
            className="absolute top-0 left-0 w-full h-full object-cover object-center rounded-2xl"
          />
          <div >
            <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-sm px-3 py-2 rounded text-white text-2xl sm:text-6xl font-bold border-2 border-white/60 mr-2">
              <h2 className="text-2xl xl:text-7xl font-bold leading-tight">{currentCardData.title}</h2>
            </div>
            <div className="absolute top-6 right-4  bg-black/40 backdrop-blur-sm px-3 py-2 rounded text-white text-xl font-bold border-2 border-white/60">
              <h2>
                <span className='mr-2'>⭐</span>{currentCardData.rating}/10
                {currentCardData.vote_count>100 &&(
                  <span>({currentCardData.vote_count})</span>)}
              </h2>
            </div>  
          </div>
        </div>
        {/* Taglines */}
        <div className='mt-2 mb-4 ml-6 m text-xl italic font-bold' >
          { currentCardData.tagline &&(
            <h2>Tagline:{currentCardData.tagline}</h2>
          )
          }
        </div>
        <div className="flex flex-row gap-4 items-center text-lg font-bold ml-6 flex-wrap">
          {/* Release Date */}
          <div className="flex items-center gap-2 whitespace-nowrap">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 -960 960 960" fill="#e3e3e3"><path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Z"/></svg>
            <span>{currentCardData.release_date} •</span>
          </div>

          {/* Runtime */}
          <div className="flex items-center gap-2 whitespace-nowrap">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 -960 960 960" fill="#e3e3e3"><path d="M610-760q-21 0-35.5-14.5T560-810q0-21 14.5-35.5T610-860q21 0 35.5 14.5T660-810q0 21-14.5 35.5T610-760Zm0 660q-21 0-35.5-14.5T560-150q0-21 14.5-35.5T610-200q21 0 35.5 14.5T660-150q0 21-14.5 35.5T610-100Zm160-520q-21 0-35.5-14.5T720-670q0-21 14.5-35.5T770-720q21 0 35.5 14.5T820-670q0 21-14.5 35.5T770-620Zm0 380q-21 0-35.5-14.5T720-290q0-21 14.5-35.5T770-340q21 0 35.5 14.5T820-290q0 21-14.5 35.5T770-240Zm60-190q-21 0-35.5-14.5T780-480q0-21 14.5-35.5T830-530q21 0 35.5 14.5T880-480q0 21-14.5 35.5T830-430ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880v80q-134 0-227 93t-93 227q0 134 93 227t227 93v80Zm0-320q-33 0-56.5-23.5T400-480q0-5 .5-10.5T403-501l-83-83 56-56 83 83q4-1 21-3 33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Z"/></svg>
              {currentCardData.runtime &&(
              <span>{Math.floor(currentCardData.runtime / 60)}h {currentCardData.runtime % 60}min •</span>

              )
              }
          </div>

          {/* Adult */}
          <div className="flex items-center gap-2 whitespace-nowrap">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 -960 960 960" fill="#e3e3e3"><path d="M360-280h240v-80H440v-80h160v-80H440v-80h160v-80H360v400ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm0-80h560v-560H200v560Zm0-560v560-560Z"/></svg>
            <span>{currentCardData.adult ? "Adult" : "Everyone"}</span>
          </div>
          {/* Language */}
          <div className="flex items-center gap-2 whitespace-nowrap">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 -960 960 960" fill="#e3e3e3"><path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q83 0 155.5 31.5t127 86q54.5 54.5 86 127T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Zm0-82q26-36 45-75t31-83H404q12 44 31 83t45 75Zm-104-16q-18-33-31.5-68.5T322-320H204q29 50 72.5 87t99.5 55Zm208 0q56-18 99.5-55t72.5-87H638q-9 38-22.5 73.5T584-178ZM170-400h136q-3-20-4.5-39.5T300-480q0-21 1.5-40.5T306-560H170q-5 20-7.5 39.5T160-480q0 21 2.5 40.5T170-400Zm216 0h188q3-20 4.5-39.5T580-480q0-21-1.5-40.5T574-560H386q-3 20-4.5 39.5T380-480q0 21 1.5 40.5T386-400Zm268 0h136q5-20 7.5-39.5T800-480q0-21-2.5-40.5T790-560H654q3 20 4.5 39.5T660-480q0 21-1.5 40.5T654-400Zm-16-240h118q-29-50-72.5-87T584-782q18 33 31.5 68.5T638-640Zm-234 0h152q-12-44-31-83t-45-75q-26 36-45 75t-31 83Zm-200 0h118q9-38 22.5-73.5T376-782q-56 18-99.5 55T204-640Z"/></svg>
            <span>{language_map[currentCardData.original_language] || currentCardData.original_language}</span>
          </div>
          {/* Popularity */}
          <div className="flex items-center gap-2 whitespace-nowrap right-4">
            <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 -960 960 960" fill="#e3e3e3"><path d="M240-400q0 52 21 98.5t60 81.5q-1-5-1-9v-9q0-32 12-60t35-51l113-111 113 111q23 23 35 51t12 60v9q0 4-1 9 39-35 60-81.5t21-98.5q0-50-18.5-94.5T648-574q-20 13-42 19.5t-45 6.5q-62 0-107.5-41T401-690q-39 33-69 68.5t-50.5 72Q261-513 250.5-475T240-400Zm240 52-57 56q-11 11-17 25t-6 29q0 32 23.5 55t56.5 23q33 0 56.5-23t23.5-55q0-16-6-29.5T537-292l-57-56Zm0-492v132q0 34 23.5 57t57.5 23q18 0 33.5-7.5T622-658l18-22q74 42 117 117t43 163q0 134-93 227T480-80q-134 0-227-93t-93-227q0-129 86.5-245T480-840Z"/></svg>
            <span>{currentCardData.popularity}</span>
          </div>
        </div>
        
        {/* Genre details */}
        <div className='flex flex-row flex-wrap gap-2 ml-3 mt-2 p-2'>
          {currentCardData.genres?.split(",").map((genre, id) => (
            // ?. = Safe access and avoid crashes occcured by undefined 
            <span
              key={id}
              className="px-3 py-1 rounded-full bg-white/10 text-white border border-white/20 text-sm"
            >
              {genre.trim()}
            </span>
          ))}
        </div>



        {/* Todo - Add youtube video of trailer */}
        {/* Story Details*/}
        {/* Website and links https://www.imdb.com/title/tt9179430/ */}
        <div className="flex flex-wrap gap-4 items-start m-2">
          <div className="text-2xl flex-1 min-w-[200px]">
            <h1 className='ml-6 mt-2 font-bold text-3xl'>Overview</h1>
            <p className="text-gray-300 text-2xl mb-4 ml-4 sm:ml:5 p-2 sm:p-6">{currentCardData.overview}</p>
          </div>
          <div className="flex flex-col gap-4 p-6">
          {currentCardData.home_page && ( 
            <a 
              href={currentCardData.home_page} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 px-4 py-2 rounded h-fit self-start hover:underline-offset-5"
            >
              Visit Official Website
            </a>
          )}
          {(currentCardData.imdb_id != null && currentCardData) && ( 
            <a 
              href={`https://www.imdb.com/title/${currentCardData.imdb_id}`} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 px-4 py-2 rounded h-fit self-start hover:underline-offset-5"
            >
              imdb Page
            </a>
          )}
          </div>

        </div>      
      </div>
    </div>

    
  )
  }
  
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

export default App;

// Todo
// Add Notification Function (Should handle watched movies and savedMovies)