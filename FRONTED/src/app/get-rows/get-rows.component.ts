import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../service/data.service';

@Component({
  selector: 'app-get-rows',
  templateUrl: './get-rows.component.html',
  styleUrls: ['./get-rows.component.css']
})
export class GetRowsComponent implements OnInit {
  @Output() dataUpdated: EventEmitter<any> = new EventEmitter<any>();

  deletedRows: number[] = [];
  items: any[] = []; // Almacenar los registros

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.loadItems();
  }

  loadItems() {
    this.dataService.getRows().subscribe((data: any) => {
      this.items = data.data; // Utiliza data.data para acceder a la lista de registros
    });
  }

  // onDelete(index: number) {
  //   this.dataService.deleteRow(index.toString()).subscribe((response: any) => {
  //     if (response && response.status === 200) {
  //       this.items.splice(index - 1, 1);
  //     }
  //   });
  // }
  
  // hideRow(index: number) {
  //   this.deletedRows.push(index);
  // }

  onUpdateData(data: any) {
    this.dataUpdated.emit(data);
  }

  handleDataUpdated(dataUpdated: any) {
    // Actualiza los datos en el array items
    const indexToUpdate = dataUpdated.index - 1;
    this.items[indexToUpdate] = dataUpdated.data;
    console.log()
  }
  
}
