import { createFileRoute } from '@tanstack/react-router';
import { Portfolio } from '@/components/portfolio/portfolio';
export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Punith Kumar M — Aspiring Full-Stack Developer' },
    { name: 'description', content: 'The portfolio of Punith Kumar M: an aspiring full-stack developer learning, experimenting, and seeking internship opportunities.' },
    { property: 'og:title', content: 'Punith Kumar M — Developer Portfolio' },
    { property: 'og:description', content: 'Building digital experiences, one line at a time. Explore my learning journey and connect about internship opportunities.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Portfolio,
});
