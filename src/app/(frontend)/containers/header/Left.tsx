"use client"
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const Left = () => {
  const router = useRouter();
  return (
    <div className="flex items-center gap-4">
      <Button className="bg-yellow-500 hover:bg-yellow-600" onClick={() => router.push("/login")}>Sign In </Button>
      <div className="relative">
        <ShoppingCart className="w-8 h-8 text-gray-800" />
        <p className="absolute -top-3 -right-0 text-yellow-600 text-xs font-bold w-5 h-5 flex items-center justify-center ">
          0
        </p>
      </div>
    </div>
  );
};

export default Left;
