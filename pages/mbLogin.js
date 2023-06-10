import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import {useRouter} from 'next/router';
import {useAuthState} from 'react-firebase-hooks/auth';

import { useEffect } from "react";
import { auth } from "@/utils/firebase";


export default function Login() {

    const route = useRouter();
    const [user, loading] = useAuthState(auth);
  // Sign in with Google
  const googleProvider = new GoogleAuthProvider();

  const GoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      route.push("/")
    } catch (e) {
        console.log(e);
    }
  };

  useEffect(() => {
    if(user){
        route.push("/");
    }else{
        console.log("login");
    }
  }, [user]);


  return (
    <div className="shadow-xl sm:mt-[50%] lg:mt-32 px-5 py-4 text-white rounded-lg bg-purple-500 sm:w-3/5 lg:w-2/5 flex flex-col mx-auto justify-center">
      <h2 className="text-2xl font-medium">Join Today</h2>
      <div className="py-4">
        <h3 className="py-4">Sign in to gain access to 100M+ movies</h3>
        <button
          onClick={GoogleLogin}
          className="text-white bg-purple-800 w-full font-medium rounded-lg flex align-middle p-4 gap-2"
        >
          <FcGoogle className="text-2xl" />
          Sign in with Google
        </button>
      </div>
    </div>
  );
}
