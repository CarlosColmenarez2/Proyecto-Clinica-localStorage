import { ahora } from "./tools/date.tools.js";
export default class Cl_vClinica {
    crearHTMLButtonElement(id, options) {
        const button = document.createElement('button');
        button.id = id;
        button.onclick = options.onclick;
        return button;
    }
    crearHTMLElement(id, options) {
        const element = document.createElement(options.type === "CONTAINER" ? 'div' : 'div');
        element.id = id;
        // Assume refresh is called elsewhere
        return element;
    }
    constructor() {
        this.controlador = null;
        this.refresh = () => {
            this.mostrarPacientesRegistrados();
            this.mostrarCitasRegistradas();
        };
        this.btnAgregarPaciente = document.getElementById('clinica_btAgregarPaciente');
        this.divPacientes = this.crearHTMLElement("divPacientesRegistrados", {
            type: "CONTAINER",
            refresh: () => this.mostrarPacientesRegistrados(),
        });
        this.divCitas = this.crearHTMLElement("divCitasRegistradas", {
            type: "CONTAINER",
            refresh: () => this.mostrarCitasRegistradas(),
        });
    }
    mostrarPacientesRegistrados() {
        var _a;
        const tbody = document.getElementById('clinica_divPacientesRegistrados');
        if (!tbody)
            return;
        tbody.innerHTML = "";
        let pacientes = (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.listar();
        if (!pacientes)
            return;
        pacientes.forEach((paciente) => {
            tbody.innerHTML += `<tr>
                <td>${paciente.nombre}</td>
                <td>${paciente.edad}</td>
                <td>${paciente.cedula}</td>
                <td>${paciente.telefono}</td>
                <td>${paciente.motivoConsulta}</td>
            </tr>`;
        });
    }
    mostrarCitasRegistradas() {
        var _a;
        const tbody = document.getElementById('clinica_divCitasRegistradas');
        if (!tbody)
            return;
        tbody.innerHTML = "";
        let citas = (_a = this.controlador) === null || _a === void 0 ? void 0 : _a.listarCitas();
        if (!citas)
            return;
        citas.forEach((cita) => {
            tbody.innerHTML += `<tr>
                <td>${cita.cedulaPaciente}</td>
                <td>${cita.fecha}</td>
                <td>${cita.hora}</td>
                <td>${cita.motivo}</td>
            </tr>`;
        });
    }
    agregarPaciente() {
        let nombre = prompt("Ingrese el nombre del paciente:");
        if (!nombre)
            return;
        let edad = prompt("Ingrese la edad:");
        if (!edad)
            return;
        let cedula = prompt("Ingrese la cédula:");
        if (!cedula)
            return;
        let telefono = prompt("Ingrese el teléfono:");
        if (!telefono)
            return;
        let motivoConsulta = prompt("Ingrese el motivo de consulta:");
        if (!motivoConsulta)
            return;
        this.controlador.agregarPaciente({
            pacienteData: {
                nombre: nombre,
                edad: edad,
                cedula: cedula,
                telefono: telefono,
                motivoConsulta: motivoConsulta,
            },
            callback: (error) => {
                if (error) {
                    alert(error);
                }
                else {
                    // Agregar cita automática
                    const hoy = ahora();
                    const randomDays = Math.floor(Math.random() * 30) + 1;
                    const fechaCita = new Date(hoy.getTime() + randomDays * 24 * 60 * 60 * 1000);
                    const fechaStr = fechaCita.toISOString().split('T')[0];
                    const horaStr = `${Math.floor(Math.random() * 10) + 8}:00`; // 8:00 to 17:00
                    this.controlador.agregarCita({
                        citaData: {
                            cedulaPaciente: cedula,
                            fecha: fechaStr,
                            hora: horaStr,
                            motivo: "Consulta inicial",
                        },
                        callback: (errorCita) => {
                            if (errorCita)
                                alert("Error en cita: " + errorCita);
                        }
                    });
                }
                this.refresh();
            },
        });
    }
}
