//version 1.4.1 remasterizacion del codigo
//version 1.5 mejora al leer expresiones matematicas combinadas(incorporación del 'eval()') y escribír con teclado.  

// ~Version 1.6 merjora de Raiz cuadrada y funcionamiento del SYNTAX ERROR

'use strict'

const CIFRA = document.querySelector('#cifra')
const REGISTER = document.querySelector('#select')
const SHOW_BTN = document.querySelector('#show_btn')
const OTHER_OP_BTNS = document.querySelectorAll('.off')
const ALL_BTNS = document.querySelectorAll('button')

CIFRA.focus()

//Todos los bonoes comienzan con la clase 'light'
ALL_BTNS.forEach((btn)=> {if (!btn.className) btn.classList = 'light'})

const ELEMENTS_THEME = document.querySelectorAll('.light')

//Ocultar botones extras
var btnsHide = true

//Eventos para el teclado
this.onkeyup = (x) => {
	CIFRA.focus()
	CIFRA.value = CheckSyntax(CIFRA.value)
}

CIFRA.onkeydown = (x) => {

	if (CIFRA.value == 'Syntax Error') {
		CIFRA.value = ''
	}

	if (x.key == 'Enter') {Calculate()}

}

//Escribir
function Write(t) {

	if (CIFRA.value == 'Syntax Error') {
		CIFRA.value = ''
	}

	CIFRA.value += t
	CIFRA.value = CheckSyntax(CIFRA.value)

}

function CheckSyntax(text) { 

	//ERRORES DE SINTAXIS
		let errors = [
		'√√', '++', '--', '**', '//', '^^', '..',
		'+-', '+*', '+/', '+.', '+^',
		'-+', '-*', '-/', '-.', '-^',
		'*+', '*-', '*/', '*.', '*^',
		'/+', '/-', '/*', '/.', '/^',
		'.+', '.-', '.*', './', '.^',
		'^+', '^-', '^*', '^/', '^.' 
		]

	for (var i = 0; i < errors.length; i++) {
		if (text.includes(errors[i])) {
			text = text.replaceAll(errors[i], errors[i][1])
		}
	}
	return text
}

function Calculate() {

	let history = CIFRA.value + ' = '
	let res;

	// POTENTCIACION
	CIFRA.value = CIFRA.value.replaceAll('^','**') 
	
	// RAIZ CUADRADA
	if (CIFRA.value.includes('√')) {			
		CIFRA.value = CIFRA.value.replace('√','(Math.sqrt(')
		CIFRA.value += '))'
	}

	try {
		res = eval(CIFRA.value)
	}catch(e) {
		CIFRA.value = 'Syntax Error'
		res = 'Syntax Error'
	}

	history += res

	CIFRA.value = res

	REGISTER.innerHTML += '<option onclick="Register()">' + history + '</option>'
	REGISTER.selectedIndex = REGISTER.length - 1


}

function Eliminate(all){
	if (all) {
		CIFRA.value = ''
	} else {
		CIFRA.value = CIFRA.value.slice(0, CIFRA.value.length - 1)
	}
}
// Historial de operaciones
function Register(){
	let newText = REGISTER.options[REGISTER.selectedIndex].textContent
	CIFRA.value = newText.split(' = ')[1]
}

//Mostrar o ocualtar botones extra
function ShowBtns(){

	if(btnsHide){
		SHOW_BTN.style.color="#f00"
		SHOW_BTN.textContent="✖"
		btnsHide = false
		OTHER_OP_BTNS.forEach((btn)=> btn.classList.replace('off', 'on')) 
	}else{
		SHOW_BTN.style.color="#0f0"
		SHOW_BTN.textContent="✙"
		btnsHide = true
		OTHER_OP_BTNS.forEach((btn)=> btn.classList.replace('on', 'off'))
	}

}

// Cambiar tema
function ChangeTheme() {
	ELEMENTS_THEME.forEach((elmt)=> {

		if (elmt.classList.contains('light')) {
			elmt.classList.replace('light', 'dark')
			ALL_BTNS[16].textContent = '☼'
		}else{
			elmt.classList.replace('dark', 'light')
			ALL_BTNS[16].textContent = '☽'
		}

	})

}