import { ModeToggle } from "@/components/mode-toggle";
import { UserButton } from "@clerk/nextjs";

const Home = () => {
    return ( <>
    <UserButton afterSignOutUrl="/sign-in"/>
    <ModeToggle/>
    </> );
}
 
export default Home;