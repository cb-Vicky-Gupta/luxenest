
"use client"
import { authLogin } from "@/apis/apiCalls/users";
import Linebreak from "@/components/line-break";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import Link from "next/link";
import React, { ChangeEvent, useState } from "react";
import { toast } from "sonner";
const Login = () => {
  const [state, setState] = useState({
    email : "",
    password : ""
  })
  const logoUrl = process.env.NEXT_PUBLIC_LOGO_URL || '/vercel.svg';
  const handleChange = (e: ChangeEvent<HTMLInputElement>, name: string) => {
    setState({ ...state, [name]: e.target.value });
  };
  const handleSubmit = async () => {
    try {
      const res = await authLogin(state);
      console.log(res)
      if(res){

        toast(res?.msg)
      }
    } catch (error) {
      console.error("Login failed:", error);
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
      <div className="border w-[400px]  mt-4 p-4 rounded-lg">
        <p className="text-xl font-medium mb-4">Sign in or create account</p>
        <Label className="text-black text-lg font-bold ">
          Enter mobile number or email
        </Label>
        <Input name="email" value={state.email} onChange={(e)=>handleChange(e, "email")}/>
        <Label className="text-black text-lg font-bold mt-4">
          Enter Password
        </Label>
        <Input type="password" name="password" value={state.password} onChange={(e)=>handleChange(e, "password")}/>
        <Button onClick={handleSubmit} className="bg-yellow-400 hover:bg-yellow-500 duration-300 transition text-black rounded-2xl w-full my-4">
          Continue
        </Button>
        <span>
          By continuing, you agree to{" "}
          <a href="#" className="text-blue-600 underline">
            Luxenest's Conditions
          </a>{" "}
          of Use and{" "}
          <a href="#" className="text-blue-600 underline">
            Privacy Notice.
          </a>
        </span>
        <Linebreak />
        <div className="pt-4">
          <p>
            Don't have an account?{" "}
            <Link className="text-blue-600 underline" href={"/register"}>
              register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
