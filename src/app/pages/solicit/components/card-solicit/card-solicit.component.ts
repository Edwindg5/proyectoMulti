import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SolicitService } from '../../services/solicit.service';
import { tap } from 'rxjs';
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-card-solicit',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule,MessagesModule],
  templateUrl: './card-solicit.component.html',
  styleUrls: ['./card-solicit.component.css']
})
export class CardSolicitComponent implements OnInit {
  @Input() solicitud: any;
  @Output() estadoChanged = new EventEmitter<{ tradeId: number; nuevoEstado: string }>();
  constructor(private solicitService: SolicitService) {}

  formGroup!: FormGroup;
  estados = [
    { label: 'Pendiente', value: 'PENDING' },
    { label: 'Completado', value: 'COMPLETED' },
    { label: 'Cancelado', value: 'CANCELLED' },
    { label: 'Venta', value: 'VENTA' },
    { label: 'Intercambio', value: 'INTERCAMBIO' },
    { label: 'Eliminado', value: 'ELIMINADO' },
    { label: 'Compra', value: 'COMPRA' }
  ];

  ngOnInit(): void {
    console.log(this.solicitud);
    
    this.formGroup = new FormGroup({
      estado: new FormControl(this.solicitud.estado)
    });
  }

  guardarEstado(): void {

    Swal.fire({
      title: "¿Estás seguro de cambiar el estado?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "¡Si!",
      denyButtonText: `No guardar`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        const nuevoEstado = this.formGroup.value.estado;
        if (nuevoEstado) {
          this.solicitService.updateStatusSolicit(this.solicitud.tradeId, nuevoEstado).pipe(tap({
            next: (nuevo:any) => {
              this.estados.forEach(element => {
               if(element.value === nuevo.estado){
                 this.solicitud.estado = element.label;
               }
              });
            
            },
            error: () => {
     
            }
          })).subscribe()
         }
        Swal.fire("Correcto", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Cambios no guardados", "", "info");
      }
    });
  }
}
