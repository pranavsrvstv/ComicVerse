import React from 'react'
import ReactStars from 'react-stars'
import { useState } from 'react';
import { reviewsRef, db } from '../firebase/Firebase';
import { addDoc, doc, updateDoc, query, where, getDocs } from 'firebase/firestore';
import { TailSpin, ThreeDots } from 'react-loader-spinner';
import swal from 'sweetalert';
import { useEffect } from 'react'
import { Appstate } from "../App";
import { useContext } from 'react';


const Review = ({ id, prevRating, userRated }) => {
    /*
    curRating = the rating given by the current Reviewer
 
    id= id of the movie for which the review is added(passed as props from detail.js)
 
    prevRating=previous rating of user before adding this review
 
    userRated= totalReviews without adding the current review
  
    */

    const useAppstate = useContext(Appstate);
    const [curRating, setRating] = useState(0);
    const [loading, setLoading] = useState(false);
    const [review, setReview] = useState("");
    const [reviewData, setReviewData] = useState([]);
    const [update, setUpdate] = useState(true);
   const login=false;
    const [reviewsLoading, setReviewsLoading] = useState(false);

    //function that add the review given by current user to the review list
    const sendReview = async () => {

        try {
            setLoading(true);
            //adding review data in reviews collection
            await addDoc(reviewsRef, {
                Timestamp: new Date().getTime(),
                animeId: id,
                author: useAppstate.userName,
                rating: curRating,
                thought: review,
            })
             
            //updating the totalReviews and rating in the anime collections so that the average rating given by all users can be shown
            const docRef = doc(db, "anime", id);
            await updateDoc(docRef, {
                totalReviews: userRated + 1,
                rating: (prevRating + curRating) / (userRated + 1),
            })

            setRating(0);
            setReview("");
            setUpdate(!update);
            //a sweet alert
            swal({
                title: "Successfully Added",
                icon: "success",
                buttons: false,
                timer: "2000",


            });
            setLoading(false);
        }
        catch (error) {
            swal({
                title: "Successfully Added",
                icon: "success",
                buttons: "false",
                timer: "3000"
            });

        }

    }

    useEffect(() => {
        async function getData() {
            setReviewsLoading(true);
            setReviewData([]);

            //getting the reviews of only the currently opened anime using the animeId and query 
            let myquery = query(reviewsRef, where("animeId", '==', id))
            //getting data of this anime
            const querySnapshot = await getDocs(myquery);
            querySnapshot.forEach((doc) => {

                //filling the reviews in reviewdata array to display on review section

                //...prev(spread operator) keeps all the prev data and add new review in the data
                setReviewData((prev) => [...prev, doc.data()]);
            });
            setReviewsLoading(false);

        }
        getData();
        //useeffect changes when a update is made to reviews (checked using update variable)
    }, [update]);




    return (
        <div className='mt-4 w-full'>
            {useAppstate.login ?
                <>
                    <ReactStars
                        size={30}
                        half={true}
                        value={curRating}
                        onChange={(rate) => setRating(rate)}
                    />
                    <input
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        placeholder='Share Your thoughts...'
                        className='w-full p-2 outline-none header text-black'
                    />
                    <button onClick={() => sendReview()} className='bg-green-600 flex justify-center w-full p-2'>
                        {loading ? <ThreeDots color='white' height={10} /> : "Share"}
                    </button>
                </>
                :
                <>
                    <button  className='bg-green-600 flex justify-center w-full p-2'>
                        Log In To Add A Review
                    </button>
                </>
            }
            <div className='w-full flex-col justify-center'>
                {reviewsLoading ?
                    <div className='flex justify-center mt-10'>
                        <TailSpin color='white' height={30} />
                    </div>
                    :
                    <div>
                        {reviewData.map((e, i) => {
                            return (
                                <div className='text-white text-left bg-gray-700 m-2 p-2'>
                                    <ReactStars
                                        size={10}
                                        half={true}
                                        value={e.rating}
                                        edit={false}
                                    />
                                    <div className='text-green-500 text-sm'>
                                        {e.author.toUpperCase()} on {new Date(e.Timestamp).toLocaleString()} wrote :
                                    </div>
                                    <p>{e.thought}</p>


                                </div>
                            );
                        })}
                    </div>
                }
            </div>
        </div>
    )
}

export default Review
