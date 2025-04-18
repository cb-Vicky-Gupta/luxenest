"use client";

import React, { useEffect, useState } from "react";
import { CustomTable } from "@/components/shared/CustomTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Plus, Pencil, Trash2 } from "lucide-react";
import { columns, subColumns } from "./data";
import { useCloudinaryUpload } from "@/app/hooks/useCloudinaryUpload";
import { CldImage } from "next-cloudinary";
import { addCategory, addSubCategory, getCategory, getSubCategory } from "../api/apiCall";
import { GetCategoryResponse } from "@/interface";
import { Loader2 } from "lucide-react"; // ✅ Optional: Lucide spinner icon
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

const SuperCategory = ({isSubCat}:{isSubCat:boolean}) => {
  const [page, setPage] = useState(1);
  const [state, setState] = useState({ name: "", image: "" });
  const [category, setCategory] = useState<any[]>([]);
  const [subCategory, setSubCategory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [categoryOption, setCategoryOption] = useState<any[]>([])
  const [addCat, setAddCat]= useState("")
  const { uploadImage, uploading, publicId } = useCloudinaryUpload();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const res = await uploadImage(file, "luxenext");
    if (res) {
      setState({ ...state, image: res?.secure_url });
    }
  };

  const handleDelete = async (id: number) => {
    console.log("Delete clicked for ID:", id);
    // await deleteCategory(id);
    fetchCategory();
  };

  const handleEdit = (id: number) => {
    console.log("Edit clicked for ID:", id);
  };

  const fetchCategory = async () => {
    try {
      setLoading(true);
      const res = await getCategory();
      if (res?.data) {
        const rows = res.data.map((d, index: number) => ({
          sNo: index + 1,
          categoryName: d.name,
          image: (
            <a
              href={d.image}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              View
            </a>
          ),
          actions: (
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleEdit(d.id)}
              >
                <Pencil size={16} />
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDelete(d.id)}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          ),
        }));
        setCategoryOption(res?.data.map((d)=>({
          label : d?.name,
          value: d?.id
        })))
        setCategory(rows);
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    } finally {
      setLoading(false);
    }
  };
  const fetchSubCategory = async ()=>{
    try {
      const res = await getSubCategory()
      if (res?.data) {
        const rows = res.data.map((d, index: number) => ({
          sNo: index + 1,
          subCategoryName: d.name,
          category : d?.category?.name,
          actions: (
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleEdit(d.id)}
              >
                <Pencil size={16} />
              </Button>
              <Button
                size="sm"
                variant="destructive"
                onClick={() => handleDelete(d.id)}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          ),
        }));
        setSubCategory(rows);
      }
    } catch (error) {
      
    }
  }

  const addCategoryDB = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await addCategory(state);
    setState({ name: "", image: "" });
    fetchCategory();
  };
const addSubCatDB = async(e:React.FormEvent)=>{
  e.preventDefault()

  const res = await addSubCategory({
    "name": state.name,
    "categoryId": parseInt(addCat)
})
fetchSubCategory()
}
  useEffect(() => {
    
    isSubCat && fetchSubCategory() 
    fetchCategory();
  }, []);
console.log(categoryOption)
  return (
    <div className="px-6">
      <Dialog>
        <div className="flex justify-between mt-6 mb-4">
          <div className="flex items-center ">
            <p className="font-bold text-lg w-full">{isSubCat ? "Sub-Category": "Category"}</p>
            <Input placeholder={isSubCat ? "Search Sub-Category": "Search Category"} />
          </div>
          <DialogTrigger asChild>
            <Button className="bg-yellow-400 text-black hover:bg-yellow-500">
              <Plus size={18} />
            </Button>
          </DialogTrigger>
        </div>

        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add {isSubCat && "Sub-"}Category</DialogTitle>
            <DialogDescription>
              Fill in the details to add a new {isSubCat &&"sub-"}category.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={isSubCat ? addSubCatDB :addCategoryDB}>
            <div className="space-y-4 py-2">
              <div>
                <Label htmlFor="categoryName">
                  Name<span className="text-red-500">*</span>
                </Label>
                <Input
                  id={isSubCat ? "subCategory":"categoryName"}
                  placeholder={`Enter ${isSubCat &&"Sub-"}Category Name`}
                  name="name"
                  value={state.name}
                  onChange={(e) => setState({ ...state, name: e.target.value })}
                />
              </div>
{isSubCat? 
 <div>
 <Label htmlFor="categoryName">
   Select Category<span className="text-red-500">*</span>
 </Label>
 <Select onValueChange={(value) => setAddCat(value)}>
  <SelectTrigger>
    <SelectValue placeholder="Select Category" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Category</SelectLabel>
      {categoryOption?.map((d) => (
        <SelectItem key={d?.value} value={d?.value.toString()}>
          {d?.label}
        </SelectItem>
      ))}
    </SelectGroup>
  </SelectContent>
</Select>
</div>
:
              <div>
                <Label htmlFor="categoryImage">
                  Image<span className="text-red-500">*</span>
                </Label>
                <Input
                  id="categoryImage"
                  type="file"
                  onChange={handleFileChange}
                />
                {uploading && <p>Uploading...</p>}
                {publicId && (
                  <div className="flex justify-center pt-2">
                    <CldImage
                      src={publicId}
                      width="200"
                      height="200"
                      crop={{ type: "auto", source: true }}
                      alt="Uploaded"
                    />
                  </div>
                )}
              </div>}
            </div>
            <DialogFooter>
              <Button type="submit">Add</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="animate-spin mr-2 h-6 w-6 text-gray-500" />
          <span className="text-gray-600">Loading {isSubCat &&"sub-"}categories...</span>
        </div>
      ) : (
        <CustomTable columns={isSubCat ? subColumns :columns} data={isSubCat ?subCategory: category} />
      )}
    </div>
  );
};

export default SuperCategory;
