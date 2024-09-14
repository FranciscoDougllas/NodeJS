const nome = 'Francisco';
const peso = 93;
const altura = 1.75;

let imc = peso / (altura * altura);
console.log(`O imc de ${nome} e ${imc}`);
console.log(`O imc de ${nome} e ${imc.toFixed(2)}`);