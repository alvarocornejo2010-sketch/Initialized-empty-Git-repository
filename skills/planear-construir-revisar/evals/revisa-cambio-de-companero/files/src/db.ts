export interface Fila {
  [columna: string]: unknown;
}

export interface Db {
  /** Ejecuta SQL. Los valores de `parametros` sustituyen a $1, $2... de forma segura. */
  consulta(sql: string, parametros?: unknown[]): Promise<Fila[]>;
}

export declare const db: Db;
