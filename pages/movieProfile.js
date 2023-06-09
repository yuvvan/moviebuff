import SettingsContext from "./SettingsContext";
import { auth } from "@/utils/firebase";
import { useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Router, useRouter } from "next/router";
import {RxCross2} from "react-icons/rx"

export default function MovieProfile() {
  const settingsInfo = useContext(SettingsContext);
  const [user, loading] = useAuthState(auth);
  const modalState = settingsInfo.openModalState;
  const router = useRouter();

  console.log(router.query.TITLE);

  return (
  <>
  <div>
      <RxCross2 onClick={() => router.push("/")} size={30} className="mx-5 mt-3 cursor-pointer p-1 hover:bg-opacity-20 hover:bg-gray-300  rounded-full"/>
      </div>
    <div className="flex flex-col items-center justify-center mx-auto">
        <img src={router.query.URL} alt="imgURL" />
    <h1>{router.query.TITLE}</h1>
    <h1>{router.query.RATINGS}</h1>
    <h1>{router.query.PLOT}</h1>
    </div>
  </>);
}
