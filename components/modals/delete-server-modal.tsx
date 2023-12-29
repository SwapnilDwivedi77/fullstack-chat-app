"use client"
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog"
import { useModal } from '@/hooks/use-modal-store'
import { Button } from "@/components/ui/button";





export const DeleteServerModal = () => {

    const {onOpen,isOpen,onClose,type,data} = useModal();
    const [isLoading,setIsLoading]=useState(false);
    const router = useRouter()
    const {server} = data
    

    const isModalOpen = isOpen && type ==="deleteServer"

    const onConfirm = async()=> {
      try {
        setIsLoading(true)
        await axios.delete(`/api/servers/${server?.id}/leave`);
        onClose();
        router.refresh()
        router.push('/')
        
      } catch (error) {
        
      }
      finally{
        setIsLoading(false)
      }

    }
   

    return (
      <>
        <Dialog open={isModalOpen} onOpenChange={onClose}>
          <DialogContent className="bg-white text-black p-0 overflow-hidden">
            <DialogHeader className="pt-8 px-6">
              <DialogTitle className="text-2xl text-center font-bold">
                Delete Server
              </DialogTitle>
              <DialogDescription className="text-center text-zinc-500">
                Are you sure you want to do this ? <br/> <span className="font-semibold text-indigo-500"> {server?.name}</span> will be permanently deleted ?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="bg-grey-100 px-6 py-4">
              <div className="flex items-center justify-between w-full">
                <Button disabled={isLoading} onClick={()=>{onClose()}} variant={"ghost"}>
                  Cancel
                </Button>
                <Button disabled={isLoading} onClick={()=>onConfirm()} variant={"primary"}>
                  Confirm
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
    );
}