export interface iPaciente{
    nombre : string;
    edad : string;
    cedula : string;
    telefono : string ;
    motivoConsulta : string;
}
export default class Cl_mPaciente{
    private _nombre : string = "";
    private _edad : string   = "";
    private _cedula : string = "";
    private _telefono : string = "";
    private _motivoConsulta : string = "";
    constructor({
        nombre,
        edad,
        cedula,
        telefono,
        motivoConsulta
    }:{
        nombre : string;
        edad : string ;
        cedula : string;
        telefono : string;
        motivoConsulta : string;
    }){
        this._nombre = nombre;
        this._edad = edad;
        this._cedula = cedula;
        this._telefono = telefono;
        this._motivoConsulta = motivoConsulta;
    }
    get nombre(): string {
        return this._nombre;
    }
    set nombre(nombre: string) {
        this._nombre = nombre.trim().toUpperCase();
    }
    get edad(): string {
        return this._edad;
    }
    set edad(edad: string) {
        this._edad = edad .trim().toUpperCase();
    }
    get cedula(): string {
        return this._cedula;
    }
    set cedula(cedula: string) {
        this._cedula = cedula .trim().toUpperCase();
    }
    get telefono(): string {
        return this._telefono;
    }
    set telefono(telefono: string) {
        this._telefono = telefono .trim().toUpperCase();
    }
    get motivoConsulta(): string {
        return this._motivoConsulta;
    }
    set motivoConsulta(motivoConsulta: string) {
        this._motivoConsulta = motivoConsulta .trim().toUpperCase();
    }

    error(pacientes: Cl_mPaciente[]): string | false {
        const existe = pacientes.some(p => p.cedula === this._cedula);
        if (existe) {
            return `Ya existe un paciente con la cédula ${this._cedula}.`;
        }
        return false;
    }
    toJSON(): iPaciente {
        return {
            nombre: this._nombre,
            edad: this._edad,
            cedula: this._cedula,
            telefono: this._telefono,
            motivoConsulta: this._motivoConsulta
        };
    }
}