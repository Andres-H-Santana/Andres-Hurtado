// Definimos tipos para que TypeScript nos ayude
export interface Project {
  id: number;
  name: string;
  description: string;
  link: string;
  technologies: string[];
}

export interface Skill {
  name: string;
  icon: string; // Nombre del archivo en assets/icons
}

// Datos de ejemplo (luego los cambias por los tuyos)
export const projectsData: Project[] = [
  {
    id: 1,
    name: "Portfolio Personal",
    description: "Mi sitio web personal construido con Astro y React.",
    link: "https://github.com/tu-usuario/portfolio",
    technologies: ["Astro", "React", "CSS"]
  },
  {
    id: 2,
    name: "App de Tareas",
    description: "Una aplicación para gestionar tareas diarias.",
    link: "#",
    technologies: ["React", "Node.js", "MongoDB"]
  },
  {
    id: 3,
    name: "Herramienta comparativa",
    description: "Esta herramienta esta diseñada para comparar diferentes motos, para tomar la mejor elección",
    link: "#",
    technologies: ["Próximamente"]
  }
];

export const skillsData: Skill[] = [
  { name: "React", icon: "react.svg" },
  { name: "Astro", icon: "astro.svg" },
  { name: "TypeScript", icon: "typescript.svg" }
];

export const personalInfo = {
  name: "Tu Nombre",
  role: "Desarrollador Full Stack",
  description: "Apasionado por crear interfaces limpias y funcionales.",
  cvLink: "/cv.pdf" // Pon tu PDF en la carpeta public
};