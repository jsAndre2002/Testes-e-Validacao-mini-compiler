import * as fs from 'fs';
import * as path from 'path';
import Lexer from './lexer/Lexer'; 
import Parser from './parser/Parser'; 
import SemanticAnalyzer from './semantic/Semantic';

const args = process.argv.slice(2);
const filePath = args[0];
const targetStage = args[1] || 'full'; 

try {
    if (!filePath) throw new Error("Caminho do ficheiro nao fornecido.");
    const absolutePath = path.resolve(filePath);
    const inputCode = fs.readFileSync(absolutePath, 'utf-8');

    // Inicializa o motor
    const lexer = new Lexer(inputCode);

    if (targetStage === 'lexer') {
        while (lexer.getNextToken().type !== 'EOF'); // Apenas valida se o Lexer explode
        console.log("SUCESSO: Fase Lexica validada.");
        process.exit(0);
    }

    const parser = new Parser(lexer);
    const ast = parser.parse();

    if (targetStage === 'parser') {
        console.log("SUCESSO: Fase Sintatica validada.");
        process.exit(0);
    }

    const analyzer = new SemanticAnalyzer();
    analyzer.execute(ast);
    
    console.log("SUCESSO: Compilacao Completa.");
    process.exit(0);

} catch (error: any) {
    // IMPORTANTE: O executor.js espera ver a palavra ERRO no início
    console.error(`ERRO: ${error.message}`);
    process.exit(1);
}