/** @type {import('tailwindcss').Config} */
//Aquí definimos qué archivos escanea Tailwind para purgar clases y extendemos el tema con la paleta consistente con tus capturas
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Usa la fuente importada en index.css
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        /* Colores de marca (hero azul, botones, etc.) */
        brand: {
          primary: "#0033CC",      // azul principal del hero / botón
          primaryDark: "#0028A3",  // azul más oscuro para hover
          primarySoft: "#E7EBFB",  // azul muy claro para fondos suaves
        },
        /* Superficies y texto (fondos claros, tarjetas, texto) */
        surface: {
          page: "#F5F7FB",     // fondo general de la app
          card: "#FFFFFF",     // fondo de tarjetas / tablas
          border: "#E5E7F0",   // bordes suaves
          muted: "#6B7280",    // texto secundario
          strong: "#111827",   // texto principal
        },
        /* Estados (chips Active, alertas, etc.) */
        status: {
          success: "#3DD68C",   // Active / OK
          warning: "#FACC6B",   // niveles intermedios / warning suave
          danger:  "#FB836F",   // errores / fatiga alta
          info:    "#38BDF8",   // información / etiquetas azules
        },
        /* Fondos de chips para objetivos de entrenamiento */
        chip: {
          hypertrophy: "#E3EBFF",   // pill azul suave
          strength:    "#E0F0FF",   // pill azul-celeste
          fatloss:     "#FFF3E0",   // pill naranja claro
          maintenance: "#E3FFE9",   // pill verde muy claro
        },
      },
      boxShadow: {
        card: "0 10px 30px rgba(15, 23, 42, 0.06)", // sombra sutil de cards
      },
      borderRadius: {
        "2xl": "1rem", // esquinas suaves, estilo UI moderna
      },
    },
  },
  plugins: [],
};
