import { Component } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable, ReplaySubject } from 'rxjs';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Interface da transação
 */
interface Transaction {
  /**
   * Descrição
   */
  item: string;
  /**
   * Valor numérico
   */
  cost: number;
}

/**
 * Componente de Operações, Lista de movimentos, Adicionar/Remover fundos
 */
@Component({
  selector: 'app-operacoes',
  templateUrl: './operacoes.component.html',
  styleUrls: ['./operacoes.component.css'],
})
export class OperacoesComponent {
  /**
   * Colunas a apresentar na tabela
   */
  displayedColumns: string[] = ['item', 'cost'];

  /**
   * Transações pré inseridas
   */
  transactions: Transaction[] = [
    { item: 'Fundos Adicionados', cost: 4 },
    { item: 'Fundos Adicionados', cost: 25 },
    { item: 'Fundos Removidos', cost: -15 },
  ];

  /**
   * Array de transações a apresentar na interface
   */
  dataToDisplay = [...this.transactions];

  /**
   * Data source da tabela de movimentos
   */
  dataSource = new ExampleDataSource(this.dataToDisplay);

  /**
   * Controlador do input the fundos
   */
  amountControl = new FormControl();

  /**
   * Constructor
   *
   * @param _snackBar material snackbar
   */
  constructor(private _snackBar: MatSnackBar) { }

  /**
   * Abre uma Snackbar com o texto com duração de 5 segundos
   *
   * @param texto
   */
  openSnackBar(texto: string) {
    this._snackBar.open(texto, undefined, { duration: 5 * 1000 });
  }

  /**
   * Valor total de todas as transações
   *
   * @returns Valor total
   */
  getTotalCost() {
    return this.dataToDisplay
      .map((t) => t.cost)
      .reduce((acc, value) => acc + value, 0);
  }

  /**
   * Adicionar fundos
   */
  addData() {
    if (this.amountControl.value > 0) {
      // Impede que o valor adicionado seja 0
      this.openSnackBar(`Adicionados ${this.amountControl.value}€`);
      this.dataToDisplay.unshift({
        item: 'Fundos Adicionados',
        cost: this.amountControl.value,
      }); // Insere o valor adicionado no topo do Array
      this.dataSource.setData(this.dataToDisplay);
      console.log(this.amountControl.value);
    } else {
      this.openSnackBar('Quantia Inválida');
    }
  }

  /**
   * Remover fundos
   */
  removeData() {
    if (this.amountControl.value > this.getTotalCost()) {
      // Impede que o valor retirado seja superior ao valor total
      this.openSnackBar('Saldo Insuficiente');
      console.log('Erro');
    } else {
      if (this.amountControl.value > 0) {
        // Impede que o valor retirado seja 0
        this.dataToDisplay.unshift({
          item: 'Fundos Removidos',
          cost: this.amountControl.value * -1,
        }); // Insere o valor retirado no topo do Array
        this.dataSource.setData(this.dataToDisplay);
        console.log(this.amountControl.value);
      } else {
        this.openSnackBar('Quantia Inválida');
      }
    }
  }
}

/**
 *  Data source da tabela
 */
class ExampleDataSource extends DataSource<Transaction> {
  /**
   * Stream de dados
   */
  private _dataStream = new ReplaySubject<Transaction[]>();

  /**
   * Constructor
   *
   * @param initialData Array de transações
   */
  constructor(initialData: Transaction[]) {
    super();
    this.setData(initialData);
  }

  /**
   * Conecta o data stream
   *
   * @returns data stream
   */
  connect(): Observable<Transaction[]> {
    return this._dataStream;
  }

  /**
   * Desliga o stream
   */
  disconnect() { }

  /**
   * Adiciona o novo array de transações
   *
   * @param data Array de transações
   */
  setData(data: Transaction[]) {
    this._dataStream.next(data);
  }
}
