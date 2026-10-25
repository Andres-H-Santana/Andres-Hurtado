import type { ImageMetadata } from 'astro';
import vsImg from '@assets/images/vs.jpg';

// ─── Interfaces ──────────────────────────────────────────────
export interface Project {
  name: string;
  description: string;
  link: string;
  github?: string;
  technologies: string[];
  image?: ImageMetadata;
  altText?: string;
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
}

export interface Education {
  title: string;
  institution: string;
  period: string;
}

export interface Technology {
  name: string;
  icon: string; // formato de astro-icon: 'simple-icons:nombre'
}

export interface KeyIconData {
  name: string;
  body: string; // contenido del <svg> tomado de simple-icons
  width: number;
  height: number;
}

export interface Skill {
  label: string;
}

export interface Language {
  name: string;
  level: string;
}

export interface ContactLink {
  label: string;
  value: string;
  href: string;
  icon: string;
}

export interface NavItem {
  id: string; // id de la sección a la que apunta
  label: string;
}

// ─── Datos personales ────────────────────────────────────────
export const personalInfo = {
  name: 'Andres Felipe Hurtado Santana',
  role: 'Desarrollador Full Stack',
  // Texto corto que se muestra en el Hero
  summary:
    'Desarrollador Full Stack, me gusta crear interfaces limpias, minimalistas y modernas, con una arquitectura escalable y modular.',
  // Texto completo de la sección "Quién soy"
  about:
    'Hola. Como desarrollador Full Stack, me apasiona crear interfaces limpias, minimalistas y modernas. Enfoco cada proyecto bajo una arquitectura escalable y modular, priorizando la estructura y el orden. Me considero una persona adaptable, en constante aprendizaje y convencido de que un nuevo reto siempre es una oportunidad de crecimiento. Busco aportar valor real a través de un desarrollo eficiente con tecnologías modernas.',
  cvLink: '/cv.pdf',
  gmail: 'andresfelipesantana53@gmail.com',
  github: 'https://github.com/Andres-H-Santana',
  linkedin: 'https://www.linkedin.com/in/andres-santana-498a9b343/',
};

// ─── Navegación (orden = orden de las secciones en la página) ─
export const navItemsData: NavItem[] = [
  { id: 'hero', label: 'Inicio' },
  { id: 'projects', label: 'Proyectos' },
  { id: 'resume', label: 'Sobre mí' },
];

// ─── Proyectos ───────────────────────────────────────────────
export const projectsData: Project[] = [
  {
    name: 'Portfolio Personal',
    description:
      'Mi sitio web personal construido con Astro y React.',
    link: 'https://github.com/Andres-H-Santana',
    technologies: ['Astro', 'React', 'CSS'],
    image: vsImg,
    altText: 'Vista previa del portfolio personal',
  },
  {
    name: 'Vesus Motors',
    description:
      'Una herramienta diseñada para el mercado colombiano que ayuda a los usuarios a tomar la mejor decisión al comprar una motocicleta. Va más allá del precio, permitiendo comparar aspectos clave como costos de repuestos, kilometraje y rendimiento, todo en un solo lugar.',
    link: '#',
    technologies: ['React', 'Node.js', 'MongoDB'],
    image: vsImg,
    altText: 'Vista previa de herramienta comparativa de motocicletas',
  },
];

// ─── Experiencia ─────────────────────────────────────────────
export const experienceData: Experience[] = [
  {
    role: 'Analista de Datos / Desarrollador',
    company: 'Almacontact',
    period: '6 meses',
    description:
      'Enfocado en análisis de datos y desarrollo de un modelo de Machine Learning para la predicción de volumen orientado a forecast.',
  },
];

// ─── Habilidades ─────────────────────────────────────────────
export const softSkillsData: Skill[] = [
  { label: 'Resolución de problemas' },
  { label: 'Pensamiento analítico' },
  { label: 'Trabajo en equipo' },
  { label: 'Comunicación' },
  { label: 'Adaptabilidad' },
  { label: 'Aprendizaje continuo' },
];

// Antes "hard skills": ahora agrupadas como herramientas de productividad
export const toolsData: Skill[] = [
  { label: 'Manejo de herramientas ofimáticas' },
  { label: 'Herramientas IA' },
  { label: 'Colaboración y diseño digital' },
];

export const languagesData: Language[] = [
  { name: 'Inglés', level: 'A1' },
];

export const technologiesData: Technology[] = [
  { name: 'Python', icon: 'simple-icons:python' },
  { name: 'JavaScript', icon: 'simple-icons:javascript' },
  { name: 'Node.js', icon: 'simple-icons:nodedotjs' },
  { name: 'Astro', icon: 'simple-icons:astro' },
  { name: 'React', icon: 'simple-icons:react' },
  { name: 'Android Studio', icon: 'simple-icons:androidstudio' },
  { name: 'GitHub', icon: 'simple-icons:github' },
  { name: 'MySQL', icon: 'simple-icons:mysql' },
  { name: 'Vite', icon: 'simple-icons:vite' },
  { name: 'Docker', icon: 'simple-icons:docker' },
  { name: 'Cloudflare', icon: 'simple-icons:cloudflare' },
  { name: '.Net', icon: 'simple-icons:dotnet' },
  { name: 'Flutter', icon: 'simple-icons:flutter' },
  { name: 'Dart', icon: 'simple-icons:dart' },
];

// ─── Estudios ────────────────────────────────────────────────
export const educationData: Education[] = [
  {
    title: 'Tecnólogo en análisis y desarrollo de software',
    institution: 'Sena',
    period: '2024 - 2026',
  },
];

// ─── Contacto ────────────────────────────────────────────────
export const contactData: ContactLink[] = [
  {
    label: 'Gmail',
    value: personalInfo.gmail,
    href: `mailto:${personalInfo.gmail}`,
    icon: 'simple-icons:gmail',
  },
  {
    label: 'GitHub',
    value: 'Andres-H-Santana',
    href: personalInfo.github,
    icon: 'simple-icons:github',
  },
  {
    label: 'LinkedIn',
    value: 'andres-santana',
    href: personalInfo.linkedin,
    icon: 'simple-icons:linkedin',
  },
];