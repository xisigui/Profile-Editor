"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { format, differenceInYears } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { IconCalendar } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import * as React from "react";
import { axiosInstance, cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2Icon } from "lucide-react";

interface ProfileFormProps {
  profileId?: number | null;
  initialData?: {
    id: number;
    name: string;
    email: string;
    gender: string;
    birthday: Date;
    age: number;
  };
  trigger: React.ReactNode;
}

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email(),
  gender: z.string().min(1, "Invalid Gender"),
  birthday: z.date(),
  age: z
    .int()
    .min(1, "Please select a valid date of birth to calculate the age.")
    .max(99, "Age must be between 1 and 99"),
});

export function ProfileForm({ initialData, trigger }: ProfileFormProps) {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      name: "",
      email: "",
      gender: "",
      birthday: new Date(),
      age: 0,
    },
  });

  const { control, handleSubmit, watch, setValue } = form;
  const birthday = watch("birthday");

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const isEdit = Boolean(initialData);

    const url = isEdit
      ? `/api/UserProfiles/${initialData?.id}`
      : "/api/UserProfiles";
    const method = isEdit ? "put" : "post";
    try {
      const response = await axiosInstance({ method, url, data });
      toast.custom((t) => (
        <Alert>
          <CheckCircle2Icon />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>{`Profile has been ${
            isEdit ? "updated" : "added"
          } successfully.`}</AlertDescription>
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

  useEffect(() => {
    if (birthday && typeof birthday === "string") {
      setValue("birthday", new Date(birthday));
    }
  }, [birthday, setValue]);

  useEffect(() => {
    if (birthday) {
      const age = differenceInYears(new Date(), new Date(birthday));
      setValue("age", age);
    }
  }, [birthday, setValue]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || <Button>Open Dialog</Button>}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Profile" : "Create New Profile"}
          </DialogTitle>
          <DialogDescription>
            Ensure that you review all changes carefully before saving.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormMessage />
                  <FormControl>
                    <Input placeholder="Name" {...field}></Input>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormMessage />
                  <FormControl>
                    <Input placeholder="name@example.com" {...field}></Input>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormMessage />
                  <FormControl>
                    <Input placeholder="Gender" {...field}></Input>
                  </FormControl>
                </FormItem>
              )}
            />

            <div className="flex space-x-4">
              <FormField
                control={control}
                name="birthday"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of birth</FormLabel>
                    <FormMessage />
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            type="button"
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <IconCalendar className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          onSelect={field.onChange}
                          captionLayout="dropdown"
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="age"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Age</FormLabel>
                    <FormMessage />
                    <FormControl>
                      <Input placeholder="Age" {...field} readOnly />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full h-[40px]">
              Submit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
