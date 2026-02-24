'use client';

import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface TextRevealProps {
  text: string;
  delay?: number;
  stagger?: number;
  className?: string;
  showSparks?: boolean;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
}

export function TextReveal({ 
  text, 
  delay = 0, 
  stagger = 0.03,
  className = '',
  showSparks = true,
  as: Component = 'div'
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const prefersReducedMotion = useReducedMotion();

  const characters = text.split('');

  if (prefersReducedMotion) {
    return <Component className={className}>{text}</Component>;
  }

  const MotionComponent = motion[Component as keyof typeof motion] as typeof motion.div;

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const characterVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 10,
      filter: 'blur(4px)',
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: 'blur(0px)',
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.2, 0.65, 0.3, 0.9],
      },
    },
  };

  const sparkVariants: Variants = {
    hidden: { 
      opacity: 0, 
      scale: 0,
    },
    visible: { 
      opacity: [0, 0.8, 0],
      scale: [0, 1.5, 0],
      filter: 'blur(1px)',
      transition: {
        duration: 0.4,
        ease: "easeOut",
        times: [0, 0.2, 1]
      },
    },
  };

  return (
    <MotionComponent
      ref={ref}
      className={`inline-block ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {characters.map((char, index) => (
        <span key={index} className="relative inline-block">
          <motion.span
            className="inline-block"
            variants={characterVariants}
            style={{ willChange: 'transform, opacity, filter' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
          
          {showSparks && char !== ' ' && (
            <motion.span
              className="absolute -top-1 -right-1 w-1 h-1 bg-[#E85D04] rounded-full"
              variants={sparkVariants}
              style={{
                boxShadow: '0 0 6px #E85D04, 0 0 12px #F48C06',
              }}
            />
          )}
        </span>
      ))}
    </MotionComponent>
  );
}

// Word-based reveal for longer text
interface WordRevealProps {
  text: string;
  delay?: number;
  stagger?: number;
  className?: string;
  highlightWords?: string[];
  highlightClass?: string;
}

export function WordReveal({
  text,
  delay = 0,
  stagger = 0.1,
  className = '',
  highlightWords = [],
  highlightClass = 'text-[#E85D04]',
}: WordRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const prefersReducedMotion = useReducedMotion();

  const words = text.split(' ');

  if (prefersReducedMotion) {
    return <div className={className}>{text}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
    >
      {words.map((word, index) => {
        const isHighlighted = highlightWords.includes(word.toLowerCase().replace(/[.,!?]/g, ''));
        
        return (
          <motion.span
            key={index}
            className={`inline-block mr-[0.25em] ${isHighlighted ? highlightClass : ''}`}
            variants={{
              hidden: { 
                opacity: 0, 
                y: 20,
                filter: 'blur(4px)',
              },
              visible: { 
                opacity: 1, 
                y: 0,
                filter: 'blur(0px)',
                transition: {
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                },
              },
            }}
            style={{ willChange: 'transform, opacity, filter' }}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.div>
  );
}

// Line-by-line reveal for paragraphs
interface LineRevealProps {
  lines: string[];
  delay?: number;
  stagger?: number;
  className?: string;
  lineClassName?: string;
}

export function LineReveal({
  lines,
  delay = 0,
  stagger = 0.15,
  className = '',
  lineClassName = '',
}: LineRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className={className}>
        {lines.map((line, index) => (
          <div key={index} className={lineClassName}>
            {line}
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
    >
      {lines.map((line, index) => (
        <motion.div
          key={index}
          className={lineClassName}
          variants={{
            hidden: { 
              opacity: 0, 
              x: -30,
              filter: 'blur(4px)',
            },
            visible: { 
              opacity: 1, 
              x: 0,
              filter: 'blur(0px)',
              transition: {
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
              },
            },
          }}
          style={{ willChange: 'transform, opacity, filter' }}
        >
          {line}
        </motion.div>
      ))}
    </motion.div>
  );
}
