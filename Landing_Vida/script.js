// Animación step section

const steps = document.querySelectorAll('.step');
const lineProgress = document.querySelector('.line-progress');
const contSix = document.querySelector('.cont-six');

function showStep(index) {
    if (index < steps.length) {
        steps[index].style.opacity = 1;
        const progress = steps[index].dataset.progress;
        const offset = 113.1 - (113.1 * progress / 100);
        steps[index].querySelector('.progress').style.strokeDashoffset = offset;

        let totalHeight = 0;
        steps.forEach(step => {
            totalHeight += step.offsetHeight;
        });

        let currentHeight = 0;
        for (let i = 0; i <= index; i++) {
            currentHeight += steps[i].offsetHeight;
        }

        lineProgress.style.height = currentHeight + 'px';

        setTimeout(() => {
            if (index < steps.length - 1) {
                showStep(index + 1);
            } else {
                lineProgress.style.height = totalHeight + 'px';
            }
        }, 1000);
    }
}

function startAnimation() {
    // Añadir un pequeño retraso para asegurar el renderizado
    setTimeout(() => {
        showStep(0);
    }, 100);
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            startAnimation();
            observer.unobserve(contSix);
        }
    });
}, { threshold: 0.1 });  

observer.observe(contSix);

// Formulario

const formulario = document.getElementById('miFormulario');
const formContainer = document.getElementById('formContainer');
const botonUnirme = document.getElementById('botonUnirme');
const cerrarFormulario = document.getElementById('cerrarFormulario');
const mensajeExito = document.getElementById('mensajeExito');
const cerrarMensaje = document.getElementById('cerrarMensaje');

// Función para validar un campo
function validarCampo(campo) {
    const errorSpan = document.getElementById('error-' + campo.id.replace('Método de contacto', 'tipo-contacto')); // Ajuste para el nombre del select
    let mensajeError = '';

    if (!campo.value) {
        mensajeError = 'Este campo es obligatorio';
    } else if (campo.id === 'correo' && !campo.value.includes('@')) {
        mensajeError = 'El correo no cumple con un formato valido';
    } else if (campo.id === 'telefono' && isNaN(campo.value)) {
        mensajeError = 'El teléfono debe contener solo números';
    }

    if (mensajeError) {
        campo.classList.add('error');
        campo.classList.remove('valid'); // Remover clase 'valid' si hay error
        errorSpan.textContent = mensajeError;
        return false;
    } else {
        campo.classList.remove('error');
        campo.classList.add('valid'); // Añadir clase para borde verde
        errorSpan.textContent = '';
        return true;
    }
}

// Validación al enviar el formulario
formulario.addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío del formulario por defecto
    const camposRequeridos = formulario.querySelectorAll('[required]');
    let valido = true;

    camposRequeridos.forEach(campo => {
        if (!validarCampo(campo)) {
            valido = false;
        }
    });

    if (!valido) {
        alert("Por favor, complete todos los campos obligatorios correctamente.");
        return;
    }

    // Simulación de envío de datos
    console.log('Formulario enviado');

    // Ocultar formulario y mostrar mensaje de éxito
    formContainer.classList.add('oculto');
    if (mensajeExito) {
        mensajeExito.classList.remove('oculto');
    }
});

// Cerrar mensaje de éxito cuando se haga clic en el botón "Cerrar"
if (cerrarMensaje) {
    cerrarMensaje.addEventListener('click', function() {
        mensajeExito.classList.add('oculto');
    });
}

document.addEventListener("DOMContentLoaded", function () {
    // Mostrar el formulario al inicio y ocultar el botón flotante
    formContainer.classList.remove("oculto");
    botonUnirme.classList.add("oculto");

    // Cerrar el formulario al hacer clic en la "X"
    cerrarFormulario.addEventListener("click", function () {
        formContainer.classList.add("oculto");
        botonUnirme.classList.remove("oculto");
    });

    // Cerrar el formulario al hacer scroll hacia abajo y mostrarlo al hacer scroll hacia arriba
    window.addEventListener("scroll", function () {
        if (window.scrollY > 200) {
            formContainer.classList.add("oculto");
            botonUnirme.classList.remove("oculto");
        } else {
            formContainer.classList.remove("oculto");
            botonUnirme.classList.add("oculto");
        }
    });

    
    botonUnirme.addEventListener("click", function () {
        formContainer.classList.toggle("oculto"); // Alterna la visibilidad del formulario
        botonUnirme.classList.toggle("oculto"); // Oculta o muestra el botón
    });
});

// Validación al perder el foco (onblur)
const campos = formulario.querySelectorAll('input, select, textarea');
campos.forEach(campo => {
    campo.addEventListener('blur', function() {
        validarCampo(this);
    });
});