import { DataTable } from "@/components/data-table";
import SampleData from "./data.json";

export default function Home() {
  return (
    <div className="font-sans items-center justify-items-center min-h-screen p-8">
      <div className="flex flex-col gap-[32px] row-start-2 items-start">
        {/* Table With Data */}
        <DataTable data={SampleData} />

        {/* Empty Table */}
        <DataTable data={[]} />
      </div>
    </div>
  );
}
