import { NextResponse } from "next/server";
import { lookup } from "mime-types";
import { githubAuthHeaders, githubContentApiUrl } from "@/lib/data/config";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ path: string[] }> },
) {
  const { path } = await params;
  const assetPath = path.join("/");

  const res = await fetch(githubContentApiUrl(assetPath), {
    headers: githubAuthHeaders(),
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    return new NextResponse("Asset no encontrado", { status: res.status });
  }

  const contentType = lookup(assetPath) || "application/octet-stream";

  const body = await res.arrayBuffer();

  return new NextResponse(body, {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": "inline",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
