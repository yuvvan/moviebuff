import SettingsContext from "../pages/SettingsContext";
import { useState } from "react";
import {AiOutlineHeart} from "react-icons/ai"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/utils/firebase";
import { Router, useRouter } from "next/router";

import {
  addDoc,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import Link from "next/link";




export default function Trendingimage({PLOT, RATINGS, TITLE, URL, USER}){

  const [favourites, setFavourites] = useState([]);
  const [openModalState, setOpenModalState] = useState(false);
  const [user, loading] = useAuthState(auth)
  const router = useRouter();

  const favouritesRef = collection(db, "favourites");

    if (!PLOT || !RATINGS || !TITLE || !URL || !USER){
        return null;
    }else{   
    }

    const favouritesHandler = async () => {
      setFavourites({...favourites}, {TITLE}); 
        if (favourites !== []){
          await addDoc(favouritesRef,
            {FAV_TITLE: TITLE,
            FAV_URL: URL,
            USER_ID: user.uid,
            USER_NAME: user.displayName,
            USER_PFP: user.photoURL});
        }
        else{
          console.log("null favourites")
        }
    }

    const modalState = () => {
      setOpenModalState(true)
      
    }
    return(
        <main className="ml-20">
          
          <SettingsContext.Provider value={
            {modal: openModalState,
            setOpenModalState: setOpenModalState}

          }> 
        <div className="mt-10 relative">
        <AiOutlineHeart onClick={favouritesHandler} size = {40} className=" top-4 left-4 absolute z-20 fill-pink-600 bg-white bg-opacity-60 rounded-full p-2 hover:p-1.5 ease-in-out duration-300"/>
                <Link href={{pathname: "/movieProfile", query: {TITLE, URL, PLOT, RATINGS}}}>
                <img
                
                  src={URL}
                  alt="movie"
                  className="max-h-[150px] max-w-[250px] min-w-[150px] min-h-[250px] rounded-3xl inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300"
                />
                </Link>
              </div>
              <div className="">
                <h1>{TITLE}</h1>
                <h1 className="break-all"></h1>
                <h1>{RATINGS}</h1>
              </div>
              
              </SettingsContext.Provider>
              </main>
           
    );
}