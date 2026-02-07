#  Mini-Compiler Teste & Validação

Este projeto é um compilador modular desenvolvido em **TypeScript**, focado na análise léxica, sintática e semântica de uma linguagem simples. Inclui uma suite de testes automatizada para validar o comportamento do compilador em diferentes cenários.

## 🛠 Estrutura do Projeto

O compilador está dividido em fases independentes:
- **Lexer**: Transforma o código fonte em tokens.
- **Parser**: Constrói a árvore de sintaxe abstrata (AST) a partir dos tokens.
- **Semantic Analyzer**: Valida a lógica do programa (ex: declaração de variáveis).
- **Executor**: Script de automação que valida os casos de sucesso e erro.

##  Pré-requisitos

Antes de começar, certifique-se de que tem instalado:
- [Node.js](https://nodejs.org/) (Versão 16 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

##  Como Executar

### 1. Instalar as Dependências
No terminal, na raiz do projeto, instale o TypeScript e o motor de execução:
```bash
npm install

2. Rodar a Suite de Testes Automática
node executor.js

 3. Casos de Teste Automatizados:
 O sistema valida automaticamente quatro cenários críticos:

Erro Léxico: Identificação de caracteres inválidos (ex: @).

Erro Sintático: Identificação de comandos mal formados (ex: let = 10;).

Erro Semântico: Uso de variáveis não declaradas (ex: x = 5; sem let).

Sucesso Completo: Validação de um programa funcional completo.

📁 Organização de Pastas:
├── src/
│   ├── lexer/       # Lógica do Analisador Léxico
│   ├── parser/      # Lógica do Analisador Sintático
│   ├── semantic/    # Lógica do Analisador Semântico
│   ├── input/       # Ficheiros de teste (gerados pelo executor)
│   └── index.ts     # Ponto de entrada do compilador
├── executor.js      # Runner automático de testes
└── README.md        # Documentação do projeto

