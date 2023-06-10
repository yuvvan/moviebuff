import Link from "next/link";

export default function FeedCard({FAV_TITLE, FAV_URL, USER_ID, USER_NAME, USER_PFP}){
    if (!FAV_TITLE || !FAV_URL || !USER_ID) {
        console.log("FAV_TITLE, FAV_URL, USER_ID are null")
    }
   else{
    console.log(FAV_TITLE)
   }
        
    
    return(
        <>
        <div className="p-4 m-5 bg-purple-400 rounded-lg bg-opacity-50">
        <div className="flex ">
            <img className="rounded-full h-12 w-12" src={USER_PFP} alt="userimg" />
            <Link href={{pathname: "/usersProfile", query: {USER_PFP, USER_NAME, USER_ID}}}>
            <h1>{USER_NAME}</h1>
            </Link>
        </div>
        <div>
            <h1 className="text-xl">{USER_NAME} favourited {FAV_TITLE}</h1>
        </div>
        </div>
        </>
    );
}