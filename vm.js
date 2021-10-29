let fs = require('fs');
let argv = process.argv;
let readlineSync = require('readline-sync');

let RAM = new Array();
let IP = 0;
let nm = 0;

let progText = fs.readFileSync(argv[2], 'utf8');
progText.toString();
RAM = progText.split(/\s+/);

for (let count = 0; count < RAM.length; count++)
	console.log('В ячейке  ',count,'  хранится  ',RAM[count]);

while (RAM[IP] != 'exit'){
	switch (RAM[IP]){
		case 'input':
			console.log('введите значениe ',RAM[IP+1]);
			RAM[RAM[IP+1]] = readlineSync.questionInt('input ');
			IP += 2;
			break;
		case 'output':
			console.log('(',RAM[IP+1],') ', RAM[RAM[IP+1]]);
			IP += 2;
			break;
		case 'add':
			
			RAM[RAM[IP+3]] = RAM[RAM[IP+1]] + RAM[RAM[IP+2]] ;
			console.log('add = ',RAM[RAM[IP+3]],'(',RAM[IP+3],')');
			IP += 4;
			break;
		case 'mul':
			
			RAM[RAM[IP+3]] = RAM[RAM[IP+1]] * RAM[RAM[IP+2]] ;
			console.log('mul = ',RAM[RAM[IP+3]],'(',RAM[IP+3],')');
			IP += 4;
			break;
		case 'set':
			console.log('(',RAM[IP+1],') = (',RAM[IP+2],')');
			RAM[RAM[IP+1]] = RAM[RAM[IP+2]];
			IP += 3;
			break;
		case 'cmpr':
			console.log('name cmpr = ',RAM[IP+1]);
			nm = RAM[IP+1];
			if (RAM[RAM[IP+2]] > RAM[RAM[IP+3]]){
				while (RAM[IP] != '>' || RAM[IP+1] != nm )
					IP ++;
				IP += 2;
				break;
			}
			if (RAM[RAM[IP+2]] < RAM[RAM[IP+3]]){
				while (RAM[IP] != '<' || RAM[IP+1] != nm)
					IP++;
				IP += 2;
				break;
			}
			if (RAM[RAM[IP+2]] == RAM[RAM[IP+3]]){
				while (RAM[IP] != '=' || RAM[IP+1] != nm)
					IP ++;
				IP += 2;
				break;
			}
		case ';':
			nm = RAM[IP+1];
			while (RAM[IP] != 'endcmpr' || RAM[IP+1] != nm)
				IP++;
			IP += 2;
			break;
		case 'backcmpr':
			let k = 0; 
			nm = RAM[IP+1];
			while (RAM[k] != 'cmpr' || RAM[k+1] != nm)
				k++;
			IP = k;
			break;
		
		
		default:
			console.log('ERROR');
			IP ++;
			break;
	}
}
	
