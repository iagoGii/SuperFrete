# Teste de Cálculo de Frete

Este projeto contém testes automatizados para o sistema de cálculo de frete do site SuperFrete, utilizando o Cypress como ferramenta de automação.

## Sumário

- [Descrição do Projeto](#descrição-do-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Como Executar os Testes](#como-executar-os-testes)
- [Casos de Teste Implementados](#casos-de-teste-implementados)

## Descrição do Projeto

O objetivo deste projeto é validar o fluxo de cálculo de frete, garantindo que todos os cenários funcionem conforme esperado. Os testes abordam a interação do usuário com o formulário de cálculo, incluindo validações de entrada e mensagens de erro.

## Pré-requisitos

- Node.js (versão 12 ou superior)
- Cypress (instalado localmente)

## Como Executar os Testes

- Navegue até o diretório do projeto:

```bash
  cd seurepositorio
```
- Instale as dependências:

```bash
  npm install
```

- Execute os testes:

```bash
  npx cypress open
```

- Execute os testes em modo HeadLess

```bash
npx cypress run --headless --browser chrome
```


## Casos de Teste Implementados

Os seguintes casos de teste foram implementados:

1. Preenchimento correto do formulário de cálculo de frete <br/>
[v] Verifica se o usuário consegue preencher todos os campos corretamente e se as informações são salvas.

2. Erro ao preencher CEP de origem inválido. <br/>
[v] Valida se o sistema retorna uma mensagem de erro quando um CEP de origem inválido é fornecido.

3. Mensagens de erro para campos obrigatórios e inválidos <br/>
[v] Testa a exibição de mensagens de erro quando campos obrigatórios não são preenchidos.

4. Erro para valores extremamente altos em peso e dimensões <br/>
[v] Garante que o sistema informe ao usuário quando valores de peso e dimensões estão fora do permitido.

5. Manutenção dos dados após um refresh <br/>
[v] Verifica se os dados preenchidos permanecem após um refresh da página ou se estão vazios quando não preenchidos.


