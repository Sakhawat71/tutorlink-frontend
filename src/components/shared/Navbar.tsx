"use client";
import Logo from "@/assets/svgs/logo.svg";
import { Button } from "../ui/button";
import { Heart, LogOut, ShoppingBag } from "lucide-react";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { logoutUser } from "@/services/AuthService";
// import { useUser } from "@/context/UserContext";
import { usePathname, useRouter } from "next/navigation";
// import { predictedRoute } from "@/constants";



export default function Navbar() {

    // const { user, setIsLoading, isLoading } = useUser();
    // console.log(user);
    const pathname = usePathname();
    const router = useRouter();
    const user = true;

    const handlelogout = () => {
        logoutUser();
        // setIsLoading(true);
        // if (predictedRoute.some((route) => pathname.match(route))) {
        //     router.push("/");
        // }
    };

    // if(isLoading){
    //     return <div>Loading...</div>
    // };

    return (
        <header className="border-b w-full">
            <div className="container flex justify-between items-center mx-auto h-16 px-3">
                <Link href="/" className="text-2xl font-black flex items-center">
                    {/* <Logo /> */}
                    TutorLink
                </Link>
                <div className="max-w-md  flex-grow">
                    <input
                        type="text"
                        placeholder="Search for products"
                        className="w-full max-w-6xl border border-gray-300 rounded-full py-2 px-5"
                    />
                </div>
                <nav className="flex gap-2">
                    <Button variant="outline" className="rounded-full p-0 size-10">
                        <Heart />
                    </Button>

                    <Link href="/cart">
                        <Button variant="outline" className="rounded-full p-0 size-10">
                            <ShoppingBag />
                        </Button>
                    </Link>

                    {
                        user ?
                            (
                                <>
                                    <Link href='/create-shop'>
                                        <Button
                                            // variant='outline'
                                            className="rounded-full"
                                        >Create Shop</Button>
                                    </Link>

                                    {/* drop down menu */}
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <Avatar>
                                                <AvatarImage src="https://i.ibb.co.com/4K27t1f/user.png" />
                                                <AvatarFallback>User</AvatarFallback>
                                            </Avatar>

                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>Profile</DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Link href="/user/dashboard">Dashboard</Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>My Shop</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem
                                                className="text-red-600 font-bold cursor-pointer"
                                                onClick={handlelogout}
                                            >
                                                <LogOut />
                                                <span>Logout</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </>
                            )
                            :
                            (
                                <Link href='/login'>
                                    <Button
                                        // disabled={isLoading}
                                        variant='outline'
                                        className="rounded-full"
                                    >Login</Button>
                                </Link>
                            )
                    }

                </nav>
            </div>
        </header>
    );
}