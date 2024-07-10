"use client";

import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { searchAction } from "@/actions/search.action";
import { useServerAction } from "zsa-react";
import { Loader2Icon } from "lucide-react";
import SearchExampleBadge from "./search-example-badge";
import { toast } from "sonner"


const searchExamples = [
  "A quiet mountain village surrounded by hiking trails and vineyards",
  "A traditional Spanish town with winding cobblestone streets and local markets",
  "An adventure hub with rock climbing, surfing and mountain biking opportunities",
  "A relaxing beach town with golden sand, turquoise waters and laid-back vibes",
  "A vibrant city with world-class museums, art galleries and trendy restaurants",
];

type Props = {
  className?: string;
};

const SearchForm = (props: Props) => {
  const [inputValue, setInputValue] = React.useState("");

  const { isPending, executeFormAction, isError } =
    useServerAction(searchAction);

  if (isError) {
    toast("This is embarrassing, but something went wrong. Please try again later.")
  }

  if (isPending) {
    toast("Searching for your perfect Spanish escape. Please be patient.")
  }

  return (
    <>
      <form
        className={cn(
          "flex flex-row space-x-2 w-full items-center",
          props.className
        )}
        action={executeFormAction}
      >
        <Input
          className="text-xl h-16"
          placeholder="A small village on the coast of Spain to relax..."
          name="query"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button type="submit" className="h-16 w-28 text-lg" disabled={isPending || !inputValue}>
          {isPending ? <Loader2Icon size={24} className="animate-spin" /> : 'Search'}
        </Button>
      </form>
      <div className="flex flex-row flex-wrap gap-4">
        {searchExamples.map((example) => (
          <SearchExampleBadge
            key={example}
            text={example}
            onClick={() => setInputValue(example)}
          />
        ))}
      </div>
    </>
  );
};

export default SearchForm;
