import { NextResponse } from "next/server";
import { AlumnusService } from "@/server/modules/alumni/alumni.service";

type Props = { params: Promise<{ id: string }> };

/**
 * GET /api/alumni/[id]
 * Returns a single alumnus profile.
 */
export async function GET(_req: Request, { params }: Props) {
  const { id } = await params;

  try {
    const alumnus = await AlumnusService.getProfile(id);
    if (!alumnus) {
      return NextResponse.json({ error: "Alumnus not found." }, { status: 404 });
    }
    return NextResponse.json({ alumnus });
  } catch {
    return NextResponse.json({ error: "Failed to fetch alumnus." }, { status: 500 });
  }
}
