export default class Cl_mPaciente {
    constructor({ nombre, edad, cedula, telefono, motivoConsulta }) {
        this._nombre = "";
        this._edad = "";
        this._cedula = "";
        this._telefono = "";
        this._motivoConsulta = "";
        this._nombre = nombre;
        this._edad = edad;
        this._cedula = cedula;
        this._telefono = telefono;
        this._motivoConsulta = motivoConsulta;
    }
    get nombre() {
        return this._nombre;
    }
    set nombre(nombre) {
        this._nombre = nombre.trim().toUpperCase();
    }
    get edad() {
        return this._edad;
    }
    set edad(edad) {
        this._edad = edad.trim().toUpperCase();
    }
    get cedula() {
        return this._cedula;
    }
    set cedula(cedula) {
        this._cedula = cedula.trim().toUpperCase();
    }
    get telefono() {
        return this._telefono;
    }
    set telefono(telefono) {
        this._telefono = telefono.trim().toUpperCase();
    }
    get motivoConsulta() {
        return this._motivoConsulta;
    }
    set motivoConsulta(motivoConsulta) {
        this._motivoConsulta = motivoConsulta.trim().toUpperCase();
    }
    error(pacientes) {
        const existe = pacientes.some(p => p.cedula === this._cedula);
        if (existe) {
            return `Ya existe un paciente con la cédula ${this._cedula}.`;
        }
        return false;
    }
    toJSON() {
        return {
            nombre: this._nombre,
            edad: this._edad,
            cedula: this._cedula,
            telefono: this._telefono,
            motivoConsulta: this._motivoConsulta
        };
    }
}
