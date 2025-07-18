"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2Icon } from "lucide-react";
import { axiosInstance } from "@/lib/utils";

interface DeleteProfileDialogProps {
  profileId: number;
  dialogTrigger: React.ReactNode;
}

export function DeleteProfileDialog({
  profileId,
  dialogTrigger,
}: DeleteProfileDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  async function onSubmit() {
    try {
      const result = await axiosInstance.delete(
        `/api/UserProfiles/${profileId}`
      );
      toast.custom((t) => (
        <Alert>
          <CheckCircle2Icon />
          <AlertTitle>Success! Data have been deleted</AlertTitle>
          <AlertDescription>{`Profile has been deleted successfully.`}</AlertDescription>
        </Alert>
      ));
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again!");
    } finally {
      setIsOpen(false);
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete and
            remove this data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit" variant="destructive" onClick={onSubmit}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
