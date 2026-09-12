// Registramos el plugin de Scroll
gsap.registerPlugin(ScrollTrigger);

// Creamos la animación
gsap.to(".reloj-animado", {
  scrollTrigger: {
    trigger: "#detalles", // La animación ocurre cuando llegamos a esta sección
    start: "top bottom", // Empieza cuando la parte superior de la sección 2 toca el fondo de la pantalla
    end: "center center", // Termina cuando la sección 2 llega al centro
    scrub: 1, // ¡ESTO ES LA MAGIA! Hace que la animación siga la velocidad de tu scroll
  },
  y: 400, // Mueve el reloj 400px hacia abajo
  scale: 1.5, // Aumenta su tamaño al 150%
  rotation: 360, // Lo hace girar una vuelta completa
  duration: 1,
});
