const arrayCuotas = [];
let interesesBase = 1;

const agregarObjetosArray = function (num) //funcion para agregar cuotas e intereses al array ===> la hace reutilizable :) .
{
    
for(let i = 0; i <=num; i++){
    let cuotas=i;
    let intereses = ((interesesBase+(i*0.02))).toFixed(2);
    let id=i;
    let objArray =
    { id: id,
      cuotas: cuotas,
      intereses: intereses        
    };
     arrayCuotas.push(objArray);
}}
agregarObjetosArray(24);// diferentes casos segun las cuotas que deseemos tener... 

//para validar el monto sino devuelve null  mas adelante si es null, voy a agregar algun aviso que sea visible en el dom 
const  validarMonto = function () {
 
    const montoInput = document.getElementById("monto");
    const monto = Number(montoInput.value);

    return (!isNaN(monto) &&monto>0)? monto : null;
    
};
//para validar cuotas sino devuelve null          mas adelante si es null, voy a agregar algun aviso que sea visible en el dom 
const validarCuotas = function () {
    const cuotasInput = document.getElementById("cuotas");
    const cuotas = Number(cuotasInput.value);
    return (cuotas>=1 && cuotas<=24)? cuotas : null;

};

let valorFinal = 
{
    intereses:arrayCuotas[validarCuotas()]?.intereses,
    montoFinal:""

};

let body = document.getElementById("body");
let section = document.getElementById("section");
let parrafoError = document.createElement("p");
parrafoError.classList.add("parrafoError");
parrafoError.innerHTML = "Porfavor ingrese datos validos.";
let inputButton = document.createElement("input");
inputButton.id="finalizar";
inputButton.type="button";
inputButton.value="finalizar";
section.appendChild(inputButton);


const errorMsg = ()=> {section.appendChild(parrafoError)};
const guardarDatos= function() {
    

    document.getElementById("enviar").addEventListener("click", 
        () =>  {

            const montoValido = validarMonto();
            const cuotasValidas = validarCuotas();
        if(montoValido!==null && cuotasValidas!==null)
            {
                localStorage.setItem("monto", montoValido);
                localStorage.setItem("cuotas", cuotasValidas);
                location.reload();        
            }
            else {
                    return errorMsg();
                 };
                 return montoValido 

})};

const borrarLocalStorage =  function () //para borrar el localStorage
    {
        document.getElementById("borrar").addEventListener("click",
            () => { localStorage.clear();           
                   location.reload();
           
                })
};

const procesarPrestamo = function()
{   const IVA = 1.21;
    const montoFinal = Number(localStorage.getItem("monto"));
    const cuotasFinal = Number(localStorage.getItem("cuotas"));
    const resultadoFinal=(montoFinal*arrayCuotas[cuotasFinal].intereses)*IVA;
    const montoMostrar = {
        intereses:arrayCuotas[validarCuotas()]?.intereses,
        montoFinal:resultadoFinal.toFixed()
    }
    return localStorage.setItem("valor final",JSON.stringify(montoMostrar));
};
let verFinal = document.createElement("p");
verFinal.id = "parrafoFinal";
verFinal.innerHTML = `El monto final es ${JSON.parse(localStorage.getItem("valor final"))?.montoFinal}$ con un multiplicador de ${JSON.parse(localStorage.getItem("valor final"))?.intereses} sobre el monto final mas el IVA`

document.getElementById("finalizar").addEventListener("click", 

    ()=>{
       
       section.appendChild(verFinal);
    }
)

guardarDatos();
borrarLocalStorage();
procesarPrestamo();


