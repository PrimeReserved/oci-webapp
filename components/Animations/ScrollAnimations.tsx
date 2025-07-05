'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ScrollAnimations() {
  const pathname = usePathname();

  useEffect(() => {
    // Reset all animations when page changes
    const resetAnimations = () => {
      const elements = document.querySelectorAll('.fade-up');
      elements.forEach((el) => {
        el.classList.remove('visible');
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    // Small delay to ensure content is loaded
    setTimeout(() => {
      resetAnimations();

      // Auto-add the fade-up class to common elements
      const elements = document.querySelectorAll(
        'div, section, article, h1, h2, h3, p, img'
      );
      elements.forEach((el) => {
        el.classList.add('fade-up');
        observer.observe(el);
      });
    }, 100);

    return () => observer.disconnect();
  }, [pathname]); // Re-run when pathname changes

  return null;
}
