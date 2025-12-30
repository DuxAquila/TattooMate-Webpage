'use client';

import { ReactNode, useEffect, useRef } from 'react';

function animateOpen(details: HTMLDetailsElement) {
  const panel = details.querySelector<HTMLElement>('[data-faq-panel]');
  if (!panel) return;

  // Startzustand (geschlossen)
  panel.style.overflow = 'hidden';
  panel.style.height = '0px';
  panel.style.opacity = '0';

  // target height messen
  const target = panel.scrollHeight;

  // Animation starten
  requestAnimationFrame(() => {
    panel.style.transition = 'height 240ms ease, opacity 200ms ease';
    panel.style.height = `${target}px`;
    panel.style.opacity = '1';
  });

  // Nach Animation auf auto zurück (damit responsive/mehrzeilig korrekt bleibt)
  const onEnd = () => {
    panel.style.transition = '';
    panel.style.height = 'auto';
    panel.style.overflow = '';
    panel.removeEventListener('transitionend', onEnd);
  };
  panel.addEventListener('transitionend', onEnd);
}

function animateClose(details: HTMLDetailsElement, onDone: () => void) {
  const panel = details.querySelector<HTMLElement>('[data-faq-panel]');
  if (!panel) {
    onDone();
    return;
  }

  // aktuelle Höhe fixieren (von auto -> px)
  const start = panel.scrollHeight;

  panel.style.overflow = 'hidden';
  panel.style.height = `${start}px`;
  panel.style.opacity = '1';

  // dann auf 0 animieren
  requestAnimationFrame(() => {
    panel.style.transition = 'height 220ms ease, opacity 160ms ease';
    panel.style.height = '0px';
    panel.style.opacity = '0';
  });

  const onEnd = () => {
    panel.style.transition = '';
    panel.style.height = '';
    panel.style.opacity = '';
    panel.style.overflow = '';
    panel.removeEventListener('transitionend', onEnd);
    onDone();
  };
  panel.addEventListener('transitionend', onEnd);
}

export default function FaqAccordion({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    // initial: alle Panels korrekt setzen (offene auf auto/1, geschlossene auf 0)
    root.querySelectorAll('details').forEach((d) => {
      const panel = d.querySelector<HTMLElement>('[data-faq-panel]');
      if (!panel) return;
      if (d.hasAttribute('open')) {
        panel.style.height = 'auto';
        panel.style.opacity = '1';
      } else {
        panel.style.height = '0px';
        panel.style.opacity = '0';
        panel.style.overflow = 'hidden';
      }
    });

    const onClick = (ev: Event) => {
      const summary = (ev.target as HTMLElement)?.closest('summary');
      if (!summary) return;

      const details = summary.closest('details') as HTMLDetailsElement | null;
      if (!details) return;

      ev.preventDefault(); // wir steuern open/close selbst

      const isOpen = details.hasAttribute('open');

      // wenn geschlossen -> öffnen + alle anderen schließen
      if (!isOpen) {
        // andere schließen (mit Animation)
        root.querySelectorAll('details[open]').forEach((other) => {
          if (other === details) return;
          animateClose(other as HTMLDetailsElement, () => {
            (other as HTMLDetailsElement).removeAttribute('open');
          });
        });

        // dieses öffnen
        details.setAttribute('open', '');
        animateOpen(details);
        return;
      }

      // wenn offen -> schließen
      animateClose(details, () => {
        details.removeAttribute('open');
      });
    };

    root.addEventListener('click', onClick, true);
    return () => root.removeEventListener('click', onClick, true);
  }, []);

  return (
    <div ref={ref} className="tm-faq">
      {children}
    </div>
  );
}
