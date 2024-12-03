import { Component } from '@angular/core';
import { SolicitService } from '../../services/solicit.service';
import { tap } from 'rxjs';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { CardSolicitComponent } from '../card-solicit/card-solicit.component';

@Component({
  selector: 'app-section-solicit',
  standalone: true,
  imports: [DataViewModule, ButtonModule, CommonModule,CardSolicitComponent],
  templateUrl: './section-solicit.component.html',
  styleUrls: ['./section-solicit.component.css']
})
export class SectionSolicitComponent {
  idOfer: number = 0;
  solicitudes: any[] = [];

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

  constructor(private solicitService: SolicitService) {}

  ngOnInit() {
    const storedSeller = localStorage.getItem('user');
    this.idOfer = storedSeller ? JSON.parse(storedSeller).id : null;

    this.solicitService.getSolicitudes(this.idOfer)
      .pipe(
        tap({
          next: (response: any) => console.log('Response:', response),
          error: (error: any) => console.log('Error:', error)
        })
      )
      .subscribe((data: any) => {
        // Mapear los datos al formato esperado y traducir estado
        this.solicitudes = data.trades.map((trade: any) => ({
          tradeId: trade.trade.id_trade,
          estado: this.traducirEstado(trade.trade.estado), // Traducir estado
          fechaOferta: trade.trade.fecha_oferta,
          usuarioSolicitante: {
            id: trade.usuario_solicitante.id,
            nombre: trade.usuario_solicitante.nombre,
            email: trade.usuario_solicitante.email
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
        }));
        console.log('Solicitudes mapeadas:', this.solicitudes);
      });
  }

  traducirEstado(estado: string): string {
    return this.estadosTraducidos[estado] || estado;
  }
  onEstadoChanged(event: { tradeId: number; nuevoEstado: string }): void {
    console.log('Estado cambiado:', event);

   
  
  }

}

