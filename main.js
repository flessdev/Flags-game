let links = Object.keys(dict)
let paises = Object.values(dict)
let partidas = 1
let lista = []
let respuesta = ""
let correcto = 0
let incorrecto = 0
let interval;

let lista2 = ["uno","dos","tres","cuatro"]

const $ = (a,b=0) => document.querySelectorAll(a)[b]
const ran = a => Math.floor(Math.random() * a)

function juego(){
  let num  = ran(links.length)
  $("img").src = links[num]
  
  respuesta = paises[num]
  
  for(let i = 0; i < 4; i++){
    $("#" + lista2[i]).innerHTML = paises[ran(paises.length)]
    $("#" + lista2[i]).onclick = com
    //$("#" + lista2[i]).style.background = "white"
    
    while(lista.includes($("#" + lista2[i]).innerHTML)){
      $("#" + lista2[i]).innerHTML = paises[ran(paises.length)]
    }
    lista.push($("#" + lista2[i]).innerHTML)
  }
  if(!($("#uno").innerHTML == respuesta || $("#dos").innerHTML == respuesta || $("#tres").innerHTML == respuesta || $("#cuatro").innerHTML == respuesta)){
    res_div = $("#" + lista2[ran(4)])
    res_div.innerHTML = respuesta
  }
  else{
    for(let t=0 ; t<4 ; t++){
      if($("#" + lista2[t]).innerHTML == respuesta){
        res_div = $("#" + lista2[t])
        break
      }
    }
  }
  for (let i = 0; i < 4; i++) {
    document.getElementsByClassName("opt")[i].style.background = $("body").style.background
  }
}

function com(){
  if(this.innerHTML == respuesta){
    this.style.background =  "green"
    $("audio",0).play()
    $("#co").innerHTML = ++correcto
  }
  else{
    try{
      this.style.background = "red"
      res_div.style.background = "green"
      $("audio",1).play()
      $("#in").innerHTML = ++incorrecto
    }
    catch(e){
      res_div.style.background = "green"
      $("audio", 1).play()
      $("#in").innerHTML = ++incorrecto
    }
  }
  
  
  partidas--
  if(partidas){
    lista = []
    clearInterval(interval)
    setTimeout(juego,1000)
    value=100
    setTimeout(corre,1000)
  }
  else{
    setTimeout(mensaje,1000)
  }
}
juego()

function mensaje(){
  if(correcto < 100 && correcto >= 40){
    document.body.innerHTML = `<h1>👍</h1>
    <br>
    <br>
    <p>¡Felicidades!<br>¡Acertaste muchas preguntas!</p>
    `
  }
  else if (correcto < 40 && correcto >= 10) {
    document.body.innerHTML = `<h1>👌</h1>
    <br>
    <br>
      <p>¡Bueno!<br>¡Acertaste algunas preguntas!</p>
      `
  }
  else if (correcto < 10 && correcto > 0) {
    document.body.innerHTML = `<h1>😒</h1>
    <br>
    <br>
      <p>¡Bueno!<br>¡Sabes un poco!</p>
      `
  }
  else if (correcto == 0) {
    document.body.innerHTML = `<h1>👎</h1>
    <br>
    <br>
      <p>¡Oh Oh!<br>¡No acertaste ninguna pregunta!</p>
      `
  }
  else{
    document.body.innerHTML = `<h1>🏆</h1>
    <br>
    <br>
    <p>¡Exelente!<br>¡Eres un campeón acertaste todas las preguntas!</p>`
  }
  clearInterval(interval)
}
let value = 100
function corre(){
  interval = setInterval(function(){
    $("#pedazo").style.width = --value + "%"
    if(!value){
      value = 100
      clearInterval(interval)
      com()
    }
  },100)
}
corre()

$("body").ondblclick = function(){
  this.classList.toggle("luna")
  for(let i=0;i<4;i++){
    document.getElementsByClassName("opt")[i].classList.toggle("luna")
  }
  document.getElementById("options").classList.toggle("luna")
  document.querySelector("img").classList.toggle("luna")
}
