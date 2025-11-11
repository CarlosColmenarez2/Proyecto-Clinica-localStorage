export interface iCita {
    cedulaPaciente: string;
    fecha: string;
    hora: string;
    motivo: string;
}

export default class Cl_mCita {
    private _cedulaPaciente: string = "";
    private _fecha: string = "";
    private _hora: string = "";
    private _motivo: string = "";

    constructor({
        cedulaPaciente,
        fecha,
        hora,
        motivo
    }: {
        cedulaPaciente: string;
        fecha: string;
        hora: string;
        motivo: string;
    }) {
        this._cedulaPaciente = cedulaPaciente;
        this._fecha = fecha;
        this._hora = hora;
        this._motivo = motivo;
    }

    get cedulaPaciente(): string {
        return this._cedulaPaciente;
    }
    set cedulaPaciente(cedulaPaciente: string) {
        this._cedulaPaciente = cedulaPaciente.trim().toUpperCase();
    }
    get fecha(): string {
        return this._fecha;
    }
    set fecha(fecha: string) {
        this._fecha = fecha;
    }
    get hora(): string {
        return this._hora;
    }
    set hora(hora: string) {
        this._hora = hora;
    }
    get motivo(): string {
        return this._motivo;
    }
    set motivo(motivo: string) {
        this._motivo = motivo.trim().toUpperCase();
    }

    toJSON(): iCita {
        return {
            cedulaPaciente: this._cedulaPaciente,
            fecha: this._fecha,
            hora: this._hora,
            motivo: this._motivo
        };
    }
}
