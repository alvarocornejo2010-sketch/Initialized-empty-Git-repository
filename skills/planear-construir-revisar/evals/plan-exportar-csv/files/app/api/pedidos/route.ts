import { NextResponse, type NextRequest } from "next/server";
import { obtenerPedidos, type Estado } from "@/lib/pedidos";

export async function GET(request: NextRequest) {
  const estado = request.nextUrl.searchParams.get("estado") as Estado | null;
  const pedidos = await obtenerPedidos(estado ?? undefined);
  return NextResponse.json(pedidos);
}
