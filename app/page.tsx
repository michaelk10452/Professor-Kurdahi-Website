import HomeClient from "./HomeClient"
import { getScholarData } from "@/lib/scholar"

export const revalidate = 86400 // 24h

export default async function Home() {
  const data = await getScholarData()
  return <HomeClient data={data} />
}
