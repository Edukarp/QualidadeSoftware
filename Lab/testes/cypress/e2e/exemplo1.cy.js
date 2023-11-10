//<reference types="cypress"/>

describe('criando cenaário de teste para o site globalsqa', ()=>{

  //casos de teste
  it('Caso de teste: Registrando um usuário no site com sucesso', ()=>{
    cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
    cy.get('.btn-link').click()
    cy.get('#firstName').type('Eduardo')
    cy.get('#Text1').type('Inatel')
    cy.get('#username').type('Inatel')
    cy.get('#password').type('Intael')
    cy.get('.btn-primary').click()
    cy.get('.ng-binding').should('contain.text', 'Registration successful') //contain.text - tem que ta escrito aqui, mas pode ter mais coisa
  }) 

  it('Caso de teste: Registrando um usuário no site com falha (faltando senha)', ()=>{
    cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/register') //direto na pagina de registro
    cy.get('#firstName').type('Eduardo')
    cy.get('#Text1').type('Inatel')
    cy.get('#username').type('Inatel')
    cy.get('#password').type('Intael')
    cy.get('#password').clear()
    cy.get('.has-error > .help-block').should('have.text', 'Password is required') //have.text - tem que ter so isso la
    cy.get('.btn-primary').should('be.disabled')
  }) 
  it('Caso de teste: Realizando um login com sucesso', ()=>{
      //Gerando um usuario novo
      let info = criarUsuario();
      cy.get('#username').type(info[0])
      cy.get('#password').type(info[1])
      cy.get('.btn-primary').click()
      cy.get('h1.ng-binding').should('contain.text', info[0])

  }) 

  //Caso 1 - Presenca
  it('Caso de teste: Realizando um login com falha (senha incorreta)', ()=>{
    //Gerando um usuario novo
    cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
    let info = criarUsuario();
    cy.get('#username').type(info[0])
    cy.get('#password').type(info[1] + '1')
    cy.get('.btn-primary').click()
    cy.get('.ng-binding').should('contain.text', 'Username or password is incorrect')
}) 

  //Caso 2 - Presenca
it('Caso de teste: Registrando um usuário no site com falha (faltando username)', ()=>{
  cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/register')
  cy.get('#firstName').type('Eduardo')
  cy.get('#Text1').type('Inatel')
  cy.get('#username').type('Inatel')
  cy.get('#password').type('Intael')
  cy.get('#username').clear()
  cy.get('.has-error > .help-block').should('have.text', 'Username is required') 
  cy.get('.btn-primary').should('be.disabled')
}) 

it('Caso de teste: Deletando usuario com sucesso', ()=>{
  let info = criarUsuario();
  cy.login(info[0], info[1]) //Aqui foi criado um comando pra realizar login (olhar pasta support)
  cy.get('.ng-binding > a').click()
  cy.get('.btn').click();
  cy.login(info[0], info[1])
  cy.get('.ng-binding').should('have.text', 'Username or password is incorrect')

}) 

function criarUsuario(){
  let horas = new Date().getHours().toString()
  let minutos = new Date().getMinutes().toString()
  let segundos = new Date().getSeconds().toString()

  let user = horas + minutos + segundos + 'Id'
  let senha = horas + minutos +segundos + 'senha'
  let userInfo = [user, senha]

  cy.visit('https://globalsqa.com/angularJs-protractor/registration-login-example/#/login')
    cy.get('.btn-link').click()
    cy.get('#firstName').type(user)
    cy.get('#Text1').type(user)
    cy.get('#username').type(user)
    cy.get('#password').type(senha)
    cy.get('.btn-primary').click()
    cy.get('.ng-binding').should('contain.text', 'Registration successful')

    return userInfo
}
})