import { Component } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable, ReplaySubject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Transaction {
  item: string;
  cost: number;
}

@Component({
  selector: 'app-operacoes',
  templateUrl: './operacoes.component.html',
  styleUrls: ['./operacoes.component.css']
})

export class OperacoesComponent {
  displayedColumns: string[] = ['item', 'cost'];
  transactions: Transaction[] = [
    { item: 'Fundos Adicionados', cost: 4 },
    { item: 'Fundos Adicionados', cost: 25 },
    { item: 'Fundos Removidos', cost: -15 },
  ];

  dataToDisplay = [...this.transactions];

  dataSource = new ExampleDataSource(this.dataToDisplay);

  amountControl = new FormControl();

  constructor(private _snackBar: MatSnackBar) { }


  //Funções

  // Abre uma Snackbar com o texto com duração de 5 segundos

  openSnackBar(texto: string) {
    this._snackBar.open(texto, undefined, { duration: 5 * 1000 })
  }


  // Valor total de todas as transações

  getTotalCost() {
    return this.dataToDisplay.map(t => t.cost).reduce((acc, value) => acc + value, 0);
  }


  // Adicionar fundos

  addData() {
    if (this.amountControl.value > 0) { // Impede que o valor adicionado seja 0
      this.openSnackBar(`Adicionados ${this.amountControl.value}€`)
      this.dataToDisplay.unshift({ item: 'Fundos Adicionados', cost: this.amountControl.value }); // Insere o valor adicionado no topo do Array
      this.dataSource.setData(this.dataToDisplay);
      console.log(this.amountControl.value)
    } else {
      this.openSnackBar("Quantia Inválida")
    }
  }

  // Remover fundos 

  removeData() {
    if (this.amountControl.value > this.getTotalCost()) {   // Impede que o valor retirado seja superior ao valor total
      this.openSnackBar("Saldo Insuficiente");
      console.log("Erro")
    } else {
      if (this.amountControl.value > 0) { // Impede que o valor retirado seja 0
        this.dataToDisplay.unshift({ item: 'Fundos Removidos', cost: this.amountControl.value * (-1) }); // Insere o valor retirado no topo do Array
        this.dataSource.setData(this.dataToDisplay);
        console.log(this.amountControl.value)
      } else {
        this.openSnackBar("Quantia Inválida")
      }
    }
  }

}

class ExampleDataSource extends DataSource<Transaction> {
  private _dataStream = new ReplaySubject<Transaction[]>();

  constructor(initialData: Transaction[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<Transaction[]> {
    return this._dataStream;
  }

  disconnect() { }

  setData(data: Transaction[]) {
    this._dataStream.next(data);
  }



}
