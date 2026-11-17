from tienda.carrito import Linea, aplicar_cupon, envio, subtotal, total_carrito


def test_subtotal():
    assert subtotal([Linea("taza", 8.0, 2), Linea("libro", 20.0, 1)]) == 36.0


def test_cupon_del_10():
    assert aplicar_cupon(200, 10) == 180


def test_cupon_negativo_se_ignora():
    assert aplicar_cupon(200, -5) == 200


def test_envio_gratis_en_pedidos_grandes():
    assert envio(80) == 0


def test_total_con_envio():
    assert total_carrito([Linea("taza", 8.0, 2)]) == 20.99
