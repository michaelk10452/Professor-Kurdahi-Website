"use client"

import { useEffect, useState } from "react"
import { Book } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Publication {
  id: number
  title: string
  authors: string
  venue: string
  year: number
  citations: number
  link: string
}

interface PublicationsResponse {
  publications: Publication[]
  totalCount: number
  currentPage: number
  totalPages: number
}

type SortOption = "recent" | "cited"

export default function PublicationsList() {
  const [publications, setPublications] = useState<Publication[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [sortBy, setSortBy] = useState<SortOption>("recent")

  const fetchPublications = async (page: number, sort: SortOption) => {
    try {
      const response = await fetch(`/api/publications?page=${page}&sort=${sort}`)
      if (!response.ok) {
        throw new Error("Failed to fetch publications")
      }
      const data: PublicationsResponse = await response.json()
      return data
    } catch (err) {
      console.error("Error fetching publications:", err)
      throw err
    }
  }

  useEffect(() => {
    setIsLoading(true)
    setPublications([]) // Clear existing publications when sort changes
    setCurrentPage(1)  // Reset to first page when sort changes
    
    fetchPublications(1, sortBy)
      .then((data) => {
        setPublications(data.publications)
        setTotalPages(data.totalPages)
        setIsLoading(false)
      })
      .catch((err) => {
        setError("Failed to load publications")
        setIsLoading(false)
      })
  }, [sortBy])

  const loadMore = async () => {
    if (currentPage < totalPages) {
      setIsLoading(true)
      try {
        const nextPage = currentPage + 1
        const data = await fetchPublications(nextPage, sortBy)
        setPublications((prevPublications) => [...prevPublications, ...data.publications])
        setCurrentPage(nextPage)
        setIsLoading(false)
      } catch (err) {
        setError("Failed to load more publications")
        setIsLoading(false)
      }
    }
  }

  const PublicationCard = ({ publication }: { publication: Publication }) => (
    <a 
      href={publication.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block"
    >
      <div className="flex items-start bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 hover:bg-gray-50">
        <Book className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0" />
        <div>
          <p className="text-lg font-semibold hover:text-blue-600 transition-colors">{publication.title}</p>
          <p className="text-sm text-gray-600">{publication.authors}</p>
          <p className="text-sm text-gray-500">
            {publication.venue}, {publication.year}
          </p>
          <p className="text-sm text-blue-600 mt-2">Citations: {publication.citations}</p>
        </div>
      </div>
    </a>
  )

  if (error) return <div className="text-center text-xl text-red-500">Error: {error}</div>

  return (
    <div>
      <Tabs 
        defaultValue="recent" 
        className="w-full"
        onValueChange={(value) => setSortBy(value as SortOption)}
      >
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
          <TabsTrigger value="recent">Most Recent</TabsTrigger>
          <TabsTrigger value="cited">Most Cited</TabsTrigger>
        </TabsList>
        
        <TabsContent value="recent" className="space-y-6">
          {isLoading && publications.length === 0 ? (
            <div className="text-center">Loading publications...</div>
          ) : (
            <>
              {publications.map((pub) => (
                <PublicationCard key={pub.id} publication={pub} />
              ))}
              {currentPage < totalPages && (
                <div className="text-center mt-8">
                  <button
                    onClick={loadMore}
                    disabled={isLoading}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    {isLoading ? "Loading..." : "Show More"}
                  </button>
                </div>
              )}
            </>
          )}
        </TabsContent>

        <TabsContent value="cited" className="space-y-6">
          {isLoading && publications.length === 0 ? (
            <div className="text-center">Loading publications...</div>
          ) : (
            <>
              {publications.map((pub) => (
                <PublicationCard key={pub.id} publication={pub} />
              ))}
              {currentPage < totalPages && (
                <div className="text-center mt-8">
                  <button
                    onClick={loadMore}
                    disabled={isLoading}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                    {isLoading ? "Loading..." : "Show More"}
                  </button>
                </div>
              )}
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}