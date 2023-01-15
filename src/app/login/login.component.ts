import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl, FormGroup, Validators } from '@angular/forms';

/**
 * Componente de Login
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  /**
   * Constructor
   *
   * @param _router serviço de routing
   * @param _snackBar serviço material snackbar
   */
  constructor(private _router: Router, private _snackBar: MatSnackBar) {}

  /**
   * Form group de login, username e password
   */
  form: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  /**
   * User válido
   */
  user = {
    username: 'admin',
    password: 'admin',
  };

  /**
   * Abre uma Snackbar com o texto com duração de 5 segundos
   *
   * @param texto mensagem a apresentar ao user
   */
  openSnackBar(texto: string) {
    this._snackBar.open(texto, undefined, { duration: 5 * 1000 }); // Duração de Snackbar
  }

  /**
   * Função de submissão do formulário de login
   */
  onSubmit() {
    const usernamevalue = this.form.get('username')?.value; // ? = Verificar se o valor existe
    const passwordvalue = this.form.get('password')?.value;
    if (this.form.valid) {
      // Verifica se os campos estão preenchidos
      if (
        usernamevalue == this.user.username &&
        passwordvalue == this.user.password
      ) {
        // Verifica se os valores coincidem
        this._router.navigate(['operacoes']);
      } else {
        this.openSnackBar('User não existe');
      }
    } else {
      this.openSnackBar('Campos Inválidos');
    }
  }
}
