export default class Cl_mCita {
    constructor({ cedulaPaciente, fecha, hora, motivo }) {
        this._cedulaPaciente = "";
        this._fecha = "";
        this._hora = "";
        this._motivo = "";
        this._cedulaPaciente = cedulaPaciente;
        this._fecha = fecha;
        this._hora = hora;
        this._motivo = motivo;
    }
    get cedulaPaciente() {
        return this._cedulaPaciente;
    }
    set cedulaPaciente(cedulaPaciente) {
        this._cedulaPaciente = cedulaPaciente.trim().toUpperCase();
    }
    get fecha() {
        return this._fecha;
    }
    set fecha(fecha) {
        this._fecha = fecha;
    }
    get hora() {
        return this._hora;
    }
    set hora(hora) {
        this._hora = hora;
    }
    get motivo() {
        return this._motivo;
    }
    set motivo(motivo) {
        this._motivo = motivo.trim().toUpperCase();
    }
    toJSON() {
        return {
            cedulaPaciente: this._cedulaPaciente,
            fecha: this._fecha,
            hora: this._hora,
            motivo: this._motivo
        };
    }
}
