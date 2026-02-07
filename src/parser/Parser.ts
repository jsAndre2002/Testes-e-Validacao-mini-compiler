import { Token, TokenType } from "../lexer/ILexer";
import Lexer from "../lexer/Lexer";
import ASTNode from "./IParser";

class Parser {
    private lexer: Lexer;
    private currentToken: Token;

    constructor(lexer: Lexer) {
        this.lexer = lexer;
        this.currentToken = this.lexer.getNextToken();
    }

    private eat(type: TokenType) {
        if (this.currentToken.type === type) {
            this.currentToken = this.lexer.getNextToken();
        } else {
            throw new Error(`Erro sintatico: esperado ${type}, encontrado ${this.currentToken.type}`);
        }
    }

    private factor(): ASTNode {
        const token = this.currentToken;
        if (token.type === TokenType.NUMBER) {
            this.eat(TokenType.NUMBER);
            return { type: "NumberLiteral", value: Number(token.value) };
        }
        if (token.type === TokenType.IDENTIFIER) {
            this.eat(TokenType.IDENTIFIER);
            return { type: "Identifier", name: token.value };
        }
        throw new Error(`Fator invalido: encontrado ${token.type}`);
    }

    private expr(): ASTNode {
        let node = this.factor();
        // Permite operações matemáticas básicas
        while (
            this.currentToken.type === TokenType.PLUS ||
            this.currentToken.type === TokenType.MINUS ||
            this.currentToken.type === TokenType.MULT ||
            this.currentToken.type === TokenType.DIVIDED
        ) {
            const operatorToken = this.currentToken;
            this.eat(operatorToken.type);
            node = {
                type: "BinaryExpression",
                operator: operatorToken.value,
                left: node,
                right: this.factor()
            };
        }
        return node;
    }

    private statement(): ASTNode {
        // Caso 1: Declaração (let x = 10;)
        if (this.currentToken.type === TokenType.LET) {
            this.eat(TokenType.LET);
            const id = this.currentToken.value;
            this.eat(TokenType.IDENTIFIER);
            this.eat(TokenType.ASSIGN);
            const value = this.expr();
            this.eat(TokenType.SEMICOLON);
            return { type: "VariableDeclaration", id, value };
        }

        // Caso 2: Print (print x;)
        if (this.currentToken.type === TokenType.PRINT) {
            this.eat(TokenType.PRINT);
            const value = this.expr();
            this.eat(TokenType.SEMICOLON);
            return { type: "PrintStatement", value };
        }

        // Caso 3: Atribuição simples (x = 20;)
        if (this.currentToken.type === TokenType.IDENTIFIER) {
            const id = this.currentToken.value;
            this.eat(TokenType.IDENTIFIER);
            this.eat(TokenType.ASSIGN);
            const value = this.expr();
            this.eat(TokenType.SEMICOLON);
            return { type: "Assignment", id, value };
        }

        throw new Error(`Comando invalido: ${this.currentToken.value || this.currentToken.type}`);
    }

    public parse(): ASTNode[] {
        const statements: ASTNode[] = [];
        while (this.currentToken.type !== TokenType.EOF) {
            statements.push(this.statement());
        }
        return statements;
    }
}

export default Parser;