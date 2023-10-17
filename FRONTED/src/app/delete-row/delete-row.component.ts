import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../service/data.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-delete-row',
  templateUrl: './delete-row.component.html',
  styleUrls: ['./delete-row.component.css']
})
export class DeleteRowComponent {
  @Input()
  index!: number;
  @Output() deleted: EventEmitter<number> = new EventEmitter<number>();

  constructor(private dataService: DataService) {}

  onDelete(){
     Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataService.deleteRow(this.index.toString()).subscribe((response: any) => {
          console.log('Registro eliminado:', response);
          this.deleted.emit(this.index);
        });
        
      }
      Swal.fire('Eliminado!', 'El registro ha sido eliminado con éxito.').then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      })
      
    });
  }

}



