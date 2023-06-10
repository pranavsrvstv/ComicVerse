import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import ReactStars from 'react-stars'
import { useParams } from 'react-router-dom'
import { animeRef, db } from '../firebase/Firebase'
import { doc, getDoc } from 'firebase/firestore'
import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Review from './Review'
import Description from './Description'
import { TailSpin } from 'react-loader-spinner'



const Detail = () => {
    const { id } = useParams();

    const [data, setData] = useState({
        title: "",
        year: "",
        description: "",
        image: "",
        rating:0,
        totalReviews:0
    })

    //if description is the active tab then activetab is true , if review is active it is false
    const [activetab, setActivetab] = useState(true);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        async function getData() {
            setLoading(true);
            //getting details of the currently opened anime
            const _doc = doc(db, "anime", id);
            const anime_data = await getDoc(_doc);
            //console.log(_data);
            setData(anime_data.data());
            setLoading(false);
        }
        getData();
    }, [data.totalReviews]);


    return (

        <div className='text-white mt-15  p-3'>
            {loading ? <div className=' w-full flex justify-center items-center h-96'><TailSpin height={40} /> </div>:
                <section class="text-white body-font ">
                    {/* overflow hidden didnt allow image to be sticky */}
                    <div class="container px-5 py-24 ">
                        <div class="lg:w-full  flex flex-wrap lg:ml-20">
                            <div class="lg:w-1/3 w-full lg:h-96 lg:sticky md:top-28 h-64 m-6 mt-10 object-contain border-green-500 border-2 p-2 hover:shadow-blue-500 shadow-2xl ">
                                <img alt="anime_image" className='h-full w-full' src={data.image} />
                            </div>

                            <div class="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                                <ReactStars
                                    size={30} value={data.rating} half={true} edit={false}
                                />
                                <h1 class="text-white  text-3xl title-font font-medium mb-4">{data.title}</h1>
                                <div class="flex mb-4">

                                    <button onClick={() => setActivetab(true)} class="flex-grow text-indigo-500 border-b-2 border-indigo-500 py-2 text-lg px-1">Description</button>

                                    <button type='button' onClick={() => setActivetab(false)} class="flex-grow border-b-2 border-white  py-2 text-lg px-1">Reviews</button>

                                </div>
                                <div>

                                    {activetab ?
                                        <Description data={data.description} /> : <Review id={id} prevRating={data.rating} userRated={data.totalReviews}/>
                                    }
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            }
        </div>

    )
}

export default Detail
