class Dialogo extends HTMLDialogElement{
    constructor(propiedades){
        super();

        if(propiedades !== undefined){
            this.objeto = {};
            this.aplicarPropiedades(propiedades);
        }

        this.style.flexDirection = 'column';
    }

    #iteraryAsignar(objeto, target){
        Object.keys(objeto).forEach(llave => {
            if(typeof objeto[llave] === 'object' && objeto[llave] !== null){
                if(llave === "style"){
                    this.aplicarPropiedades(objeto[llave], this.style)
                    return
                }
                this.#iteraryAsignar(objeto[llave], target[llave]);
            }
            target[llave] = objeto[llave];
        })
    }

    agregarFila(elementos, style){
        const fila = document.createElement('div');
        fila.style.display = 'flex';
        this.aplicarEstilos(style, fila.style)
        elementos.forEach(elemento => {
            fila.appendChild(elemento)
        });

        this.appendChild(fila);

    }

    borrarFila(numero_fila){
        this.removeChild(this.children[numero_fila])
    }

    borrarElemento(numero_fila, element){
        this.children[numero_fila].removeChild(element)
    }

    limpiarTodo(){
        this.innerHTML = '';
    }

    agregarBody(){
        document.body.appendChild(this)
    }

    obj(){return this.objeto}

    mostrar(){
        super.show()
        this.style.display = 'flex'
    }

    mostrarModal(){
        super.showModal()
        this.style.display = 'flex'
        this.style.flexDirection = 'column'
    }

    ocultar(){
        super.close()
        this.style.display = 'none'
    }

    aplicarEstilos(styles, target){
        for(const llave in styles){
            target[llave] = styles[llave]
        }
    }

    aplicarPropiedades(propiedades){
        this.#iteraryAsignar(propiedades, this);
        this.objeto = Object.assign({}, this.objeto, propiedades)
    }

}
customElements.define("gd-tag", Dialogo, {extends: 'dialog'});

const grid = new Dialogo({hola : 'Profe'})
const inputText = document.createElement('input')
inputText.placeholder = 'Escriba aqui'
grid.agregarFila([inputText], {})

const inputBoton = document.createElement('button')
inputBoton.innerHTML = 'Aceptar'
grid.agregarFila([inputBoton], {})

const inputBorrar = document.createElement('input')
inputBorrar.placeholder = 'Fila a Borrar'
grid.agregarFila([inputBorrar], {margin: "2px"})

const borrarBoton = document.createElement('button')
borrarBoton.innerHTML = 'Borrar'
grid.agregarFila([borrarBoton], {})

const titulo = document.createElement('h1')
titulo.innerHTML = 'Hola Profe'

const titulo_adios = document.createElement('h1')
titulo_adios.innerHTML = 'Adios Profe'

const saludo = document.createElement('h3')
saludo.innerHTML = 'Buenos dias profe!'

grid.agregarFila([titulo], {gap: '15px', justifyContent: 'space-between'})
grid.agregarFila([saludo], {})
grid.agregarFila([titulo_adios], {gap: '15px', justifyContent: 'space-between'})

const openn = document.createElement('button')
openn.innerHTML = 'Abrir'
document.body.append(openn)

openn.addEventListener("click" ,() => { //Funcion que muestra el dialogo al presionar Abrir
    grid.agregarBody();
    grid.mostrar();
})

const openModal = document.createElement('button')
openModal.innerHTML = 'Abrir Modal'
document.body.append(openModal)

openModal.addEventListener("click", () => { //Muestra el modal del dialogo
    grid.agregarBody();
    grid.mostrarModal();
})

const botoncito = document.createElement('button')
botoncito.innerHTML = 'Cerrar'

grid.agregarFila([botoncito], {justifyContent: 'center'})

const limpiar = document.createElement('button')
limpiar.innerHTML = "Limpiar todo"

grid.agregarFila([limpiar], {})

borrarBoton.addEventListener("click", () => {
    let sis;
    sis = parseInt(inputBorrar.value)
    if(sis <= 3){return "Estas borrando un Input"}
    if(sis == 7){return "Estas borrando un Input"}

    grid.borrarFila([sis])
})

inputBoton.addEventListener("click", () => {
    let nuevaFila = document.createElement('p')
    nuevaFila.innerHTML = inputText.value;
    grid.agregarFila([nuevaFila], {})
    console.log("hola")
})

limpiar.addEventListener("click", () => {
    grid.limpiarTodo();
})

botoncito.addEventListener("click", () =>{
    grid.ocultar()
})


console.log(grid.obj())