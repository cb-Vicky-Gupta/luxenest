"use client"
import { CustomTable } from '@/components/shared/CustomTable'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Plus } from 'lucide-react'
import React, { useState } from 'react'
import { columns } from './data'
import { CustomPagination } from '@/components/shared/customPagination'
import { useCloudinaryUpload } from '@/app/hooks/useCloudinaryUpload'
import { CldImage } from 'next-cloudinary'

const SuperCategory = () => {
    const [page, setPage] = useState(1)
    const [state, setState] = useState({
      name :"",
      image : ""
    })
    const { uploadImage, uploading, publicId } = useCloudinaryUpload()

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return
     const res =  await uploadImage(file, "luxenext")
     if(res){
      setState({...state , image : res?.secure_url})
     }

    }
  const handleSubmit = async (e:any)=>{
    e.preventDefault()
    console.log(state)
  }
    
  return (
    <div className='px-6'>
     
      <Dialog>
      <div className='flex justify-between mt-6 mb-4'>
        <div className='flex items-center gap-4'>
          <p className='font-bold text-lg'>Category</p>
          <Input placeholder='Search Category' />
        </div>
        <DialogTrigger asChild>
          <Button className='bg-yellow-400 text-black hover:bg-yellow-500'>
            <Plus className='mr-2' size={18} />
            Add Category
          </Button>
        </DialogTrigger>
      </div>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
            <DialogDescription>
              Fill in the details to add a new category.
            </DialogDescription>
          </DialogHeader>
          <div className="">
            <div className="">
              <Label htmlFor="categoryName" className="text-right">
                Name<span className="text-red-500">*</span>
              </Label>
              <Input
                id="categoryName"
                placeholder="Enter Category Name"
                className="col-span-3"
                onChange={(e)=>setState({...state, name : e.target.value})}
              />
            </div>
            <div className="">
              <Label htmlFor="categoryImage" className="text-right">
                Image<span className="text-red-500">*</span>
              </Label>
              <Input
                id="categoryImage"
                type="file"
                className="col-span-3"
                onChange={handleFileChange}
              />
              {uploading && <p>Uploading...</p>}
              {publicId && (
                <div className='flex justify-center'>

               
        <CldImage
          src={publicId}
          width="200"
          height="200"
          crop={{ type: "auto", source: true }}
          alt="Uploaded"
        />
         </div>
      )}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" onClick={handleSubmit}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <CustomTable columns={columns} />
      <div className='flex w-full flex-end items-end'>
      <CustomPagination 
      className="flex justify-end pt-2" 
      onPageChange={(newPage) => setPage(newPage)} 
      currentPage={page} 
      totalPages={10} 
      />
      </div>
    </div>
  )
}

export default SuperCategory
