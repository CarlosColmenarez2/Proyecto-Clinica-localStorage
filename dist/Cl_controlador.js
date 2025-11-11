export default class Cl_controlador {
    constructor(modelo, vista) {
        this.modelo = modelo;
        this.vista = vista;
        this.vista.controlador = this;
        this.vista.btnAgregarPaciente.onclick = () => this.vista.agregarPaciente();
    }
    agregarPaciente({ pacienteData, callback, }) {
        this.modelo.agregarPaciente({
            paciente: pacienteData,
            callback: (error) => {
                callback(error);
            },
        });
    }
    listar() {
        return this.modelo.listar();
    }
    buscarPaciente(cedula) {
        return this.modelo.buscarPaciente(cedula);
    }
    agregarCita({ citaData, callback, }) {
        this.modelo.agregarCita(citaData, (error) => {
            callback(error);
        });
    }
    listarCitas() {
        return this.modelo.listarCitas();
    }
    buscarCitasPorPaciente(cedula) {
        return this.modelo.buscarCitasPorPaciente(cedula);
    }
    buscarCitasPorFecha(fecha) {
        return this.modelo.buscarCitasPorFecha(fecha);
    }
}
