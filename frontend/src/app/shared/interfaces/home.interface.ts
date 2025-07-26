export interface Banner {
  image: string;
  title?: string;
  link: string;
  alt: string;
  maxHeight?: boolean;
  position?: string;
}

export interface ContentSection {
  subtitle: string;
  title: string;
  description?: string;
  cta: string;
  ctaLink: string;
}

export interface Testimonial {
  image: string;
  name: string;
  title: string;
  quote: string;
}

export interface Slide {
  image: string;
  offer: string;
  title: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}