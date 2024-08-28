describe("Authentication Tests", () => {
  // Testes de Login
  describe("Login Tests", () => {
    it("should login with valid credentials", () => {
      cy.visit("/");

      cy.get('input[placeholder="Email"]').type("ramon261103@gmail.com");
      cy.get('input[placeholder="Senha"]').type("40028922@Tutu");

      cy.get('button[type="submit"]').click();

      cy.url().should("include", "/authenticate");
    });

    it("should show error on invalid credentials", () => {
      cy.visit("/");

      cy.get('input[placeholder="Email"]').type("invalidemail@example.com");
      cy.get('input[placeholder="Senha"]').type("invalidpassword");

      cy.get('button[type="submit"]').click();

      cy.get(".error").should("contain", "Email ou senha incorretos");
    });
  });

  // Testes de Registro de Atleta
  describe("Register Atleta Tests", () => {
    it("should register a new athlete and receive status 201", () => {
      cy.visit("/atleta/register");

      cy.get('input[placeholder="Name"]').type("New Athlete");
      cy.get('input[placeholder="Email"]').type("athlete@example.com");
      cy.get('input[placeholder="CPF"]').type("123.456.789-00");
      cy.get('input[placeholder="Sport"]').type("Football");
      cy.get('input[placeholder="Password"]').type("Password123@");
      cy.get('input[placeholder="Confirm Password"]').type("Password123@");

      // Intercepta a requisição de registro para validar o status
      cy.intercept("POST", "/atleta").as("registerAtleta");

      cy.get('button[type="submit"]').click();

      // Verifica se o status da resposta é 201
      cy.wait("@registerAtleta").its("response.statusCode").should("eq", 201);
    });

    it("should show error on password mismatch", () => {
      cy.visit("/atleta/register");

      cy.get('input[placeholder="Name"]').type("New Athlete");
      cy.get('input[placeholder="Email"]').type("athlete@example.com");
      cy.get('input[placeholder="CPF"]').type("12345678900");
      cy.get('input[placeholder="Sport"]').type("Football");
      cy.get('input[placeholder="Password"]').type("password123");
      cy.get('input[placeholder="Confirm Password"]').type("password456");

      cy.get('button[type="submit"]').click();

      cy.get(".error").should("contain", "As senhas não conferem.");
    });
  });

  // Testes de Registro de Treinador
  describe("Register Treinador Tests", () => {
    it("should register a new coach and receive status 201", () => {
      cy.visit("/treinador/register");

      cy.get('input[placeholder="Name"]').type("New Coach");
      cy.get('input[placeholder="Email"]').type("coach@example.com");
      cy.get('input[placeholder="CPF"]').type("987.654.321-00");
      cy.get('input[placeholder="Graduation"]').type("PhD in Sports");
      cy.get('input[placeholder="Password"]').type("Password123@");
      cy.get('input[placeholder="Confirm Password"]').type("Password123@");

      // Intercepta a requisição de registro para validar o status
      cy.intercept("POST", "/treinador").as("registerTreinador");

      cy.get('button[type="submit"]').click();

      // Verifica se o status da resposta é 201
      cy.wait("@registerTreinador")
        .its("response.statusCode")
        .should("eq", 201);
    });

    it("should show error on password mismatch", () => {
      cy.visit("/treinador/register");

      cy.get('input[placeholder="Name"]').type("New Coach");
      cy.get('input[placeholder="Email"]').type("coach@example.com");
      cy.get('input[placeholder="CPF"]').type("98765432100");
      cy.get('input[placeholder="Graduation"]').type("PhD in Sports");
      cy.get('input[placeholder="Password"]').type("password123");
      cy.get('input[placeholder="Confirm Password"]').type("password456");

      cy.get('button[type="submit"]').click();

      cy.get(".error").should("contain", "As senhas não conferem.");
    });
  });
});
