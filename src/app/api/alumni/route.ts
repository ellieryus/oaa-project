import { NextResponse } from "next/server";
import { AlumnusService } from "@/server/modules/alumni/alumni.service";

/**
 * GET /api/alumni
 * Returns all alumni profiles (paginated in production).
 */
export async function GET() {
  try {
    const alumni = await AlumnusService.getAllAlumni();
    return NextResponse.json({ alumni });
  } catch {
    return NextResponse.json({ error: "Failed to fetch alumni." }, { status: 500 });
  }
}
