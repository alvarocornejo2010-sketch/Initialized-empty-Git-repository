import { describe, expect, it } from "vitest";
import { obtenerPedidos } from "./pedidos";

describe("obtenerPedidos", () => {
  it("devuelve los pedidos del más reciente al más antiguo", async () => {
    const pedidos = await obtenerPedidos();
    const fechas = pedidos.map((p) => p.fecha);
    expect(fechas).toEqual([...fechas].sort().reverse());
  });

  it("filtra por estado", async () => {
    const pedidos = await obtenerPedidos("cancelado");
    expect(pedidos.every((p) => p.estado === "cancelado")).toBe(true);
  });
});
