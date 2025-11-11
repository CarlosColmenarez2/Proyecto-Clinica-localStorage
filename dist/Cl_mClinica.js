import Cl_mPaciente from "./Cl_mPaciente.js";
import Cl_mCita from "./Cl_mCita.js";
export default class Cl_MClinica {
    constructor() {
        this._pacientes = [];
        this._citas = [];
        const pacientesGuardados = localStorage.getItem("pacientes");
        const citasGuardadas = localStorage.getItem("citas");
        if (pacientesGuardados) {
            this._pacientes = JSON.parse(pacientesGuardados);
        }
        if (citasGuardadas) {
            this._citas = JSON.parse(citasGuardadas);
        }
    }
    agregarPaciente({ paciente: pacienteData, callback, }) {
        const paciente = new Cl_mPaciente(pacienteData);
        //validar el paciente
        let error = paciente.error(this._pacientes);
        if (error) {
            callback(error);
            return;
        }
        // Validar que no se repita la cedula
        let existe = this._pacientes.find((p) => p.cedula === paciente.cedula);
        if (existe) {
            callback("Ya existe un paciente con la cédula ");
            return;
        }
        this._pacientes.push(paciente);
        callback(false);
    }
    listar() {
        let lista = [];
        this._pacientes.forEach((p) => {
            lista.push(p.toJSON());
        });
        return lista;
    }
    buscarPaciente(cedula) {
        return this._pacientes.find((p) => p.cedula === cedula);
    }
    agregarCita(citaData, callback) {
        const paciente = this.buscarPaciente(citaData.cedulaPaciente);
        if (!paciente) {
            callback(`No existe paciente con cédula ${citaData.cedulaPaciente}`);
            return;
        }
        const existe = this._citas.some(c => c.cedulaPaciente === citaData.cedulaPaciente && c.fecha === citaData.fecha && c.hora === citaData.hora);
        if (existe) {
            callback(`Ya existe una cita para ${citaData.cedulaPaciente} en ${citaData.fecha} a las ${citaData.hora}`);
            return;
        }
        const cita = new Cl_mCita(citaData);
        this._citas.push(cita);
        localStorage.setItem('citas', JSON.stringify(this._citas));
        callback(false);
    }
    buscarCitasPorPaciente(cedula) {
        return this._citas.filter(c => c.cedulaPaciente === cedula);
    }
    buscarCitasPorFecha(fecha) {
        return this._citas.filter(c => c.fecha === fecha);
    }
    listarCitas() {
        return this._citas.map(c => c.toJSON());
    }
}
