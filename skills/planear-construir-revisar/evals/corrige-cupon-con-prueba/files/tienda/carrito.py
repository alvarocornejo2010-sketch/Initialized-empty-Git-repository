from dataclasses import dataclass

COSTE_ENVIO = 4.99


@dataclass
class Linea:
    nombre: str
    precio: float
    cantidad: int


def subtotal(lineas):
    return sum(l.precio * l.cantidad for l in lineas)


def aplicar_cupon(total, porcentaje):
    """Devuelve el total tras aplicar un cupón porcentual."""
    if porcentaje < 0 or porcentaje >= 100:
        return total
    return total * (1 - porcentaje / 100)


def envio(total):
    if total > 50:
        return 0
    return COSTE_ENVIO


def formatear_precio(x):
    s = str(round(x, 2))
    if "." not in s:
        s = s + ".00"
    else:
        if len(s.split(".")[1]) == 1:
            s = s + "0"
    return s.replace(".", ",") + " €"


def total_carrito(lineas, cupon=0):
    t = subtotal(lineas)
    t = aplicar_cupon(t, cupon)
    return round(t + envio(t), 2)
