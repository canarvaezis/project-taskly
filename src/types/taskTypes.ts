export interface Task {
  id: string;
  title: string;
  description: string;
  deadline: string;        // ISO string: "2025-05-15T17:50"
  priority: string;        // "alta" | "media" | "baja"
  isFavorite: boolean;
  completed: boolean;
  tags: string[];          // etiquetas predefinidas
}

