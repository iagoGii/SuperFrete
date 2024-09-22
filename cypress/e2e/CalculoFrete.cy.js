/// <reference types="cypress" />

describe('Fluxo de Cálculo de Frete', () => {
  beforeEach(() => {
    cy.resetApp(); // Limpa cookies e localStorage
    cy.visit('/'); // Visita a página inicial
    cy.wait(10000);
  });

  it('Deve preencher o formulário de cálculo de frete corretamente', () => {
    // Preenche o campo de CEP de origem
    cy.preencherCepOrigem('08090-284');

    // Seleciona o formato do objeto
    cy.selecionarFormatoObjeto('Caixa / Pacote');

    // Seleciona o peso
    cy.selecionarPeso('Até 300g');

    // Preenche as dimensões do pacote
    cy.preencherDimensoes('2', '11', '16');

    // Preencher o campo de CEP
    cy.preencherCepDestino('07144-281');

    // Clica no botão de calcular
    cy.calcularFrete();

    // Salvar informações
    cy.contains('Salvar').click();

    // Valida que a mensagem de aviso é exibida
    cy.get('.notistack-MuiContent')
      .should('be.visible')
      .and('contain', 'As informações do pacote atual foram salvas e estarão preenchidas na próxima vez que você abrir o aplicativo.');

    // Limpar informações salvas
    cy.limparInformacoesSalvas();

    // Após a limpeza, valida que a mensagem de alerta é exibida
    cy.get('.notistack-MuiContent-warning')
      .should('be.visible')
      .and('contain', 'As informações do pacote foram limpas.');
  });

  it('Deve mostrar erro ao preencher CEP de origem inválido', () => {
    cy.limparInformacoesSalvas(); // Limpar informações salvas

    // Preenche o campo de CEP de origem
    cy.preencherCepOrigem('11111-111');

    cy.calcularFrete();
    cy.wait(1000);

    cy.preencherEmailModal('test@example.com');

    // Seleciona o formato do objeto
    cy.selecionarFormatoObjeto('Caixa / Pacote');

    // Seleciona o peso
    cy.selecionarPeso('Até 300g');

    // Preenche as dimensões do pacote
    cy.preencherDimensoes('2', '11', '16');

    // Preencher o campo de CEP
    cy.preencherCepDestino('07144-281');

    // Clica no botão de calcular
    cy.calcularFrete();

    // Verifica se a mensagem de erro aparece
    cy.get('#originPostcode-helper-text')
      .should('contain', 'CEP de origem inválido.');
  });

  it('Deve mostrar mensagens de erro para campos obrigatórios e inválidos', () => {
    // Tentar calcular frete sem preencher os campos
    cy.calcularFrete();

    // Validação de mensagens de erro
    cy.get('#originPostcode-helper-text')
      .should('contain', 'CEP de origem é obrigatório');

    cy.get('.MuiFormHelperText-root').contains('peso é obrigatório');

    cy.get('#destinationPostcode-helper-text')
      .should('contain', 'CEP de destino é obrigatório');

    // Preencher valores inválidos
    cy.preencherDimensoes('0', '5', '10');

    cy.calcularFrete();

    // Validação das mensagens de erro para dimensões
    cy.get('#packageHeight-helper-text')
      .should('contain', 'Altura mínima 0.4 cm.');

    cy.get('#packageWidth-helper-text')
      .should('contain', 'Largura mínima 8 cm.');

    cy.get('#packageDepth-helper-text')
      .should('contain', 'Comprimento mínimo 13 cm.');
  });

  it('Deve mostrar erro para valores extremamente altos em peso e dimensões', () => {
    cy.preencherCepOrigem('08090-284');
    cy.preencherCepDestino('07144-281');

    // Valores altos
    cy.preencherDimensoes('1000', '1000', '1000'); // Altura extrema, Largura extrema, Comprimento extremo

    // Seleciona o peso
    cy.selecionarPeso('Até 300g');

    cy.calcularFrete();

    // Validação das mensagens de erro para dimensões
    cy.get('#packageHeight-helper-text')
      .should('be.visible')
      .and('contain', 'Altura máxima 150 cm.');

    cy.get('#packageWidth-helper-text')
      .should('be.visible')
      .and('contain', 'Largura máxima 150 cm.');

    cy.get('#packageDepth-helper-text')
      .should('be.visible')
      .and('contain', 'Comprimento máximo 150 cm.');

    // Validação da soma das dimensões
    cy.contains('a soma resultante da altura + largura + comprimento não deve superar 300 cm.')
      .should('be.visible');
  });

  it('Deve manter os dados preenchidos após um refresh ou estar vazios', () => {
    // Preenche os campos
    cy.get('#originPostcode').type('08090-284');
    cy.get('#destinationPostcode').type('07144-281');
    cy.get('#packageHeight').type('5');
    cy.get('#packageWidth').type('10');
    cy.get('#packageDepth').type('15');

    // Salva o estado atual dos campos
    const originPostcode = '08090-284';
    const destinationPostcode = '07144-281';
    const packageHeight = '5';
    const packageWidth = '10';
    const packageDepth = '15';

    // Faz o refresh na página
    cy.reload();

    // Verifica se os campos ainda estão preenchidos
    cy.get('#originPostcode').then($input => {
      if ($input.val() === originPostcode) {
        cy.get('#originPostcode').should('have.value', originPostcode);
      } else {
        cy.get('#originPostcode').should('be.empty');
      }
    });

    cy.get('#destinationPostcode').then($input => {
      if ($input.val() === destinationPostcode) {
        cy.get('#destinationPostcode').should('have.value', destinationPostcode);
      } else {
        cy.get('#destinationPostcode').should('be.empty');
      }
    });

    cy.get('#packageHeight').then($input => {
      if ($input.val() === packageHeight) {
        cy.get('#packageHeight').should('have.value', packageHeight);
      } else {
        cy.get('#packageHeight').should('be.empty');
      }
    });

    cy.get('#packageWidth').then($input => {
      if ($input.val() === packageWidth) {
        cy.get('#packageWidth').should('have.value', packageWidth);
      } else {
        cy.get('#packageWidth').should('be.empty');
      }
    });

    cy.get('#packageDepth').then($input => {
      if ($input.val() === packageDepth) {
        cy.get('#packageDepth').should('have.value', packageDepth);
      } else {
        cy.get('#packageDepth').should('be.empty');
      }
    });

  });
});
