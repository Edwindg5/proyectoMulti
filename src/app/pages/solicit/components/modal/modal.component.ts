import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TableModule } from 'primeng/table'; // Importamos TableModule
import { CheckboxModule } from 'primeng/checkbox'; // Importamos CheckboxModule
import { DialogModule } from 'primeng/dialog'; // Importamos DialogModule
import { ButtonModule } from 'primeng/button'; // Importamos ButtonModule para los botones
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  // Añade esta importación

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    TableModule, 
    CheckboxModule, 
    DialogModule, 
    ButtonModule,
    CommonModule,
    FormsModule  
  ],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  @Input() arrayInterchange: any[] = [];

  selectedItem: any = null;  // Variable para almacenar el objeto seleccionado

  close() {
  
  }

  selectItem(item: any) {
    this.selectedItem = item;
    console.log('Selected item:', this.selectedItem);
  }
}
