"use client"
import { useEffect, useState } from "react"
import Loading from "./loading"
import ListCard from "./components/ListCard"


export default function Home() {

  const [data, setData] = useState([])
  const [result, setResult] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [rank, setRank] = useState('')
  const [scrollable, setscrollable] = useState(false)
  const [stream, setstream] = useState(true)
  const [n, setn] = useState(0)


  const handlNext = () => {
    setn(n + 1)
    setstream(true)
    setResult([])
    setData([])
  }

  const handlPrev = () => {
    setn(n - 1)
    setstream(true)
    setResult([])
    setData([])
  }

  // const url = 'http://localhost:4000'
  const url = 'https://imdb-scraping-in.onrender.com'

  // useEffect(() => {
  //   const eventSource = new EventSource(`${url}/imdb/top1000/${n}`);
  //   console.log("runnin")
  //   eventSource.onmessage = event => {
  //     setstream(true)
  //     if(result.length>=100){
  //       console.log('ended')
  //       eventSource.close();
  //     }else{
  //     const newData = JSON.parse(event.data);
  //     setResult(prevData => [...prevData, newData]);
  //     setData(prevData => [...prevData, newData]);
  //     }

  //   };

  //   eventSource.onerror = error => {
  //     eventSource.close();
  //     setstream(false)
  //   };

  //   return () => {
  //     eventSource.close();
  //     setstream(false)
  //   };
  // }, [n])

  useEffect(() => {
    const getData = async () => {
      setstream(true)
      const res = await fetch(`${url}/imdb/list/${n}`)
      const resp = await res.json()
      console.log(resp)
      setResult(resp.movies)
      setData(resp.movies)
      setstream(false)
    }
    getData()
  }, [n])


  const cards = data.map((el) => (
    <ListCard key={el.id} movie={el} />
  )
  )

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    let newData = []
    if (e.target.value === '' || (e.target.value.replaceAll(' ', '')).length === 0) {
      newData = result
    } else {
      newData = result.filter((movie) => {
        return (movie.title.toLowerCase().includes(e.target.value.toLowerCase()) || movie.desc.toLowerCase().includes(e.target.value.toLowerCase()))
      })
    }
    setData(newData)

  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    scroll()
    setSearchTerm('')
    setRank('')
  }
  const SearchBar = (
    <form onSubmit={(e) => { handleSubmit(e) }}>
      <label htmlFor="default-search" className="mb-2 text-sm font-medium sr-only dark:text-white">Search</label>
      <div className="lg:grid lg:grid-cols-7 md:flex md:flex-col items-center justify-center gap-10 lg:gap-10">
        <div className="relative col-span-5">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <div>
            <input type="search" value={searchTerm} onChange={(e) => { handleChange(e) }} id="default-search" className="block w-full p-4 pl-10 lg:text-sm text-xs placeholder:text-xs border border-gray-300 rounded-lg bg-gray-50 focus:ring-purple-500 focus:border-purple-500 dark:bg-purple-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500" placeholder="Movies" />
          </div>
        </div>
        <div className="relative col-span-2 md:mt-3 mt-5 lg:mt-0">
          <div>
            <input type="search" value={rank} onChange={(e) => { setRank(e.target.value.toString()) }} id="default-search" className="block w-full p-4 pl-10 lg:text-sm text-xs placeholder:text-xs border border-gray-300 rounded-lg bg-gray-50 focus:ring-purple-500 focus:border-purple-500 dark:bg-purple-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500" placeholder="Rank" />
            <button onClick={() => { scroll() }} className="text-white absolute right-2.5 bottom-2.5 bg-purple-700 transition-all hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800"><svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg></button>
          </div>
        </div>
      </div>
    </form>

  )

  const scroll = () => {
    if (rank !== '') {
      const section = document.querySelector(`#rank${rank}`);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        setn(parseInt(rank) > 0 && parseInt(rank) < 1000 ? parseInt(rank / 10) : parseInt(rank) > 999 ? 99 : 0)
        setData([])
        setResult([])
        setstream(true)
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", (event) => {
      let scroll = window.scrollY;
      if (scroll > 1000) {
        setscrollable(true)
      } else {
        setscrollable(false)
      }
    });
  }, [])


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return !data ? (<Loading />) : (
    <main className="flex min-h-screen flex-col items-center justify-between lg:p-24 md:p-10 p-3">
      <button onClick={() => { scrollToTop() }} className={`${scrollable ? '' : 'hidden'} fixed bottom-2 right-2 hover:scale-110 transition-all `}><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="50" height="50" fill="#ffffff" viewBox="0 0 50 50">
        <path d="M 9 4 C 6.2504839 4 4 6.2504839 4 9 L 4 41 C 4 43.749516 6.2504839 46 9 46 L 41 46 C 43.749516 46 46 43.749516 46 41 L 46 9 C 46 6.2504839 43.749516 4 41 4 L 9 4 z M 9 6 L 41 6 C 42.668484 6 44 7.3315161 44 9 L 44 41 C 44 42.668484 42.668484 44 41 44 L 9 44 C 7.3315161 44 6 42.668484 6 41 L 6 9 C 6 7.3315161 7.3315161 6 9 6 z M 25 16.585938 L 12.292969 29.292969 A 1.0001 1.0001 0 1 0 13.707031 30.707031 L 25 19.414062 L 36.292969 30.707031 A 1.0001 1.0001 0 1 0 37.707031 29.292969 L 25 16.585938 z"></path>
      </svg></button>
      <h1 className=" lg:text-2xl text-xl text-center">IMDb - Top 1000 movies {'(India)'}</h1>
      <div className=" md:w-full lg:w-9/12 my-6">
        {SearchBar}
      </div>
      <div>
        {cards}
        {stream && <Loading />}
      </div>
      {result.length > 2 && <div className=" flex w-full justify-between p-4">
        {(n > 0) ? <button className=" border p-3 rounded-xl border-purple-500 transition-all text-slate-100 hover:bg-purple-500" onClick={() => { handlPrev() }}>Previous</button>
          : <div></div>}
        <h3>{`${(n * 10) + 1}-${(n * 10) + 10} (1000)`}</h3>
        {(n < 100) ? <button className=" border p-3 rounded-xl border-purple-500 transition-all text-slate-100 hover:bg-purple-500" onClick={() => { handlNext() }}>Next</button>
          : <div></div>
        }
      </div>}
    </main>
  )
}
