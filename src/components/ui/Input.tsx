'use client';

import React, { useState, forwardRef } from 'react';
import { motion } from 'framer-motion';
import { BRAND_COLORS } from '@/lib/constants';

// ============================================
// TYPES
// ============================================

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerClassName?: string;
}

// ============================================
// COMPONENT
// ============================================

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      leftIcon,
      rightIcon,
      containerClassName = '',
      className = '',
      id,
      type = 'text',
      placeholder,
      disabled,
      required,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(false);

    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setHasValue(e.target.value.length > 0);
      props.onBlur?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(e.target.value.length > 0);
      props.onChange?.(e);
    };

    const isFloating = isFocused || hasValue || placeholder;

    return (
      <div className={`w-full ${containerClassName}`.trim()}>
        {/* Input Container */}
        <div className="relative">
          {/* Left Icon */}
          {leftIcon && (
            <div 
              className="absolute left-0 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: BRAND_COLORS.silverMuted }}
            >
              {leftIcon}
            </div>
          )}

          {/* Input Field */}
          <input
            ref={ref}
            id={inputId}
            type={type}
            placeholder={placeholder || ' '}
            disabled={disabled}
            required={required}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            className={`
              w-full
              bg-transparent
              border-0
              border-b-2
              py-3
              text-base
              font-mono
              uppercase
              tracking-wider
              placeholder:font-mono
              placeholder:uppercase
              placeholder:tracking-wider
              placeholder:text-[${BRAND_COLORS.steelGray}]
              focus:outline-none
              focus:ring-0
              disabled:opacity-50
              disabled:cursor-not-allowed
              transition-colors
              duration-200
              rounded-none
              ${leftIcon ? 'pl-10' : 'pl-0'}
              ${rightIcon ? 'pr-10' : 'pr-0'}
              ${error ? `border-[${BRAND_COLORS.powerRed}]` : isFocused ? `border-[${BRAND_COLORS.electricCopper}]` : `border-[${BRAND_COLORS.steelGray}]`}
              ${className}
            `.trim().replace(/\s+/g, ' ')}
            style={{
              color: BRAND_COLORS.silverBright,
              borderColor: error 
                ? BRAND_COLORS.powerRed 
                : isFocused 
                  ? BRAND_COLORS.electricCopper 
                  : BRAND_COLORS.steelGray,
            }}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
            {...props}
          />

          {/* Right Icon */}
          {rightIcon && (
            <div 
              className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: BRAND_COLORS.silverMuted }}
            >
              {rightIcon}
            </div>
          )}

          {/* Floating Label */}
          {label && (
            <motion.label
              htmlFor={inputId}
              initial={false}
              animate={{
                y: isFloating ? -24 : 0,
                scale: isFloating ? 0.85 : 1,
                color: error 
                  ? BRAND_COLORS.powerRed 
                  : isFocused 
                    ? BRAND_COLORS.electricCopper 
                    : BRAND_COLORS.silverMuted,
              }}
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className={`
                absolute
                left-0
                top-3
                font-mono
                text-sm
                uppercase
                tracking-wider
                pointer-events-none
                origin-left
                ${leftIcon ? 'left-10' : ''}
              `.trim().replace(/\s+/g, ' ')}
            >
              {label}
              {required && (
                <span style={{ color: BRAND_COLORS.electricCopper }}> *</span>
              )}
            </motion.label>
          )}

          {/* Focus Glow Effect */}
          <motion.div
            initial={false}
            animate={{
              opacity: isFocused ? 1 : 0,
              scaleX: isFocused ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
            className="absolute bottom-0 left-0 right-0 h-0.5 pointer-events-none"
            style={{
              backgroundColor: BRAND_COLORS.electricCopper,
              boxShadow: `0 0 10px ${BRAND_COLORS.electricCopper}, 0 0 20px ${BRAND_COLORS.electricCopper}`,
              transformOrigin: 'left',
            }}
          />
        </div>

        {/* Helper Text */}
        {helperText && !error && (
          <p 
            id={`${inputId}-helper`}
            className="mt-2 text-xs font-mono uppercase tracking-wider"
            style={{ color: BRAND_COLORS.steelGray }}
          >
            {helperText}
          </p>
        )}

        {/* Error Message */}
        {error && (
          <p 
            id={`${inputId}-error`}
            className="mt-2 text-xs font-mono uppercase tracking-wider flex items-center gap-1"
            style={{ color: BRAND_COLORS.powerRed }}
          >
            <span className="inline-block w-1 h-1 rounded-none bg-current" />
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
