import { iPaciente } from "./Cl_mPaciente.js";
import { iCita } from "./Cl_mCita.js";
import Cl_MClinica from "./Cl_mClinica.js";
import { ahora } from "./tools/date.tools.js";

export default class Cl_vClinica {
public controlador: any;
    public refresh: () => void;
    public btnAgregarPaciente: HTMLButtonElement;
    private divPacientes: HTMLDivElement;
    private divCitas: HTMLDivElement;

    crearHTMLButtonElement(id: string, options: { onclick: () => void }): HTMLButtonElement {
        const button = document.createElement('button');
        button.id = id;
    button.onclick = options.onclick;
        return button;
    }

crearHTMLElement(id: string, options: { type: string; refresh: () => void }): HTMLElement {
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
        this.btnAgregarPaciente = document.getElementById('clinica_btAgregarPaciente') as HTMLButtonElement;
        this.divPacientes = this.crearHTMLElement("divPacientesRegistrados", {
            type: "CONTAINER",
            refresh: () => this.mostrarPacientesRegistrados(),
        }) as HTMLDivElement;
        this.divCitas = this.crearHTMLElement("divCitasRegistradas", {
            type: "CONTAINER",
            refresh: () => this.mostrarCitasRegistradas(),
        }) as HTMLDivElement;
    }

    mostrarPacientesRegistrados(): void {
        const tbody = document.getElementById('clinica_divPacientesRegistrados') as HTMLTableSectionElement;
        if (!tbody) return;
        tbody.innerHTML = "";
        let pacientes = this.controlador?.listar();
        if (!pacientes) return;
        pacientes.forEach((paciente: iPaciente) => {
            tbody.innerHTML += `<tr>
                <td>${paciente.nombre}</td>
                <td>${paciente.edad}</td>
                <td>${paciente.cedula}</td>
                <td>${paciente.telefono}</td>
                <td>${paciente.motivoConsulta}</td>
            </tr>`;
        });
    }

    mostrarCitasRegistradas(): void {
        const tbody = document.getElementById('clinica_divCitasRegistradas') as HTMLTableSectionElement;
        if (!tbody) return;
        tbody.innerHTML = "";
        let citas = this.controlador?.listarCitas();
        if (!citas) return;
        citas.forEach((cita: iCita) => {
            tbody.innerHTML += `<tr>
                <td>${cita.cedulaPaciente}</td>
                <td>${cita.fecha}</td>
                <td>${cita.hora}</td>
                <td>${cita.motivo}</td>
            </tr>`;
        });
    }

    agregarPaciente(): void {
        let nombre = prompt("Ingrese el nombre del paciente:");
        if (!nombre) return;
        let edad = prompt("Ingrese la edad:");
        if (!edad) return;
        let cedula = prompt("Ingrese la cédula:");
        if (!cedula) return;
        let telefono = prompt("Ingrese el teléfono:");
        if (!telefono) return;
        let motivoConsulta = prompt("Ingrese el motivo de consulta:");
        if (!motivoConsulta) return;
        this.controlador!.agregarPaciente({
            pacienteData: {
                nombre: nombre,
                edad: edad,
                cedula: cedula,
                telefono: telefono,
                motivoConsulta: motivoConsulta,
            },
            callback: (error: string | false) => {
                if (error) {
                    alert(error);
                } else {
                    // Agregar cita automática
                    const hoy = ahora();
                    const randomDays = Math.floor(Math.random() * 30) + 1;
                    const fechaCita = new Date(hoy.getTime() + randomDays * 24 * 60 * 60 * 1000);
                    const fechaStr = fechaCita.toISOString().split('T')[0];
                    const horaStr = `${Math.floor(Math.random() * 10) + 8}:00`; // 8:00 to 17:00
                    this.controlador!.agregarCita({
                        citaData: {
                            cedulaPaciente: cedula,
                            fecha: fechaStr,
                            hora: horaStr,
                            motivo: "Consulta inicial",
                        },
                        callback: (errorCita: string | false) => {
                            if (errorCita) alert("Error en cita: " + errorCita);
                        }
                    });
                }
                this.refresh();
            },
        });
    }
}