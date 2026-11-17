import { formatearImporte, type Pedido } from "@/lib/pedidos";

export function TablaPedidos({ pedidos }: { pedidos: Pedido[] }) {
  if (pedidos.length === 0) {
    return <p>No hay pedidos con este filtro.</p>;
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Pedido</th>
          <th>Fecha</th>
          <th>Cliente</th>
          <th>Importe</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        {pedidos.map((p) => (
          <tr key={p.id}>
            <td>{p.id}</td>
            <td>{new Date(p.fecha).toLocaleDateString("es-ES")}</td>
            <td>{p.cliente}</td>
            <td>{formatearImporte(p.importe)}</td>
            <td>{p.estado}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
