import { obtenerPedidos, type Estado } from "@/lib/pedidos";
import { TablaPedidos } from "./TablaPedidos";

export default async function PaginaPedidos({
  searchParams,
}: {
  searchParams: Promise<{ estado?: Estado }>;
}) {
  const { estado } = await searchParams;
  const pedidos = await obtenerPedidos(estado);

  return (
    <main>
      <h1>Pedidos</h1>
      <nav aria-label="Filtrar por estado">
        <a href="/pedidos">Todos</a>
        <a href="/pedidos?estado=pendiente">Pendientes</a>
        <a href="/pedidos?estado=enviado">Enviados</a>
        <a href="/pedidos?estado=entregado">Entregados</a>
        <a href="/pedidos?estado=cancelado">Cancelados</a>
      </nav>
      <TablaPedidos pedidos={pedidos} />
    </main>
  );
}
