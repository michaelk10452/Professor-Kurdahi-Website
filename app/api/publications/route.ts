import { NextResponse } from "next/server"
import { readFileSync } from "fs"
import { join } from "path"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = Number.parseInt(searchParams.get("page") || "1", 10)
  const sort = searchParams.get("sort") || "recent"
  const pageSize = 10

  try {
    // Read publications from JSON file
    const filePath = join(process.cwd(), "data", "publications.json")
    const fileContent = readFileSync(filePath, "utf-8")
    const jsonData = JSON.parse(fileContent)
    let publications = jsonData.publications

    // Apply sorting based on the sort parameter
    if (sort === "cited") {
      publications = publications.sort((a: any, b: any) => b.citations - a.citations)
    } else {
      publications = publications.sort((a: any, b: any) => b.year - a.year)
    }

    // Apply pagination
    const startIndex = (page - 1) * pageSize
    const endIndex = page * pageSize
    const paginatedPublications = publications.slice(startIndex, endIndex)
    const totalCount = publications.length

    return NextResponse.json({
      publications: paginatedPublications,
      totalCount: totalCount,
      currentPage: page,
      totalPages: Math.ceil(totalCount / pageSize),
    })
  } catch (error) {
    console.error("Error fetching publications:", error)
    return NextResponse.json({ error: "Failed to fetch publications" }, { status: 500 })
  }
}