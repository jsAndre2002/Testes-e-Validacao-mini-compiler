import ASTNode from "../parser/IParser";

export class SemanticAnalyzer {
    // Tabela de símbolos para guardar as variáveis declaradas
    private symbolTable: Set<string> = new Set();

    public execute(ast: ASTNode[]): void {
        for (const node of ast) {
            this.visit(node);
        }
    }

    private visit(node: ASTNode): void {
        switch (node.type) {
            case "VariableDeclaration":
                // Ao encontrar 'let x = ...', adicionamos 'x' à tabela
                if (node.id) {
                    this.symbolTable.add(node.id);
                }
                if (node.value) this.visit(node.value);
                break;

            case "Assignment":
                // Erro aqui: se tentar atribuir a algo que não está na tabela
                if (node.id && !this.symbolTable.has(node.id)) {
                    throw new Error(`Variavel nao declarada: ${node.id}`);
                }
                if (node.value) this.visit(node.value);
                break;

            case "Identifier":
                // Erro aqui: se tentar usar uma variável num print ou expressão sem declarar
                if (node.name && !this.symbolTable.has(node.name)) {
                    throw new Error(`Variavel nao declarada: ${node.name}`);
                }
                break;

            case "PrintStatement":
                if (node.value) this.visit(node.value);
                break;

            case "BinaryExpression":
                if (node.left) this.visit(node.left);
                if (node.right) this.visit(node.right);
                break;

            case "NumberLiteral":
                break;

            default:
                // Se houver sub-nós não mapeados, visitamos recursivamente
                break;
        }
    }
}

export default SemanticAnalyzer;