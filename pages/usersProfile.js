import Grid from "@/components/gridView";
import { auth, db } from "@/utils/firebase";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {BiArrowBack} from "react-icons/bi"



export default function UsersProfile(){

  const [isFollowed, setIsFollowed] = useState(false);
  const [user, loading] = useAuthState(auth);
  const [pageState, setPageState] = useState(true);
  const [favouriteMovies, setFavouriteMovies] = useState([]);

  const favouritesRef = collection(db, "favourites");

  const profileRouter = useRouter();
  console.log(profileRouter);

  const getFavMovies = async () => {
    const q = query(favouritesRef, where("USER_ID", "==", profileRouter.query.USER_ID),orderBy("FAV_TITLE"));
    const mapFavMovies = onSnapshot(q, (snapshot) => {
        setFavouriteMovies(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    });
    return mapFavMovies;
}
useEffect(() => {
  getFavMovies();
}, []);


  function FollowBtn() {
    if (isFollowed == false) {
      return (
        <button
          onClick={() => setIsFollowed(true)}
          className="bg-purple-500 py-2 px-4 rounded-lg text-lg hover:px-6 hover:mx-5 ease-in-out duration-300 "
        >
          Follow
        </button>
      );
    }
    if (isFollowed == true) {
      return (
        <button
          onClick={() => setIsFollowed(false)}
          className="bg-purple-400 py-2 px-4 rounded-lg text-lg hover:px-6 hover:mx-5 ease-in-out duration-300"
        >
          Unfollow
        </button>
      );
    }
  }
    return(
        <>
            <>
      <BiArrowBack
        onClick={() => profileRouter.push("/")}
        size={30}
        className="mx-5 mt-3 cursor-pointer p-1 hover:bg-opacity-20 hover:bg-gray-300  rounded-full"
      />
      <div className="flex flex-col mx-auto items-center justify-center text-white mt-7">
        <img className="rounded-full" src={profileRouter.query.USER_PFP} alt="pfp" />
        <h1 className="text-2xl mt-3 mb-5">{profileRouter.query.USER_NAME}</h1>
        <div>
          <FollowBtn />
          <button className="bg-gray-400 py-2 px-4 rounded-lg text-lg ml-2 hover:px-6 hover:mx-5 ease-in-out duration-300 ">
            Message
          </button>
        </div>
        <div className="mt-20 flex text-sm gap-20">
          <button
           className={`${pageState ? 'text-white overline' : 'text-gray-400'}`}
            onClick={() => 
              setPageState(true)
            }
          >
            FAVOURITES
          </button>
          <button
           className={`${pageState ? 'text-gray-400' : 'text-white overline' }`}
            onClick={() => {
               setPageState(false);
            }}
          >
            RECENTLY WATCHED
          </button>
          <button className="text-gray-400">NO CLUE</button>
        </div>
        <div className="flex flex-wrap gap-3 items-center justify-center mt-10 max-w-[900px]">
        {pageState ? favouriteMovies.map((eachFavMovie) => (
        <Grid key = {eachFavMovie.id} {...eachFavMovie}/>
      )) : <h1>Recent Page</h1>}
    </div>
      </div>
    </>
        </>
    );
}