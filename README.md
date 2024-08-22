# Central Sports

## Visão Geral

Central Sports é uma plataforma dinâmica de torneios esportivos, projetada para reunir atletas e treinadores de diversas modalidades. Atletas e treinadores podem se inscrever, conectar-se e participar de torneios. Gestores de eventos podem promover torneios, vinculando atletas e treinadores de forma intuitiva.

## Tecnologias Utilizadas

- **TypeScript**: 5.5
- **PostgreSQL**: 16.0
- **JavaScript (ECMAScript)**: ES2016
- **Node.js**: v20.15.0
- **IDE**: VSCode v1.92.2

## Estrutura de Diretórios
### IMPLEMENTACAO
### Backend

- **back-end/src**: Diretório principal que contém o código fonte do backend.
  - **connections**: Gerencia a conexão com o banco de dados.
  - **controllers**: Lida com as requisições HTTP e lógica dos controladores.
  - **middlewares**: Funções que interceptam requisições e respostas.
  - **model**: Modelos de dados usados no projeto.
  - **persistence**: Acesso aos dados, interagindo com os modelos.
  - **routes**: Mapeia URLs para controladores específicos.
  - **services**: Contém a lógica de negócio da aplicação.
  - **types**: Definições de tipos TypeScript usadas no projeto.
  - **utils**: Funções utilitárias usadas em várias partes da aplicação.
- **config**: Contém arquivos de configuração, como `tsconfig.json`, `prettierrc.json`, entre outros.
- **node_modules**: Diretório gerado pelo npm que contém todas as dependências do projeto.
- **app.ts**: Arquivo principal que inicializa a aplicação.
- **index.ts**: Arquivo de entrada do projeto.
- **.env**: Arquivo de variáveis de ambiente.
- **package.json**: Dependências e scripts do projeto.
- **tsconfig.json**: Configuração do TypeScript.
- **jest.config.ts**: Configuração do Jest para testes.
- **.gitignore**: Arquivo que especifica quais arquivos e pastas devem ser ignorados pelo Git.

### Frontend

- **front-end/public**: Contém arquivos públicos estáticos.
- **front-end/src**: Código fonte do frontend.
  - **assets**: Imagens e recursos estáticos.
  - **components**: Componentes React reutilizáveis.
  - **context**: Contextos React para gerenciamento de estado global.
  - **pages**: Componentes de página que correspondem às rotas.
  - **routes**: Define as rotas do frontend.
  - **styles**: Arquivos de estilo CSS aplicados globalmente ou a componentes específicos.
- **build**: Diretório gerado pela build do projeto frontend.
- **node_modules**: Diretório gerado pelo npm que contém todas as dependências do projeto frontend.
- **package.json**: Dependências e scripts do projeto frontend.
- **.gitignore**: Arquivo que especifica quais arquivos e pastas devem ser ignorados pelo Git no frontend.
- **README.md**: Documentação do projeto frontend.

### Documentação e Requisitos

- **Padrões Adotados**: Diretório contendo regras de verificação e análise de requisitos.
- **Requisitos**: Inclui diagramas, documentos de casos de uso, e outros artefatos necessários para o desenvolvimento do projeto.
  - **DiagramasDeSequência**: Contém diagramas de sequência em formato JPEG.
  - **DiagramasDeClasses**: Contém diagramas de classes.
  - **DiagramasDeImplantação**: Contém diagramas de implantação.
  - **Documentação de Requisitos**: Inclui documentos de requisitos em formato DOCX e PDF.

## Regras de Clean Code

- **Funções Pequenas e Coesas**: Cada função deve realizar apenas uma tarefa específica.
- **Nomes Claros e Descritivos**: Utilizar nomes que reflitam claramente o propósito de variáveis, funções e classes.
- **Evitar Comentários Desnecessários**: O código deve ser autoexplicativo; comentários devem ser usados apenas quando realmente necessários para clarificação.
- **Retorno Direto de Funções**: Evitar o uso de variáveis temporárias desnecessárias ao retornar valores.
- **Uso de Objetos para Agrupar Parâmetros**: Facilita a leitura e manutenção de funções com múltiplos parâmetros relacionados.
- **Evitar Código Duplicado**: Reutilizar código através de funções e componentes reutilizáveis para manter a consistência e facilitar manutenção.


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
