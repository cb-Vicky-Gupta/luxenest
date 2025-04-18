"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { CustomTable } from "@/components/shared/CustomTable";
import { authRegister } from "@/apis/apiCalls/users";
import { toast } from "sonner";
import { getUsersList } from "../api/apiCall";
import { columns } from "./data";

const SuperSellers = ({isUser}:{isUser:boolean}) => {
  const [sellers, setSellers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setState((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const fetchSellers = async () => {
    try {
      setLoading(true);
      const payload = {
        page: 1,
        limit: 10,
        search: "",
        roleId: isUser ? 3 : 2,
      };

      const res = await getUsersList(payload);
      if (res?.data) {
        const formatted = res.data.map((s: any, i: number) => ({
          sNo: i + 1,
          name: s.name,
          email: s.email,
          avatar: (
            <img
              src={s.image}
              alt="avatar"
              className="w-10 h-10 rounded-full object-cover"
            />
          ),
          actions: (
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => console.log("Edit", s.id)}
              >
                <Pencil size={16} />
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => console.log("Delete", s.id)}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          ),
        }));

        setSellers(formatted);
      }
    } catch (err) {
      console.error("Error fetching sellers", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...state,
        roleId: 2,
        image:
          "https://res.cloudinary.com/ddfhmpnui/image/upload/v1744556417/luxenest/avatars/mmyhil7gumchewjkuw3q.png",
      };
      const res = await authRegister(payload);
      if (res) {
        toast.success("Seller registered");
        setState({ name: "", email: "", password: "" });
        fetchSellers();
      }
    } catch (err) {
      console.error("Registration error", err);
    }
  };

  useEffect(() => {
    fetchSellers();
  }, []);

  return (
    <div className="px-6">

      <Dialog>
        <div className="flex justify-between mt-6 mb-4">
          <p className="font-bold text-lg">{isUser ? "Users" : "Sellers"}</p>
          {
            !isUser && 
          <DialogTrigger asChild>
            <Button className="bg-yellow-400 text-black hover:bg-yellow-500">
              <Plus size={18} className="mr-2" />
              Add Seller
            </Button>
          </DialogTrigger>
}
        </div>

        <DialogContent className="sm:max-w-[500px]">
          
          
          <DialogHeader>
            <DialogTitle>Add Seller</DialogTitle>
            <DialogDescription>Fill in seller details</DialogDescription>
          </DialogHeader>

          <form onSubmit={handleRegister}>
            <div className="space-y-4 py-2">
              <div>
                <Label>Name</Label>
                <Input
                  placeholder="Seller Name"
                  value={state.name}
                  onChange={(e) => handleChange(e, "name")}
                />
              </div>

              <div>
                <Label>Email</Label>
                <Input
                  placeholder="Email"
                  value={state.email}
                  onChange={(e) => handleChange(e, "email")}
                />
              </div>

              <div>
                <Label>Password</Label>
                <Input
                  type="password"
                  placeholder="Password"
                  value={state.password}
                  onChange={(e) => handleChange(e, "password")}
                />
              </div>
            </div>

            <DialogFooter>
              <Button type="submit">Add Seller</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Data Table */}
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="animate-spin mr-2 h-6 w-6 text-gray-500" />
          <span className="text-gray-600">Loading sellers...</span>
        </div>
      ) : (
        <CustomTable
          columns={columns}
          data={sellers}
        />
      )}
    </div>
  );
};

export default SuperSellers;
