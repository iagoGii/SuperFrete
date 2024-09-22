// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('resetApp', () => {
  cy.clearCookies();
  cy.clearLocalStorage();
});

Cypress.Commands.add('preencherEmailModal', (email) => {
  // Preenche o campo de email
  cy.get('input#email')
    .type(email) // Substitua pelo e-mail desejado
    .should('have.value', email); // Verifica se o valor foi preenchido corretamente

  // Clica no botão "Concluir"
  cy.contains('Concluir').click();
  cy.wait(1000); // Espera um segundo, ajuste conforme necessário
});


Cypress.Commands.add('preencherCepOrigem', (cep) => {
  cy.get('#originPostcode')
    .type(cep)
    .should('have.value', cep);
});

Cypress.Commands.add('selecionarFormatoObjeto', (formato) => {
  cy.get('#object_format')
    .click()
    .contains(formato, { timeout: 10000 })
    .click({ force: true });
});

Cypress.Commands.add('selecionarPeso', (peso) => {
  cy.get('[data-cy="calculator-weight"]').click();
  cy.contains(peso).click();
});

Cypress.Commands.add('preencherDimensoes', (altura, largura, profundidade) => {
  cy.get('#packageHeight').type(altura).should('have.value', altura);
  cy.get('#packageWidth').type(largura).should('have.value', largura);
  cy.get('#packageDepth').type(profundidade).should('have.value', profundidade);
});

Cypress.Commands.add('preencherCepDestino', (cep) => {
  cy.get('#destinationPostcode').type(cep);
});

Cypress.Commands.add('calcularFrete', () => {
  cy.contains('CALCULAR FRETE COM DESCONTO').click();
});

Cypress.Commands.add('limparInformacoesSalvas', () => {
  cy.contains('Limpar').click();
});
