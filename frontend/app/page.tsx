"use client";
import { DataTable } from "@/components/data-table";
import SampleData from "./data.json";
import { ProfileForm } from "@/components/form-profile";
import { Button } from "@/components/ui/button";
import { UserRoundPlus } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [profiles, setProfiles] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const fetchData = async () => {
    const result = await axios.get(`${apiUrl}/api/UserProfiles/`);
    setProfiles(result.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="font-sans items-center justify-items-center min-h-screen p-5">
      <div className="flex flex-col gap-2 items-start">
        <ProfileForm
          trigger={
            <Button variant="outline" size="sm">
              <UserRoundPlus />
              Create
            </Button>
          }
        />
        <DataTable data={profiles} />
      </div>
    </div>
  );
}
