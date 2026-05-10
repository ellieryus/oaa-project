import { NextResponse } from "next/server";
import { RequestService } from "@/server/modules/requests/request.service";

/**
 * GET /api/requests
 * Returns the alumnus inbox (pending + upcoming + all).
 */
export async function GET() {
  try {
    const inbox = await RequestService.getAlumnusInbox();
    return NextResponse.json(inbox);
  } catch {
    return NextResponse.json({ error: "Failed to fetch requests." }, { status: 500 });
  }
}
