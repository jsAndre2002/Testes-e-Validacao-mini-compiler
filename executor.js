const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// 1. Configuração dos Casos de Teste (Dados e Expectativas)
const tests = [
    { 
        name: "Erro Léxico (Caractere @)", 
        file: "err_lex.txt", 
        content: "let x = @10;", 
        stage: "lexer", 
        expect: "fail" 
    },
    { 
        name: "Erro Sintático (Falta Identificador)", 
        file: "err_sin.txt", 
        content: "let = 10;", 
        stage: "parser", 
        expect: "fail" 
    },
    { 
        name: "Erro Semântico (Var não declarada)", 
        file: "err_sem.txt", 
        content: "y = 5;", 
        stage: "full", 
        expect: "fail" 
    },
    { 
        name: "Sucesso Completo", 
        file: "sucesso.txt", 
        content: "let x = 10; x = x + 5; print x;", 
        stage: "full", 
        expect: "pass" 
    }
];

const inputDir = path.join(__dirname, 'src', 'input');

// 2. Cria a pasta 'src/input' se não existir
if (!fs.existsSync(inputDir)) {
    fs.mkdirSync(inputDir, { recursive: true });
}

console.log("=== INICIANDO SUITE AUTOMÁTICA DE TESTES ===\n");

tests.forEach(t => {
    const inputPath = path.join(inputDir, t.file);

    // 3. CRIAÇÃO AUTOMÁTICA: Escreve o ficheiro de teste antes de rodar
    fs.writeFileSync(inputPath, t.content);

    try {
        // Executa o compilador
        execSync(`npx ts-node src/index.ts "${inputPath}" ${t.stage}`, { stdio: 'pipe' });        
        if (t.expect === "pass") {
            console.log(`[OK] ${t.name}: Passou conforme esperado.`);
        } else {
            console.error(`[FALHA] ${t.name}: O compilador devia ter rejeitado este código.`);
        }
    } catch (err) {
        if (t.expect === "fail") {
            console.log(`[OK] ${t.name}: Erro detectado corretamente na fase [${t.stage}].`);
        } else {
            console.error(`[FALHA] ${t.name}: Erro inesperado -> ${err.message}`);
        }
    }
});

console.log("\n=== TESTES CONCLUÍDOS ===");