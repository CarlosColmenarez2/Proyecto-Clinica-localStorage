function formatearFecha(fechaObj) {
    const anio = fechaObj.getFullYear();
    const mes = String(fechaObj.getMonth() + 1).padStart(2, "0");
    const dia = String(fechaObj.getDate()).padStart(2, "0");
    const hora = String(fechaObj.getHours()).padStart(2, "0");
    const minutos = String(fechaObj.getMinutes()).padStart(2, "0");
    return `${anio}-${mes}-${dia}T${hora}:${minutos}`;
}
function ahora() {
    return new Date();
}
function validarFecha(fechaStr) {
    const fecha = new Date(fechaStr);
    return !isNaN(fecha.getTime());
}
function diasEntreFechas(fecha1, fecha2) {
    const diffTime = Math.abs(fecha2.getTime() - fecha1.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}
export { formatearFecha, ahora, validarFecha, diasEntreFechas };
