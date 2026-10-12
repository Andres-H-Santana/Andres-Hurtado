import type { ImageMetadata } from 'astro';
import vsImg from '@assets/images/vs.jpg';

export interface Project {
  id: number;
  name: string;
  description: string;
  link: string;
  technologies: string[];
  image?: ImageMetadata;
  altText?: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface Experience {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface Education {
  id: number;
  title: string;
  institution: string;
  period: string;
}

export const personalInfo = {
  name: 'Andres Hurtado',
  role: 'Desarrollador Full Stack',
  description: 'Hola. Como desarrollador Full Stack, me apasiona crear interfaces limpias, minimalistas y modernas. Enfoco cada proyecto bajo una arquitectura escalable y modular, priorizando la estructura y el orden. Me considero una persona adaptable, en constante aprendizaje y convencido de que un nuevo reto siempre es una oportunidad de crecimiento. Busco aportar valor real a través de un desarrollo eficiente con tecnologías modernas.',
  cvLink: '/cv.pdf',
  gmail: 'andresfelipesantana53@gmail.com',
  github: 'https://github.com/Andres-H-Santana',
  linkedin: 'https://www.linkedin.com/in/andres-santana-498a9b343/'
};

export const projectsData: Project[] = [
  {

    id: 1,
    name: 'Portfolio Personal',
    description: 'Mi sitio web personal construido con Astro y React.',
    link: 'https://github.com/tu-usuario/portfolio',
    technologies: ['Astro', 'React', 'CSS'],
    image: vsImg,
    altText: 'Vista previa de herramienta comparativa de precios de vehiculos',
  },
  {
    id: 2,
    name: 'Herramienta Comparativa de Precios de Vehículos',
    description: 'Una aplicación web que permite comparar precios de vehículos de diferentes referencias.',
    link: '#',
    technologies: ['React', 'Node.js', 'MongoDB'],
    image: vsImg,
    altText: 'Vista previa de herramienta comparativa de precios de vehiculos',
  },
];

// Ahora agrupamos por categoría (más limpio visualmente)
export const skillsData: SkillGroup[] = [
  {
    category: 'Frontend',
    items: ['React', 'Astro', 'TypeScript', 'Tailwind', 'CSS'],
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL'],
  },
  {
    category: 'Herramientas',
    items: ['Git', 'Docker', 'Vite', 'Figma'],
  },
];

export const experienceData: Experience[] = [
  {
    id: 1,
    role: 'Desarrollador Full Stack',
    company: 'Empresa XYZ',
    period: '2023 - Presente',
    description:
      'Desarrollo de aplicaciones web con React y Node.js. Lideré la migración a Astro mejorando el rendimiento en un 40%.',
  },
  {
    id: 2,
    role: 'Desarrollador Frontend',
    company: 'Startup ABC',
    period: '2021 - 2023',
    description:
      'Construcción de interfaces con React y TypeScript. Implementación de design system interno.',
  },
];

export const educationData: Education[] = [
  {
    id: 1,
    title: 'Tecnólogo en análisis y desarrollo de software',
    institution: 'Sena',
    period: '2024 - 2026',
  },
];