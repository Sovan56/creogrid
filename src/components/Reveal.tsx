import { ReactNode } from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { useMotionSettings } from './MotionContext';

interface RevealProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
}

export default function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className = '',
  threshold = 0.15,
  ...props
}: RevealProps) {
  const { reducedMotion } = useMotionSettings();

  if (reducedMotion) {
    return (
      <div className={className} {...(props as any)}>
        {children}
      </div>
    );
  }

  // Define directional offsets
  const offsets = {
    up: { y: 35, x: 0 },
    down: { y: -35, x: 0 },
    left: { y: 0, x: 35 },
    right: { y: 0, x: -35 },
    none: { y: 0, x: 0 },
  };

  const initialOffset = offsets[direction];

  return (
    <motion.div
      initial={{ opacity: 0, ...initialOffset }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: threshold }}
      transition={{
        duration: duration,
        delay: delay,
        ease: [0.16, 1, 0.3, 1], // easeOutExpo / smooth cinematic easing
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Custom wrapper for list elements to display children sequentially
interface StaggerRevealProps {
  children: ReactNode[];
  staggerDelay?: number;
  initialDelay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  className?: string;
}

export function StaggerReveal({
  children,
  staggerDelay = 0.1,
  initialDelay = 0,
  direction = 'up',
  className = '',
}: StaggerRevealProps) {
  const { reducedMotion } = useMotionSettings();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={className}>
      {children.map((child, index) => (
        <Reveal
          key={index}
          direction={direction}
          delay={initialDelay + index * staggerDelay}
        >
          {child}
        </Reveal>
      ))}
    </div>
  );
}
