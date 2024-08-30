import { Popover, PopoverContent, PopoverTrigger, } from "../ui/popover"
import { Avatar, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { LogOut, User2 } from "lucide-react"
import { Link } from "react-router-dom"

const Navbar = () => {

    const user = false;

    return (
        <div className='bg-white'>
            <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4">
                <div>
                    <h1 className='text-2xl font-bold'>Kreditaid <span className="text-[#ff6044]" >Admin</span></h1>
                </div>
                <div className="flex items-center justify-end gap-12" >
                    <ul className="flex font-semibold text text-[#414040] items-center gap-5 ">
                        <li><Link to={"/"}>Home</Link></li>
                        <li><Link to={"/"}>Services</Link></li>
                        <li><Link href={"/"}>Contact</Link></li>
                    </ul>
                    {
                        !user ? (
                            <div className="flex items-center gap-2">
                                <Link to={'/login'}><Button variant="outline" >Login</Button></Link>
                                <Link to={'/signUp'}>
                                    <Button className="bg-[#6A3BC2]" >SignUp</Button>
                                </Link>
                            </div>
                        )
                            : (
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Avatar className="cursor-pointer ">
                                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                        </Avatar>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80">
                                        <div className="flex gap-4 ">
                                            <Avatar className="cursor-pointer ">
                                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                            </Avatar>
                                            <div>
                                                <h4 className="font-bold" >Username</h4>
                                                <p className="text-sm text-dark " >Lorem ipsum dolor sit amet.</p>
                                            </div>
                                        </div>

                                        <div className="flex  mt-4 items-center ">
                                            <User2 />
                                            <Button variant="link" >View Profile</Button>
                                        </div>

                                        <div className="flex  mt-4  items-center">
                                            <LogOut />
                                            <Button variant="link" >Logout</Button>
                                        </div>

                                    </PopoverContent>
                                </Popover>
                            )
                    }


                </div>
            </div>
        </div>
    )
}

export default Navbar