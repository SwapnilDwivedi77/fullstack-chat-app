import { UserButton } from "@clerk/nextjs";

const Home = () => {
    return ( <>
    <UserButton afterSignOutUrl="/sign-in"/>
    </> );
}
 
export default Home;