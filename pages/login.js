import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {useContext, useEffect} from "react";
import {useAuthState} from 'react-firebase-hooks/auth';
import { auth } from "@/utils/firebase";
import SettingsContext from "@/pages/SettingsContext";
import { Router, useRouter } from "next/router";

export default function Login(){

  
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  // Sign in with Google
  const googleProvider = new GoogleAuthProvider();
  const googleLogin = async () => {
    try{
      const result = await signInWithPopup(auth, googleProvider)
      router.push("/")
    }
    catch(e){
        console.error("error");
    }
  }

  () => {
    if (!user){
      router.push("/login")
    }
    else {
      router.push("/")
    }
  }



return(
    <div className=" max-w-md mt-32 mx-auto flex-col bg-gray-200 rounded-lg p-10">
        <h1 className="bg-transparent text-black text-2xl font-medium mb-3">Join Today</h1>
        <h2 className="bg-transparent text-black text-lg font-medium">Sign in to gain access to 100M+ games</h2>
        <div className="rounded-lg">
        <button
          className="text-white bg-purple-600 w-full font-medium rounded-lg flex align-middle p-4 gap-2 mt-3"
          onClick={googleLogin}
        >
          <FcGoogle className="text-2xl bg-transparent" />
          Sign in with Google
        </button>
        </div>
    </div>
);


}