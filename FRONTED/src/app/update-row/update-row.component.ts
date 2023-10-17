import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DataService } from '../service/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-row',
  templateUrl: './update-row.component.html',
  styleUrls: ['./update-row.component.css']
})
export class UpdateRowComponent {
  @Input() index!: number;
  @Input() Name: string = '';
  @Input() Gmail: string = '';
  @Input() Password: string = '';

  @Output() dataUpdated: EventEmitter<{ Name: string, Gmail: string, Password: string }> = new EventEmitter();

  constructor(private dataService: DataService) {}

  onUpdate() {
    let updatedName = '';
    let updatedGmail = '';
    let updatedPassword = '';

    Swal.fire({
      title: 'Actualizar información',
      html: `
      <form id="form">
          <label for="" class=" label LName">Nombre</label>
          <input type="text" name="Name" class="Input IName" id="Name" value="${this.Name}"><br>

          <label for="" class="label LEmail">Correo</label>
          <input type="text" name="Email" class="Input IEmail" id="Email" value="${this.Gmail}"><br>

          <label for "" class="Label LPassword">Contraseña</label>
          <input type="text" name="Password" class="Input IPassword" id="Password" value="${this.Password}"><br>
      </form>
      `,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        const nameElement = document.getElementById('Name') as HTMLInputElement;
        const gmailElement = document.getElementById('Email') as HTMLInputElement;
        const passwordElement = document.getElementById('Password') as HTMLInputElement;

        if (nameElement && gmailElement && passwordElement) {
          updatedName = nameElement.value;
          updatedGmail = gmailElement.value;
          updatedPassword = passwordElement.value;

          // Actualiza los valores de los campos
          this.Name = updatedName;
          this.Gmail = updatedGmail;
          this.Password = updatedPassword;

          const updatedRow = {
            Name: updatedName,
            Gmail: updatedGmail,
            Password: updatedPassword
          };

          // Realiza la actualización en la base de datos
          this.dataService.updateRow(this.index.toString(), updatedRow).subscribe((response: any) => {
            if (response && response.status === 200) {
              console.log(updatedRow)
              console.log('Registro actualizado con éxito:', response);
              this.dataUpdated.emit({ Name: updatedName, Gmail: updatedGmail, Password: updatedPassword });
            }
          });
        }
        Swal.fire('Editado!', 'El registro ha sido editado con éxito.').then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
      }
    });
  }
}
