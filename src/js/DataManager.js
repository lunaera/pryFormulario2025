export default class DataManager {
    constructor(keySession) {
        this.keySession = keySession;
        // inicializa la sessionStorage si no existe con un aray vacio
        // convierte el string a un objeto JSON
        this.dbSession = JSON.parse(sessionStorage.getItem(this.keySession)) || [];
    }

    // CREATE
    createData(objArticulo) {
        // agrega el objeto al array
        this.dbSession.push(objArticulo);
        // convierte el array a un string formato JSON y lo guarda en sessionStorage
        sessionStorage.setItem(this.keySession, JSON.stringify(this.dbSession));
    }

    //READ
    readData() {
        // convierte el string a un objeto JSON y lo devuelve
        return this.dbSession;
    }

    //UPDATE
    updateData(id, objArticulo) {
        // busca el objeto por id y lo actualiza
        this.dbSession = this.dbSession.map((articulo) => {
            if (articulo.id === id) {
                // devuelve un objeto actualizado
                return { ...articulo, ...objArticulo }; // mediante la propagación se actualizan los valores del objeto
                // cada propiedad del objeto articulo es reemplazada por el valor del nuevo objeto objArticulo
            }
            return articulo; // en caso de que el id no coincida, devuelve el objeto original almacenado en la session
        });

        // convierte el array a un string y lo guarda en sessionStorage
        sessionStorage.setItem(this.keySession, JSON.stringify(this.dbSession));
    }

    //DELETE
    delete(idArticulo) {
        // filtra el array y elimina el objeto con el id correspondiente, 
        // es decir devuelve un nuevo array sin el objeto que se quiere eliminar
        this.dbSession = this.dbSession.filter((articulo) => articulo.id !== idArticulo);
        // convierte el array a un string y lo guarda en sessionStorage
        sessionStorage.setItem(this.keySession, JSON.stringify(this.dbSession));
    }

    //CLEAR
    clear() {
        // limpia el sessionStorage
        //sessionStorage.clear(); // limpia todo el sessionStorage
        sessionStorage.removeItem(this.keySession); // limpia solo el item correspondiente a la keySession

        // inicializa la sessionStorage si no existen datos lo hace con un array vacío
        this.dbSession = JSON.parse(sessionStorage.getItem(this.keySession)) || [];
        // this.dbSession = []; // otra forma de inicializar el array vacío
    }
}