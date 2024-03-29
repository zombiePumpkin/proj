/*
Primeiramente eu realizei a criação de quatro arrays.
Eles são organizados em unidade, dezena, centena e especiais que seria
uma array dedicada para valores maiores que dez e menores que vinte.
Existem duas exceções: zero e cem. Estes são definidados maualmente na 
função que constroi a estrutura da fase, por não se encaixarem nos padrões
numéricos dos outros arrays.
*/

const unidade = [
	"Um",
	"Dois",
	"Tres",
	"Quatro",
	"Cinco",
	"Seis",
	"Sete",
	"Oito",
	"Nove"
];

const dezena = [
	"Dez",
	"Vinte",
	"Trinta",
	"Quarenta",
	"Cinquenta",
	"Sessenta",
	"Setenta",
	"Oitenta",
	"Noventa"
];

const centena = [
	"Cento",
	"Duzentos",
	"Trezentos",
	"Quatrocentos",
	"Quinhentos",
	"Seiscentos",
	"Setessentos",
	"Oitocentos",
	"Novecentos"
];

const especiais = [
	"Onze",
	"Doze",
	"Treze",
	"Quatorze",
	"Quinze",
	"Dezesseis",
	"Dezessete",
	"Dezoito",
	"Dezenove"
];

/*
A primeira função serve para separar o valor inteiro das casas decimais.
A ideia é que seja passado um argumento em string para que ele possa
organiza-los em um array.
Usa como parametro mesmo valor que a 'separaDecimais()', apenas
separando a parte inteira do numero.
*/

/*
ESSA FUNÇÃO FOI ATUALIZADA!
agora ela reutiliza a função 'montaFraseInteiro()' diretamente como callback
para criar números maiores!
*/

function separaInteiro(num) {
	let milhares;
	let centenas;
	let vetor = [];
	
	if ((num > 999.99) && (num <= 999999.99)) {
		milhares = parseInt(num/1000);
		centenas = parseInt(num - (milhares * 1000));
		let comparaMilhar = milhares;
		milhares = String(milhares);
		vetor = [];
		for (element of milhares) {
			vetor.push(element);
		}
		milhares = montaFraseInteiro(vetor);
		let comparaCentena = centenas;
		centenas = String(centenas);
		vetor = [];
		for (element of centenas) {
			vetor.push(element);
		}
		centenas = montaFraseInteiro(vetor);
		if (comparaMilhar != 1 && comparaCentena == 0) {
			return milhares + ' Mil';
		} else if (comparaMilhar == 1 && comparaCentena == 0) {
			return 'Mil';
		}else if (comparaMilhar == 1 && comparaCentena > 100) {
			return 'Mil ' + centenas;
		} else if (comparaMilhar == 1 && comparaCentena <= 100) {
			return 'Mil e ' + centenas;
		} else if (comparaMilhar != 1 && comparaCentena <= 100) {
			return milhares + ' Mil e ' + centenas;
		} else {
			return milhares + ' Mil ' + centenas;
		}
	} else if (num <= 999.99) {
		vetor = [];
		for (element of num) {
			vetor.push(element);
		}
		centenas = montaFraseInteiro(vetor);
		return centenas;
	}
}

/*
A segunda função serve para separar casas decimais dos valores inteiros
A ideia é que seja passado um argumento em string para que ele possa
organiza-los em um array.
Usa como parametro mesmo valor que a 'separaInteiro()', apenas
separando casas decimais do numero.
*/

function separaDecimos(num) {
	num = ((parseFloat(num) - parseInt(num)) * 100);
	num = String(parseInt(num));
	let vetor = [];
	let i = 0;
	for (element of num) {
		vetor[i] = element;
		i++;
	}
	return vetor;
}

/*
A terceira função serve para montar a estrutura da frase que sera retornada.
A ideia é que seja passado como argumento, o retorno de 'separaInteiros()'
para que ela receba os valores organizados e possa tratá-los diretamente.
*/

function montaFraseInteiro(vetor) {
	let a, b, c;
	let tam = vetor.length;
	if (tam == 3) {
		a = parseInt(vetor[0]);
		b = parseInt(vetor[1]);
		c = parseInt(vetor[2]);
	} else if (tam == 2) {
		a = 0;
		b = parseInt(vetor[0]);
		c = parseInt(vetor[1]);
	} else if (tam == 1) {
		a = 0;
		b = 0; 
		c = parseInt(vetor[0]);
	} else {
		a = 0;
		b = 0; 
		c = 0;
	}
	if (a == 0) {
		if (b == 0 && c == 0) {
			return "Zero";
		}
		if (b == 0 && c > 0) {
			c = unidade[c - 1];
			return c;
		} else if (b == 1 && c > 0) {
			c = especiais[c - 1];
			return c;
		} else if (b >= 1 && c == 0) {
			b = dezena[b - 1];
			return b;
		} else if (b > 1 && c > 0) {
			b = dezena[b - 1];
			c = unidade[c - 1];
			return b + " e " + c;
		}
	} else if (a > 0) {
		if (a == 1 && b == 0 && c == 0) {
			return "Cem";
		} else if (a > 0 && b == 0 && c == 0) {
			a = centena[a - 1];
			return a;
		}
		if (b == 0) {
			a = centena[a - 1];
			c = unidade[c - 1];
			return a + " e " + c;
		} else if (b == 1 && c >= 0) {
			a = centena[a - 1];
			c = especiais[c - 1];
			return a + " e " + c;
		} else if (b >= 1 && c == 0) {
			a = centena[a - 1];
			b = dezena[b - 1];
			return a + " e " + b;
		} else if (b > 1 && c > 0) {
			a = centena[a - 1];
			b = dezena[b - 1];
			c = unidade[c - 1];
			return a + " e " + b + " e " + c;
		}
	}
}

/*
A quarta função serve para montar a estrutura da frase que sera retornada.
A ideia é que seja passado como argumento, o retorno de 'separaDecimos()'
para que ela receba os valores organizados e possa tratá-los diretamente.
*/

function montaFraseDecimos(vetor) {
	let a, b;
	let tam = vetor.length;
	if (tam == 2) {
		a = parseInt(vetor[0]);
		b = parseInt(vetor[1]);
	} else if (tam == 1) {
		a = 0;
		b = parseInt(vetor[0]);
	} else {
		a = 0;
		b = 0;
	}
	if (a == 0 && b == 0) {
		return "Zero";
	} else if (a == 0 && b > 0) {
		b = unidade[b - 1];
		return "Zero " + b;
	} else if (a >= 1 && b == 0) {
		a = unidade[a - 1];
		return a;
	} else if ( a == 1 && b > 0) {
		b  = especiais[b - 1];
		return b;
	}else if (a == 1 && b == 0) {
		a = "Dez";
		return a;
	} else if (a >= 2 && b >= 0) {
		a = dezena[a - 1];
		b = unidade[b - 1];
		return a + " e " + b;
	}
}

/*
A quinta função é a mais importante de todas. Ela será responsável de tratar
os valores 'brutos' vindos diretamente do input. A ideia é que ela corrija pequenos
erros como inserção de pontos duplos, virgulas duplas, trocar todas as virgular por pontos
e verificar se a entrada é composta por apenas inteiros, apenas decimais ou inteiros e
decimais. ele usa o valor de entrada como argumento para as funções 'separaDecimos()'
e 'separaInteiros()' que são atribuidos em variveis para servirem como parametro da
função 'montaFraseDecimos()'  ou 'montaFraseInteiros()' criarem a estrutura do texto.
Ela usa todas as outras três funções anteriores para retornar um resultado para o html
através do angular.
*/

/*
ESSA FUNÇÃO FOI ATUALIZADA!
Ao invés de converter o número em vetor numa função para em seguida chamar outra 
função para montar a frase, agora, a função que é chamada, converte diretamente em 
vetor e monta a frase apenas instanciando a função na variável 'inteiro'.
*/

function trataNumero(num) {
	num = String(num);
	let inteiro;
	let decimos;
	let a = new RegExp(/[,]+|[.]+[,]+|[.]+/gm);
	let b = new RegExp(/[0-9]+[,.]+/gm);
	let c = new RegExp(/[,.]+[0-9]+/gm);
	if(a.test(num)) {
		num = num.replace(/[,]+|[.]+[,]+|[.]+/gm, ".");
		if (b.test(num)) {
			num = num.replace(/[,.]+/gm, ".");
			inteiro = String(parseInt(num));
			inteiro = separaInteiro(inteiro);
			decimos = String(parseFloat(num));
			decimos = separaDecimos(decimos);
			return inteiro + " ponto " + montaFraseDecimos(decimos);
		} else if (c.test(num)) {
			num = num.replace(/[,.]+/i, ".");
			decimos = String(parseFloat(num));
			decimos = separaDecimos(decimos);
			return "Zero ponto " + montaFraseDecimos(decimos);
		}
	} else {
		inteiro = String(parseInt(num));
		inteiro = separaInteiro(inteiro);
		return inteiro;
	}
}

/*
O modulo e o controlador serão os responsáveis pelas ações que seram
realizadas pelos botões e inputs da página. São responsáveis pelo
envio de valores para a função 'trataNumero()' realizar os procedimentos
necessários.
*/

modulo = angular.module('modulador', []);
modulo.controller('controlador', function($scope) {
	var afb = new RegExp(/[a-za-z]|[()/\\[\]{}|$%@!´`^~ªº:;*<>'"]+/i);
	var nmr = new RegExp(/[0-9,.]/i);
	$scope.validador = nmr;
	$scope.converte = ()=> {
		num = String($scope.valor);
		let a = new RegExp(/[,]+|[.]+[,]+|[.]+/gm);
		let b = new RegExp(/[0-9]+[,.]+/gm);
		let c = new RegExp(/[,.]+[0-9]+/gm);
		if(a.test(num)) {
			num = num.replace(/[,]+|[.]+[,]+|[.]+/gm, ".");
			if (b.test(num)) {
				num = num.replace(/[,.]+/gm, ".");
			} else if (c.test(num)) {
				num = num.replace(/[,.]+/i, ".");
			}
		}
		$scope.valor = num;
		if ($scope.valor == "" || $scope.valor == " ") {
			$scope.resultado = "Entrada vazia. Insira um valor!";
			return $scope.resultado;
		} else if (afb.test($scope.valor)) {
			$scope.resultado = "Entrada inválida. Digite apenas números!";
			return $scope.resultado;
		} else if ($scope.valor > 999999.99) {
			$scope.resultado = "Entrada inválida. O valor informado esta acima do limite!";
		} else if ($scope.valor <= -1) {
			$scope.resultado = "Entrada inválida. O valor informado esta abaixo do limite!";
		} else {
			let vlr = $scope.valor;
			$scope.resultado = trataNumero(vlr);
			return $scope.resultado;
		}
	}
	$scope.limpa = ()=> {
		$scope.valor = "";
		$scope.resultado = "";
	}
});
