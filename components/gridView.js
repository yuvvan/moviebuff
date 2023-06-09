import { auth } from "@/utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Grid({ FAV_TITLE, FAV_URL }) {
  const [user, loading] = useAuthState(auth);

  if (!FAV_TITLE || !FAV_URL) {
    return null;
  } else {
    console.log(FAV_TITLE);
  }
  return (
    <div className="">
      <img className="h-[300px]" src={FAV_URL} alt="grid1" />
    </div>
  );
}
