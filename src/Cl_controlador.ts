import Cl_MClinica from "./Cl_mClinica.js";
import Cl_vClinica from "./Cl_vClinica.js";
import { iPaciente } from "./Cl_mPaciente.js";
import { iCita } from "./Cl_mCita.js";
import Cl_mPaciente from "./Cl_mPaciente.js";
import Cl_mCita from "./Cl_mCita.js";

export default class Cl_controlador {
  public modelo: Cl_MClinica;
  public vista: Cl_vClinica;
  constructor(modelo: Cl_MClinica, vista: Cl_vClinica) {
    this.modelo = modelo;
    this.vista = vista;
    this.vista.controlador = this;
    this.vista.btnAgregarPaciente.onclick = () => this.vista.agregarPaciente();
  }
  agregarPaciente({
    pacienteData,
    callback,
  }: {
    pacienteData: {
      nombre: string;
      edad: string;
      cedula: string;
      telefono: string;
      motivoConsulta: string;
    };
    callback: (error: string | false) => void;
  }): void {
    this.modelo.agregarPaciente({
      paciente: pacienteData,
      callback: (error: string | false) => {
        callback(error);
      },
    });
  }
  listar(): iPaciente[] {
    return this.modelo.listar();
  }
  buscarPaciente(cedula: string): Cl_mPaciente | undefined {
    return this.modelo.buscarPaciente(cedula);
  }
  agregarCita({
    citaData,
    callback,
  }: {
    citaData: {
      cedulaPaciente: string;
      fecha: string;
      hora: string;
      motivo: string;
    };
    callback: (error: string | false) => void;
  }): void {
    this.modelo.agregarCita(citaData, (error: string | false) => {
      callback(error);
    });
  }
  listarCitas(): iCita[] {
    return this.modelo.listarCitas();
  }
  buscarCitasPorPaciente(cedula: string): Cl_mCita[] {
    return this.modelo.buscarCitasPorPaciente(cedula);
  }
  buscarCitasPorFecha(fecha: string): Cl_mCita[] {
    return this.modelo.buscarCitasPorFecha(fecha);
  }
}
