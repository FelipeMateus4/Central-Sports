# Central Sports

## Visão Geral

Central Sports é uma plataforma dinâmica de torneios esportivos, projetada para reunir atletas e treinadores de diversas modalidades. Aqui, atletas e treinadores podem se inscrever, conectar-se e participar de torneios. Os gestores de eventos têm a capacidade de promover torneios, vinculando atletas e treinadores a torneios de suas respectivas modalidades de forma intuitiva.

## Tecnologias Utilizadas

- **TypeScript**: 5.5
- **PostgreSQL**: 16.0
- **JavaScript (ECMAScript)**: ES2016
- **Node.js**: v20.15.0
- **IDE**: VSCode

## Estrutura de Diretórios

Abaixo está a estrutura de diretórios do projeto, com uma breve descrição de cada pasta:

- ### Backend
  - **src**: Diretório principal que contém o código fonte do backend.
    - **connections**: Gerencia a conexão com o banco de dados.
    - **controllers**: Contém a lógica dos controladores, que lidam com as requisições HTTP.
    - **middlewares**: Contém middlewares utilizados no projeto, que são funções que interceptam requisições e respostas.
    - **model**: Contém os modelos de dados usados no projeto.
    - **persistence**: Contém a lógica de acesso aos dados, geralmente interagindo diretamente com os modelos.
    - **routes**: Define as rotas da aplicação, mapeando URLs para controladores específicos.
    - **services**: Contém a lógica de negócio da aplicação.
    - **types**: Contém definições de tipos TypeScript utilizadas no projeto.
    - **utils**: Contém funções utilitárias usadas em várias partes da aplicação.
  - **app.ts**: Arquivo principal que inicializa a aplicação.
  - **index.ts**: Arquivo de entrada do projeto.
  - **.prettierrc.json**: Arquivo de configuração do Prettier.
  - **jest.config.ts**: Arquivo de configuração do Jest.
  - **package.json**: Contém as dependências e scripts do projeto.
  - **tsconfig.json**: Arquivo de configuração do TypeScript.

- ### Frontend
  - **public**: Contém arquivos públicos estáticos que são servidos diretamente.
  - **src**: Diretório principal que contém o código fonte do frontend.
    - **assets**: Contém imagens e outros recursos estáticos utilizados na aplicação.
    - **components**: Contém os componentes React reutilizáveis.
    - **context**: Contém os contextos React para gerenciamento de estado global.
    - **pages**: Contém os componentes de página, que geralmente correspondem a rotas no aplicativo.
    - **routes**: Define as rotas do frontend.
  - **App.css**: Arquivo de estilos CSS principal da aplicação.
  - **App.js**: Componente principal da aplicação React.
  - **App.test.js**: Arquivo de teste para o componente App.
  - **index.css**: Arquivo de estilos CSS aplicado globalmente.
  - **index.js**: Ponto de entrada do aplicativo React.
  - **reportWebVitals.js**: Script para medir a performance do aplicativo.
  - **setupTests.js**: Script de configuração para testes com Jest.
  - **.prettierrc.json**: Arquivo de configuração do Prettier.
  - **package.json**: Contém as dependências e scripts do projeto.


- ### Regras de Clean Code
- Funções Pequenas e Coesas: Cada função deve fazer apenas uma coisa.
- Nomes Claros e Descritivos: Use nomes que expliquem a intenção.
- Evite Comentários Desnecessários: O código deve ser autoexplicativo.
- Retorne Funções Diretamente: Evite variáveis temporárias desnecessárias.
- Use Objetos para Agrupar Parâmetros Relacionados: Torne as funções mais fáceis de chamar e entender.
- Evite Código Duplicado: Reutilize funções para evitar duplicação.
- ### Mensagens de Commit

- Mensagens curtas e descritivas.
- Utilizar um prefixo que indica o tipo de mudança:
  - `feat`: Uma nova funcionalidade.
  - `fix`: Correção de bug.
  - `docs`: Mudanças na documentação.
  - `style`: Mudanças que não afetam o significado do código (espaços em branco, formatação, ponto e vírgula faltando, etc).
  - `refactor`: Uma mudança de código que não corrige um bug nem adiciona uma funcionalidade.
  - `test`: Adição ou correção de testes.
  - `chore`: Mudanças na configuração do projeto ou tarefas de manutenção.

**Exemplo de Mensagem de Commit:**
```text
feat: add login functionality
