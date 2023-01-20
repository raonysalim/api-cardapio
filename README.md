# Sobre o projeto

O projeto consiste em uma API. O intuito da aplicação foi fazer um cardápio de um bar. O projeto foi divido em duas partes.

## API

Essa parte do projeto é a API responsável por todas as rotas necessárias para a manipulação de um Banco de dados PostgreSQL. A aplicação usa autênticação JWT para as rotas de create, put, post e delete.

As rotas respodnem um JSON que será tratado na segunda parte do projeto.

## Exemplo de respostas das rotas

### Rota de Categorias
```
[{"id":9,"name":"Cerveja"},{"id":2,"name":"Drinks Clássicos"},{"id":4,"name":"Lanches"},{"id":10,"name":"Ocultar"},{"id":5,"name":"Sobremesa"},{"id":3,"name":"Soft Drinks"},{"id":11,"name":"Sucos"}]
```

### Rota de itens da categoria cerveja
```
[{"id":18,"name":"Heineken 600 ml","description":"","price":"14.90","categoryId":9,"image":null,"image_url":null,"category":{"id":9,"name":"Cerveja"}},{"id":16,"name":"Skol 600ml","description":"","price":"10.90","categoryId":9,"image":null,"image_url":null,"category":{"id":9,"name":"Cerveja"}}]
```

## Tecnologias utilizadas
#### Typescript
#### Node
#### Express
#### PostgreSQL
#### Prisma
#### JWT


