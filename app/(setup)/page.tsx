import { db } from "@/lib/db";
import {redirect} from 'next/navigation'
import {initialProfile} from "@/lib/intial-profile"

const SetupPage = async () => {
    const profile = await initialProfile();
    const server = await db.server.findFirst({
        where:{
            members:{
                some:{
                    profileId : profile.id
                }
            }
        }
    });

    if(server) {
        return redirect(`/servers/${server.id}`);
    }
    
    return ( <>
        Create a Server
    </> );
}
 
export default SetupPage;