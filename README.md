# Homebanking

Este projeto destina-se a um desafio proposto pela empresa Sysnovare.

## Instruções para uso da aplicação

- Fazer clone/download do zip
- Correr `npm install` (se caso existir problemas com a instalação, executar `npm install --force`)
- Correr `ng serve`
- Abrir `http://localhost:4200` num browser
- Utilizador criado: username admin, password admin

## Instruções para visualização da documentação

Foi utilizado o compodoc (https://compodoc.app/) para geração automática da documentação desta app.

- https://github.com/marcoferreira7/Homebanking/tree/main/documentation


## Descrição de funcionalidades

- Validação de Login para um utilizador existente
- Preenchimento de campos obrigatórios (Username e Password)
- Adicionar e Remover Fundos
- Validações de Adição e Remoção de Fundos (o valor tem que ser maior que 0)
- Validação Não Remover Fundos se a quantia for maior do que o total disponível
- Utilização de Snackbar para apresentar mensagem de aviso
- Utilização Material Table, Toolbar e Form

