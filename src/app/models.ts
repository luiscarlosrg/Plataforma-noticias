export interface Noticia {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string;
  categoria?: string;
}

export interface Categoria {
  id: number;
  titulo: string;
  descripcion: string;
  imagen: string;
}
