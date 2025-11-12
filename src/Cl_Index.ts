import Cl_controlador from "./Cl_controlador.js";
import Cl_MClinica from "./Cl_mClinica.js";
import Cl_mPaciente, { iPaciente } from "./Cl_mPaciente.js";
import Cl_mCita, { iCita } from "./Cl_mCita.js";
import Cl_vClinica from "./Cl_vClinica.js";

export default class Cl_Index {
  public modelo: Cl_MClinica;
  public vista: Cl_vClinica;
  constructor() {
    this.modelo = new Cl_MClinica();
    let pacientesLS = localStorage.getItem("pacientes");
    if (pacientesLS) {
      let pacientesDT = JSON.parse(pacientesLS);
      pacientesDT.forEach((paciente: iPaciente) => {
        this.modelo.agregarPaciente({
          paciente: paciente,
          callback: (error: string | false) => {
            // Ignorar errores al cargar desde localStorage
          },
        });
      });
    }
    let citasLS = localStorage.getItem("citas");
    if (citasLS) {
      let citasDT = JSON.parse(citasLS);
      citasDT.forEach((cita: iCita) => {
        this.modelo.agregarCita({
          cedulaPaciente: cita.cedulaPaciente,
          fecha: cita.fecha,
          hora: cita.hora,
          motivo: cita.motivo
        }, (error: string | false) => {
          // Ignorar errores al cargar desde localStorage
        });
      });
    }
    this.vista = new Cl_vClinica();
    let controlador = new Cl_controlador(this.modelo, this.vista);
    this.vista.controlador = controlador;
    this.vista.refresh();
  }
}
