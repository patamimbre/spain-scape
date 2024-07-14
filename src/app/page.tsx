import { Barlow_Condensed } from "next/font/google";
import SearchForm from "@/components/search-form";
import { cn } from "@/lib/utils";

const barlowCondensed = Barlow_Condensed({ subsets: ["latin"], weight: "600" });


export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <div className="flex flex-col gap-8 max-w-2xl">
        <h1 className={cn([
          barlowCondensed.className,
          "text-8xl font-bold my-2",
        ])}>Spain Scape</h1>
        <p className="text-2xl text-opacity-85">
          Searching for an authentic Spanish escape? Our prompt-based system surfaces unique, tailored recommendations to inspire your next trip
        </p>
        <SearchForm className="mt-4" />
      </div>
    </main>
  );
}
