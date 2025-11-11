import Cl_mPaciente, {iPaciente} from "./Cl_mPaciente.js";
import Cl_mCita, {iCita} from "./Cl_mCita.js";

export default class Cl_MClinica {
    private _pacientes: Cl_mPaciente[] = [];
    private _citas: Cl_mCita[] = [];
    constructor(){
        const pacientesGuardados = localStorage.getItem("pacientes");
        const citasGuardadas = localStorage.getItem("citas");
        if (pacientesGuardados) {
            this._pacientes = JSON.parse(pacientesGuardados);
        }
        if (citasGuardadas) {
            this._citas = JSON.parse(citasGuardadas);
        }
    }
    agregarPaciente({
        paciente: pacienteData,
        callback,
    }: {
        paciente: { nombre: string; edad: string; cedula: string; telefono: string; motivoConsulta: string; };
        callback: (error : string | false) => void;
    }): void {
        const paciente = new Cl_mPaciente(pacienteData);
        //validar el paciente
        let error = paciente.error(this._pacientes);
        if (error) {
            callback(error);
            return;
        }
        // Validar que no se repita la cedula
        let existe = this._pacientes.find((p: Cl_mPaciente) => p.cedula === paciente.cedula);
        if (existe) {
        callback("Ya existe un paciente con la cédula ");
        return;
        }
        this._pacientes.push(paciente);
        callback(false);
    }
    listar(): iPaciente[] {
        let lista: iPaciente[] = [];
        this._pacientes.forEach((p: Cl_mPaciente) => {
            lista.push(p.toJSON());
        });
        return lista;
    }

    buscarPaciente(cedula: string): Cl_mPaciente | undefined {
        return this._pacientes.find((p: Cl_mPaciente) => p.cedula === cedula);
    }

    agregarCita(citaData: { cedulaPaciente: string; fecha: string; hora: string; motivo: string }, callback: (error: string | false) => void): void {
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

    buscarCitasPorPaciente(cedula: string): Cl_mCita[] {
        return this._citas.filter(c => c.cedulaPaciente === cedula);
    }

    buscarCitasPorFecha(fecha: string): Cl_mCita[] {
        return this._citas.filter(c => c.fecha === fecha);
    }

    listarCitas(): iCita[] {
        return this._citas.map(c => c.toJSON());
    }


}