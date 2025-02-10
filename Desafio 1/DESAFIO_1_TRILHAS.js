
function questao1() {
    console.log("Chamando função número 1...");
    const nome = "Marcelo";
    console.log(nome);
}

function questao2() {
    console.log("Chamando função número 2...");
    let idade = 25;
    let altura = 1.75;
    console.log(`idade: ${idade} e altura: ${altura}`);
}

function questao3() {
    console.log("Chamando função número 3...");
    let preco = 50;
    let desconto = 0.2;
    console.log(`Preco com desconto = ${(1 - desconto) * preco}`);
}

function questao4() {
    console.log("Chamando função número 4...");
    let temperatura = 30;
    let msg = temperatura > 25 ? "Está calor" : "Está fresco!";
    console.log(`${msg}`);
}

function questao5() {
    console.log("Chamando função número 5...");
    let idade = 25;
    let msg = idade >= 18 ? "Você é maior de idade" : "Você é menor de idade";
    console.log(`${msg}`);
}

function questao6() {
    console.log("Chamando função número 6...");
    let nota = 8;
    if (nota >= 7) console.log("Aprovado");
    else if (nota >= 5 && nota <= 6) console.log("Recuperação");
    else console.log("Reprovado");
}

function questao7() {
    console.log("Chamando função número 7...");
    let numero1 = 10;
    let numero2 = 10;
    console.log(numero1 === numero2 ? "Os números são iguais" : "Os números são diferentes");
}

function questao8() {
    console.log("Chamando função número 8...");
    let nome = "Marcelo";
    let idade = 26;
    console.log(`Olá, meu nome é ${nome} e eu tenho ${idade} anos`);
}

function questao9() {
    console.log("Chamando função número 9...");
    for (let numero = 1; numero <= 10; numero++) {
        console.log(numero);
    }
}

function questao10() {
    console.log("Chamando função número 10...");
    let numero;
    do {
        numero = window.prompt("Digite um número (digite 5 para sair):");
    } while (numero !== "5");
    console.log("Você digitou 5. Fim do loop.");
}

function questao11() {
    console.log("Chamando função número 11...");
    for (let i = 1; i <= 10; i++) {
        console.log(`7*${i} = ${7 * i}`);
    }
}

function questao12() {
    console.log("Chamando função número 12...");
    for (let i = 0; i <= 20; i++) {
        if (i % 2 == 0) console.log(i);
    }
}

function questao13(raio) {
    console.log("Chamando função número 13...");
    return Math.PI * Math.pow(raio, 2);
}

function questao14(numero1, numero2) {
    console.log("Chamando função número 14...");
    console.log(`A soma é ${numero1 + numero2}`);
}

function questao15() {
    console.log("Chamando função número 15...");
    let numero1 = 10;
    let numero2 = 20;
    function somar(numero1, numero2) {
        return numero1 + numero2;
    }
    let soma = somar(numero1, numero2);
    console.log(soma);
}


questao1();
questao2();
questao3();
questao4();
questao5();
questao6();
questao7();
questao8();
questao9();
questao10();
questao11();
questao12();
console.log("Área do círculo com raio 5: " + questao13(5));
questao14(3, 4);
questao15();