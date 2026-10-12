import type { ImageMetadata } from 'astro';
import vsImg from '@assets/images/vs.jpg';

// ─── Interfaces ──────────────────────────────────────────────
export interface Project {
  id: number;
  name: string;
  description: string;
  link: string;
  technologies: string[];
  image?: ImageMetadata;
  altText?: string;
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

export interface Technology {
  name: string;
  icon: string; // nombre del icono en simple-icons
}

export interface SoftSkill {
  label: string;
}

export interface ContactLink {
  label: string;
  value: string;
  href: string;
  icon: string;
}

// ─── Datos personales ────────────────────────────────────────
export const personalInfo = {
  name: 'Andres Hurtado',
  role: 'Desarrollador Full Stack',
  description:
    'Hola. Como desarrollador Full Stack, me apasiona crear interfaces limpias, minimalistas y modernas. Enfoco cada proyecto bajo una arquitectura escalable y modular, priorizando la estructura y el orden. Me considero una persona adaptable, en constante aprendizaje y convencido de que un nuevo reto siempre es una oportunidad de crecimiento. Busco aportar valor real a través de un desarrollo eficiente con tecnologías modernas.',
  cvLink: '/cv.pdf',
  gmail: 'andresfelipesantana53@gmail.com',
  github: 'https://github.com/Andres-H-Santana',
  linkedin: 'https://www.linkedin.com/in/andres-santana-498a9b343/',
};

// ─── Proyectos ───────────────────────────────────────────────
export const projectsData: Project[] = [
  {
    id: 1,
    name: 'Portfolio Personal',
    description:
      'Mi sitio web personal construido con Astro y React.',
    link: 'https://github.com/Andres-H-Santana',
    technologies: ['Astro', 'React', 'CSS'],
    image: vsImg,
    altText: 'Vista previa del portfolio personal',
  },
  {
    id: 2,
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
    id: 1,
    role: 'Analista de Datos / Desarrollador',
    company: 'Almacontact',
    period: '6 meses',
    description:
      'Enfocado en análisis de datos y desarrollo de un modelo de Machine Learning para la predicción de volumen orientado a forecast.',
  },
];

// ─── Habilidades ─────────────────────────────────────────────
export const softSkillsData: SoftSkill[] = [
  { label: 'Amable' },
  { label: 'Adaptable' },
  { label: 'Responsable' },
  { label: 'Respetuoso' },
  { label: 'Comunicativo' },
  { label: 'Escucha activa' },
  { label: 'Analítico' },
  { label: 'Trabajo en equipo' },
  { label: 'Resolución de problemas' },
  { label: 'Proactivo' },
  { label: 'Gestión del tiempo' },
  { label: 'Aprendizaje continuo' },
];

export const hardSkillsData: SoftSkill[] = [
  { label: 'Manejo de herramientas ofimáticas' },
  { label: 'Herramientas IA' },
  { label: 'Canva' },
  { label: 'Microsoft Teams' },
  { label: 'Outlook' },
  { label: 'Inglés A1' },
];

export const technologiesData: Technology[] = [
  { name: 'SQL', icon: 'simple-icons:mysql' },
  { name: 'Python', icon: 'simple-icons:python' },
  { name: 'JavaScript', icon: 'simple-icons:javascript' },
  { name: 'TypeScript', icon: 'simple-icons:typescript' },
  { name: 'Node.js', icon: 'simple-icons:nodedotjs' },
  { name: 'Astro', icon: 'simple-icons:astro' },
  { name: 'React', icon: 'simple-icons:react' },
  { name: 'Android Studio', icon: 'simple-icons:androidstudio' },
  { name: 'GitHub', icon: 'simple-icons:github' },
  { name: 'MySQL', icon: 'simple-icons:mysql' },
  { name: 'Vite', icon: 'simple-icons:vite' },
  { name: 'Docker', icon: 'simple-icons:docker' },
  { name: 'n8n', icon: 'simple-icons:n8n' },
  { name: 'Cloudflare', icon: 'simple-icons:cloudflare' },
];

// ─── Estudios ────────────────────────────────────────────────
export const educationData: Education[] = [
  {
    id: 1,
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