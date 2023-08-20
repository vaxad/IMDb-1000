"use client"
import React, { useEffect, useState } from 'react'

export default function ListCard({ movie }) {
    const [extra, setextra] = useState(null)
    const url = 'https://imdb-scraping-in.onrender.com'
    useEffect(() => {

        const getData = async () => {
            const res = await fetch(`${url}/imdb/movie/${movie.id}`)
            const resp = await res.json()
            console.log(resp)
            setextra(resp.movie)
        }
        if (extra === null)
            getData()
    }, [])



    return (
        <div id={'rank' + movie.rank} className=' w-full flex justify-center items-center my-10 px-5'>
            <div id='moviecard' className="flex flex-col tracking-wider items-center border  lg:rounded-lg lg:w-9/12 w-full rounded-2xl shadow md:flex-row lg:hover:scale-110 md:hover:scale-105 hover:scale-100 transition-all ">
                <a href={`https://www.imdb.com/title/${movie.id}/?ref_=adv_li_i`} target='_blank' className='flex flex-roe tracking-wider items-center'>
                    {extra && <img className="object-cover lg:w-auto rounded-t-lg lg:h-96 w-fit h-auto  md:rounded-none md:rounded-l-lg" src={extra.img[4]} alt="" />}
                    <div className="flex flex-col justify-between p-4 leading-normal">
                        <div className=' flex flex-row gap-5 lg:text-base text-sm self-end'>
                            <h4>Rank:</h4><p>{movie.rank}</p>
                        </div>
                        <h5 className="mb-2 lg:text-2xl text-xl font-bold  dark:text-white break-words">{movie.title}</h5>
                        <p className="mb-3 lg:text-base text-sm font-normal dark:text-gray-200 break-words">{movie.desc}</p>
                        {extra && <div className=' flex flex-row flex-wrap gap-5 lg:text-base text-sm'>
                            <h4>Directors:</h4><p className='lg:px-3'>{extra.directors.toString()}</p>
                        </div>}
                        <div className=' flex flex-row flex-wrap gap-5 lg:text-base text-sm'>
                            <h4>Genre:</h4><p className='lg:px-3'>{movie.genre.toString()}</p>
                        </div>
                        <div className=' flex flex-row gap-5 lg:text-base text-sm'>
                            <h4>Rating:</h4><p>{movie.stars}/10{extra ? ` (${extra.reviews})` : ''}</p>
                        </div>
                        <div className=' flex flex-row gap-5 lg:text-base text-sm'>
                            <h4>Year:</h4><p>{movie.year}</p>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    )
}
