import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

const Middle = () => {
  return (
    <div className="flex gap-4 items-center border rounded min-w-[500px] pr-2">
      <Input
        className="border-none outline-none focus-visible:ring-0"
        placeholder="Search on Luxenest.in"
      />
      <Search className="cursor-pointer" />
    </div>
  );
};

export default Middle;
