import React from 'react'
import ReactStars from 'react-stars'
import { useState } from 'react';
import { reviewsRef ,db} from '../firebase/Firebase';
import { addDoc ,doc,updateDoc} from 'firebase/firestore';
import { ThreeDots } from 'react-loader-spinner';
import swal from 'sweetalert';

const Review = ({id,prevRating,userRated}) => {
   /*
   curRating = the rating given by the current Reviewer

   id= id of the movie for which the review is added(passed as props from detail.js)

   prevRating=previous rating of user before adding this review

   userRated= totalReviews without adding the current review
 
   */




    const [curRating, setRating] = useState(0);
    const [loading,setLoading]=useState(false);
    const [review,setReview]=useState("");

    const sendReview= async()=>{
       
        try{
            setLoading(true);
            await addDoc(reviewsRef,{
                Timestamp:new Date().getTime(),
                animeId:id,
                author:"pranav",   
                rating:curRating,  
                thought:review,
            })

            const docRef= doc(db,"anime",id);
            await updateDoc(docRef,{
                totalReviews:userRated+1,
                rating:(prevRating+curRating)/(userRated+1),
            })

            setRating(0);
            setReview("");
            swal({
                title:"Successfully Added",
                icon:"success",
                buttons:false,
                timer:"2000",
                
                
            });
            setLoading(false);
        }
        catch(error){
            swal({
                title:"Successfully Added",
                icon:"success",
                buttons:"false",
                timer:"3000"
            });

        }
        
    }




    return (
        <div className='mt-4 w-full'>
            <ReactStars
                size={30}
                half={true}
                value={curRating}
                onChange={(rate) => setRating(rate)}
            />
            <input
                value={review}
                onChange={(e)=>setReview(e.target.value)}
                placeholder='Share Your thoughts...'
                className='w-full p-2 outline-none header text-black'
            />
            <button  onClick={()=>sendReview()} className='bg-green-600 flex justify-center w-full p-2'>
            {loading?<ThreeDots color='white' height={10}/>:"Share"}
           </button>
        </div>
    )
}

export default Review
