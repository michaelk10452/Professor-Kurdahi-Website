import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabaseClient"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = Number.parseInt(searchParams.get("page") || "1", 10)
  const sort = searchParams.get("sort") || "recent"
  const pageSize = 10

  try {
    let query = supabase
      .from("publications")
      .select("*, link", { count: "exact" })  // Added link to the select

    // Apply sorting based on the sort parameter
    if (sort === "cited") {
      query = query.order("citations", { ascending: false })
    } else {
      query = query.order("year", { ascending: false })
    }

    const { data, error, count } = await query
      .range((page - 1) * pageSize, page * pageSize - 1)

    if (error) throw error

    return NextResponse.json({
      publications: data,
      totalCount: count,
      currentPage: page,
      totalPages: Math.ceil((count || 0) / pageSize),
    })
  } catch (error) {
    console.error("Error fetching publications:", error)
    return NextResponse.json({ error: "Failed to fetch publications" }, { status: 500 })
  }
}