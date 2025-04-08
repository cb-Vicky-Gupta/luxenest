"use client"
import { authRegister } from '@/apis/apiCalls/users';
import Linebreak from '@/components/line-break';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { avatarLinks } from '@/lib/avatars';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React, { ChangeEvent, useState } from 'react';
import { toast } from 'sonner';


const Register = () => {
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const logoUrl = process.env.NEXT_PUBLIC_LOGO_URL || '/vercel.svg';
  const [state, setState] = useState({
    name: "",
    email : "",
    image: "",
    roleId: 3,
    password : ""
  })
  const handleChange = (e: ChangeEvent<HTMLInputElement>, name: string) => {
      setState({ ...state, [name]: e.target.value });
    };
   const handleSubmit = async () => {
    let _state = {...state, image : selectedAvatar}
    console.log(_state)
      try {
        const res = await authRegister(_state);
        console.log(res)
        if(res){
          redirect('/login')
          toast("Register successfully")
        }
      } catch (error) {
        console.error("Registration failed:", error);
      }
      finally{
  
      }
    };
  return (
    <div className="flex flex-col items-center p-4 pb-6">
      <Image
        src={logoUrl}
        width={150}
        height={100}
        alt="Logo"
        priority
        unoptimized={true} 
      />
      <div className="border w-[400px]  mt-4 p-4 rounded-lg shadow-lg bg-white">
        <p className="text-xl font-medium mb-4">Create Account</p>

        {/* Avatar Selection */}
        <Label className="text-black text-lg font-bold mb-2">Select Your Avatar</Label>
        <Button onClick={() => setIsModalOpen(true)} className="mb-4 w-full bg-gray-200 hover:bg-gray-300 text-black">
          Choose Avatar
        </Button>
        {selectedAvatar && (
          <div className="flex justify-center mb-4">
            <Image src={selectedAvatar} alt="Selected Avatar" width={56} height={56} className="rounded-full" />
          </div>
        )}

        {/* Form Fields */}
        <Label className="text-black text-lg font-bold">Enter your Name</Label>
        <Input className="mb-4" onChange={(e)=>handleChange(e, "name")} placeholder='Enter Your Name' />

        <Label className="text-black text-lg font-bold">Enter Your Email</Label>
        <Input className="mb-4" onChange={(e)=>handleChange(e, "email")} placeholder='Enter Your Email' />

        <Label className="text-black text-lg font-bold">Enter Password</Label>
        <Input type="password" className="mb-4" onChange={(e)=>handleChange(e, "password")} placeholder='Enter Your Password'/>

        {/* Continue Button */}
        <Button onClick={handleSubmit} className="bg-yellow-400 hover:bg-yellow-500 duration-300 transition text-black rounded-2xl w-full my-4">
          Register
        </Button>

        {/* Agreement Text */}
        <span className="text-sm text-center block mb-4">
          By continuing, you agree to{' '}
          <a href="#" className="text-blue-600 underline">
            Luxenest's Conditions
          </a>{' '}
          of Use and{' '}
          <a href="#" className="text-blue-600 underline">
            Privacy Notice.
          </a>
        </span>

        <Linebreak />

        {/* Already Registered Link */}
        <div className="pt-4 text-center">
          <p>
            Already have an account?{' '}
            <Link className="text-blue-600 underline" href="/login">
              Login here
            </Link>
          </p>
        </div>
      </div>

      {/* Avatar Modal */}
      {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-11/12 max-w-md">
            <h2 className="text-xl font-bold mb-4 text-center">Select Your Avatar</h2>
            <div className="max-h-[50vh] overflow-y-auto thin-scrollbar">
              <div className="grid grid-cols-3 gap-4">
                {avatarLinks.map((link, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedAvatar(link);
                      setIsModalOpen(false);
                    }}
                    className={`w-20 h-20 border-2 rounded-full overflow-hidden transition hover:scale-110 ${selectedAvatar === link ? ' border-yellow-500' : 'border-gray-300'}`}
                  >
                    <Image src={link} alt={`Avatar ${index + 1}`} width={80} height={80} />
                  </button>
                ))}
              </div>
            </div>
            <Button onClick={() => setIsModalOpen(false)} className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white">
              Close
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Register;
