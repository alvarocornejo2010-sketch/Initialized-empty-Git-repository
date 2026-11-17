import datos from "@/data/pedidos.json";

export type Estado = "pendiente" | "enviado" | "entregado" | "cancelado";

export interface Pedido {
  id: string;
  fecha: string; // ISO 8601
  cliente: string;
  email: string;
  notas: string;
  importe: number; // en céntimos
  estado: Estado;
}

export async function obtenerPedidos(estado?: Estado): Promise<Pedido[]> {
  const pedidos = datos as Pedido[];
  const filtrados = estado ? pedidos.filter((p) => p.estado === estado) : pedidos;
  return [...filtrados].sort((a, b) => b.fecha.localeCompare(a.fecha));
}

export function formatearImporte(centimos: number): string {
  return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(centimos / 100);
}
