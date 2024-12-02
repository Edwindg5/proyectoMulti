interface Notification {
    mensaje: string; // Mensaje de la notificación
    tradeId?: number; // ID del intercambio relacionado (opcional si no todas las notificaciones tienen este campo)
    leido: boolean; // Estado de lectura
  }
  