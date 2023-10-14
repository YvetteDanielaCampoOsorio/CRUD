import { Component } from '@angular/core';
import { ListService } from '../../services/list/list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {
  constructor(private listService: ListService) { }
  elementos: any[] = [];
  
  ngOnInit() {
    this.listService.getListData().subscribe((response: any) => {
      this.elementos = response.data;
    });
  }
  
}

console.log('hola');

