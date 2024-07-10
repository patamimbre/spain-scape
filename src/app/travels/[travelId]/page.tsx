import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { travelsStorage } from '@/lib/storage/kv'
import { TravelWithImages } from '@/schemas/travel.schema'
import { ChevronLeftIcon, Loader2Icon, MapPinIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Suspense } from "react"

type Props = {
  params: {
    travelId: string
  }
}

const TravelsPage = async (props: Props) => {
  return (
    <main className="flex flex-col p-16 gap-2">
      <div className="flex flex-row justify-between">
        <h2 className="text-3xl font-semibold">SpainScape recommends you...</h2>
        <Button variant="secondary" className="text-lg" asChild>
          <Link href="/">
            <ChevronLeftIcon size={24} className="mr-2"/>
            Perform new search
          </Link>
        </Button>
      </div>
      <Suspense fallback={<TravelsPageLoader />}>
        <TravelsList travelId={props.params.travelId} />
      </Suspense>
    </main>
  )
}

const TravelsPageLoader = () => {
  return <div className="flex items-center justify-center h-64">
    <Loader2Icon size={128} className="animate-spin" />
  </div>
}

const TravelsList = async ({ travelId }: { travelId: string }) => {
  const travels = await travelsStorage.getItem<TravelWithImages[]>(travelId);

  if (!travels || travels.length === 0) {
    return <div>No travels found</div>
  }

  return (
    <div className="grid gap-6 py-4 sm:py-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
      {
        travels.map((travel, index) => (
          <TravelItem key={`${travel.name}-${index}`} travel={travel} />
        ))
      }
    </div>
  )
}

const TravelItem = ({ travel }: { travel: TravelWithImages }) => {
  return (
    <Card className="flex flex-col">
      <CardHeader className="p-0">
        <Image
          src={travel.images[0].url}
          alt={travel.images[0].title}
          className="rounded-t-lg"
          width={600}
          height={400}
        />
      </CardHeader>
      <CardContent className="mt-6 flex-grow flex flex-col">
        <CardTitle>{travel.name}</CardTitle>
        <div className="my-4 flex flex-row items-center space-x-1 text-muted-foreground font-semibold">
          <MapPinIcon size={18} className="text-primary"/>
          <Link href={`https://www.google.com/search?q=${travel.location}`} target="_blank" rel="noreferrer">
            <p className="text-md">{travel.location}</p>
          </Link>
        </div>
        <CardDescription className="text-md flex-grow">{travel.description}</CardDescription>
        <div className="flex flex-wrap gap-1 my-4">
          {travel.tags.map((tag) => (
            <Badge variant="secondary" key={tag}>{tag}</Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default TravelsPage