import React, { useState } from 'react'
import Navbar from '../common/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'

const SignUp = () => {

    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phonenumber: "",
        password: "",
        role: "",
        file: "",
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loading = useSelector((store) => store.auth.loading); // Make sure to use the correct path to `loading` in the auth slice

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] })
    }

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('fullname', input.fullname);
        formData.append('email', input.email);
        formData.append('phonenumber', input.phonenumber);
        formData.append('password', input.password);
        formData.append('role', input.role);
        if (input.file) {
            formData.append('file', input.file);
        }

        try {

            dispatch(setLoading(true));

            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredential: true
            }
            );

            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/login')
            } else {
                toast.success(res.data.message);
            }


        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            dispatch(setLoading(false));
        }
    }

    return (
        <div>
            <Navbar />
            <div className='flex justify-center max-w-7xl mx-auto items-center'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded p-4'>
                    <h1 className='font-semibold text-xl mb-5 '>SignUp</h1>
                    <div className='my-2'>
                        <Label className="" >Full Name</Label>
                        <Input type="text" placeholder="name"
                            value={input.fullname}
                            name={'fullname'}
                            onChange={changeEventHandler}
                        />
                    </div>

                    <div className='my-2'>
                        <Label className="" >Email</Label>
                        <Input type="email" placeholder="mail@ecampl.com"
                            value={input.email}
                            name={'email'}
                            onChange={changeEventHandler}
                        />
                    </div>

                    <div className='my-2'>
                        <Label className="" >Phone Number</Label>
                        <Input type="text" placeholder="9899999999"
                            value={input.phonenumber}
                            name={'phonenumber'}
                            onChange={changeEventHandler}
                        />
                    </div>

                    <div className='my-2'>
                        <Label className="" >Password</Label>
                        <Input type="password" placeholder="password"
                            value={input.password}
                            name={'password'}
                            onChange={changeEventHandler}
                        />
                    </div>

                    <div className='my-2'>
                        <h5 className=''>Select Category</h5>
                        <RadioGroup className="flex gap-4 justify-start">
                            <div className="flex items-center space-x-2">
                                <Input className="cursor-pointer " type="radio"
                                    name="role"
                                    value="student"
                                    checked={input.role === 'student'}
                                    onChange={changeEventHandler}
                                />
                                <Label htmlFor="Student">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input className="cursor-pointer " type="radio"
                                    name="role"
                                    value="recruiter"
                                    checked={input.role === 'recruiter'}
                                    onChange={changeEventHandler}
                                />
                                <Label htmlFor="Recruiter">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="flex items-center gap-2 ">
                        <Label className="" >Profile</Label>
                        <Input accept="image/*" type="file" className="cursor-pointer"
                            onChange={changeFileHandler}
                        />
                    </div>

                    {loading ? (
                        <Button className="w-full my-4 text-center" disabled>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-4">
                            Create
                        </Button>
                    )}
                    <span>Already have an account?<Link to={'/login'} className='text-blue-600 font-semibold' >Login</Link></span>
                </form>
            </div>
        </div>
    )
}

export default SignUp