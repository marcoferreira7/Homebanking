import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  constructor(private router: Router, private _snackBar: MatSnackBar) { }


  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });


  //User Default

  user = {
    username: 'admin',
    password: 'admin'
  }


  openSnackBar(texto: string) {
    this._snackBar.open(texto, undefined, { duration: 5 * 1000 }) // Duração de Snackbar
  }


  async onSubmit() {
    const usernamevalue = this.form.get('username')?.value  // ? = Verificar se o valor existe
    const passwordvalue = this.form.get('password')?.value
    if (this.form.valid) { // Verifica se os campos estão preenchidos
      if (usernamevalue == this.user.username && passwordvalue == this.user.password) {  // Verifica se os valores coincidem
        this.router.navigate(['operacoes']);
      } else {
        this.openSnackBar("User não existe")
      }
    } else {
      this.openSnackBar("Campos Inválidos")
    }
  }

}
