import { Component } from '@angular/core';
import { MysolicitsService } from '../../services/mysolicits.service';
import { tap } from 'rxjs';
import { CommonModule } from '@angular/common';
interface Solicitud {
  tradeId: number;
  estado: string;
  fechaOferta: string;
  usuarioOfertador: {
    id: number;
    nombre: string;
    email: string;
  };
  articuloSolicitado: {
    id: number;
    nombre: string;
    descripcion: string;
    imagen: string;
  };
  articuloOfrecido: {
    id: number;
    nombre: string;
    descripcion: string;
    imagen: string;
  };
}

@Component({
  selector: 'app-section-solicit',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section-solicit.component.html',
  styleUrl: './section-solicit.component.css'
})
export class SectionSolicitComponent {
  idOfer :number = 0;
  solicitudes: Solicitud[] = [];

  // Diccionario de traducción
  estadosTraducidos: { [key: string]: string } = {
    PENDING: 'Pendiente',
    COMPLETED: 'Completado',
    CANCELLED: 'Cancelado',
    VENTA: 'Venta',
    INTERCAMBIO: 'Intercambio',
    DONACION: 'Donación',
    DISPONIBLE: 'Disponible',
    NO_DISPONIBLE: 'No disponible',
    ELIMINADO: 'Eliminado',
    COMPRA: 'Compra'
  };
  constructor(private mysolicitService: MysolicitsService){}
  ngOnInit(){
    const storedSeller = localStorage.getItem('user');
    this.idOfer = storedSeller ? JSON.parse(storedSeller).id : null;
    this.mysolicitService.getMySolicits(this.idOfer)
    .pipe(
      tap({
        next: (response: any) => console.log('Response:', response),
        error: (error: any) => console.log('Error:', error)
      })
    )
    .subscribe((data: any) => {
      // Mapeo de solicitudes
      this.solicitudes = data.trades.map((trade: any) => {
    
        return {
          tradeId: trade.trade.id_trade,
          estado: this.traducirEstado(trade.trade.estado),
          fechaOferta: trade.trade.fecha_oferta,
          usuarioOfertador: {
            id: trade.usuario_ofertador.id,
            nombre: trade.usuario_ofertador.nombre,
            email: trade.usuario_ofertador.email
          },
          articuloSolicitado: {
            id: trade.articulo_solicitado.id,
            nombre: trade.articulo_solicitado.nombre,
            descripcion: trade.articulo_solicitado.descripcion,
            imagen: trade.articulo_solicitado.imagen
          },
          articuloOfrecido: {
            id: trade.articulo_ofrecido.id,
            nombre: trade.articulo_ofrecido.nombre,
            descripcion: trade.articulo_ofrecido.descripcion,
            imagen: trade.articulo_ofrecido.imagen
          }
        };
      }).filter((solicitud: Solicitud | null) => solicitud !== null); // Filtrar los trades inválidos
      console.log('Solicitudes mapeadas:', this.solicitudes);
    });
  
  }
  traducirEstado(estado: string): string {
    return this.estadosTraducidos[estado] || estado;
  }


}
