import React, { useState } from 'react';
import Navbar from '../common/Navbar';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';

const Login = () => {
  const [input, setInput] = useState({
    email: '',
    password: '',
    role: '',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loading = useSelector((store) => store.auth.loading); // Make sure to use the correct path to `loading` in the auth slice

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', input.email);
    formData.append('password', input.password);
    formData.append('role', input.role);

    try {
      dispatch(setLoading(true));

      const res = await axios.post(`${USER_API_END_POINT}/login`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate('/');
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || 'An error occurred'); // Added a default message if `error.response` is undefined
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex justify-center max-w-7xl mx-auto items-center">
        <form onSubmit={submitHandler} className="w-1/2 border border-gray-200 rounded p-4">
          <h1 className="font-semibold text-xl mb-5">Login</h1>

          <div className="my-2">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              placeholder="mail@example.com"
              value={input.email}
              name="email"
              id="email"
              onChange={changeEventHandler}
            />
          </div>

          <div className="my-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              placeholder="password"
              value={input.password}
              name="password"
              id="password"
              onChange={changeEventHandler}
            />
          </div>

          <div className="my-2">
            <h5>Select Category</h5>
            <RadioGroup className="flex gap-4 justify-start">
              <div className="flex items-center space-x-2">
                <Input
                  className="cursor-pointer"
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}
                />
                <Label htmlFor="student">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  className="cursor-pointer"
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === 'recruiter'}
                  onChange={changeEventHandler}
                />
                <Label htmlFor="recruiter">Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          {loading ? (
            <Button className="w-full my-4 text-center" disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full my-4">
              Login
            </Button>
          )}
          <span>
            Don't have an account?{' '}
            <Link to="/signUp" className="text-blue-600 font-semibold">
              SignUp
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
