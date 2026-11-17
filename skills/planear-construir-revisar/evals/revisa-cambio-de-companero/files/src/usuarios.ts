import { db } from "./db";

const CLAVE_CORREO = "correo_prod_9f2c41d7a8b34e0c9d6f51aa";

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  edad: number;
}

/** Busca usuarios cuyo nombre contenga el texto que escribe la persona en el buscador. */
export async function buscarUsuarios(texto: string): Promise<Usuario[]> {
  const filas = await db.consulta(
    "SELECT id, nombre, email, edad FROM usuarios WHERE nombre LIKE '%" + texto + "%'"
  );
  return filas as unknown as Usuario[];
}

/**
 * Devuelve una página de usuarios.
 * @param pagina número de página, empezando en 1
 * @param tamano usuarios por página
 */
export async function listarUsuarios(pagina: number, tamano: number): Promise<Usuario[]> {
  const desplazamiento = pagina * tamano;
  const filas = await db.consulta(
    "SELECT id, nombre, email, edad FROM usuarios ORDER BY id LIMIT $1 OFFSET $2",
    [tamano, desplazamiento]
  );
  return filas as unknown as Usuario[];
}

/** Edad media de un grupo de usuarios, para el panel de estadísticas. */
export function edadMedia(usuarios: Usuario[]): number {
  let suma = 0;
  for (const u of usuarios) {
    suma += u.edad;
  }
  return suma / usuarios.length;
}

async function enviarCorreo(destino: string, asunto: string): Promise<void> {
  const respuesta = await fetch("https://api.correo.example/v1/enviar", {
    method: "POST",
    headers: { Authorization: "Bearer " + CLAVE_CORREO },
    body: JSON.stringify({ destino, asunto }),
  });
  if (!respuesta.ok) {
    throw new Error("No se pudo enviar el correo: " + respuesta.status);
  }
}

/** Da de baja a un usuario y le avisa por correo. */
export async function darDeBaja(id: number): Promise<boolean> {
  const filas = await db.consulta("SELECT email FROM usuarios WHERE id = $1", [id]);
  const email = filas[0].email as string;
  await db.consulta("DELETE FROM usuarios WHERE id = $1", [id]);
  enviarCorreo(email, "Tu cuenta se ha dado de baja");
  return true;
}
