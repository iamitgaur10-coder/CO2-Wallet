import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 1. Button (Linear/Vercel style)
export const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline', size?: 'sm' | 'md' | 'lg' }>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: 'bg-white text-black hover:bg-gray-200 border border-transparent shadow-[0_0_10px_rgba(255,255,255,0.2)]',
      secondary: 'bg-surface text-gray-200 border border-border hover:bg-surface-hover hover:text-white',
      ghost: 'bg-transparent text-gray-400 hover:text-white hover:bg-white/5',
      outline: 'bg-transparent text-white border border-border hover:border-gray-500',
      danger: 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20',
    };
    const sizes = {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base'
    }
    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-white/20 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

// 2. Card (Glassmorphism + Subtle Borders)
export const Card = ({ className, children, noPadding = false }: { className?: string; children?: React.ReactNode, noPadding?: boolean }) => (
  <div className={cn('rounded-xl border border-border bg-surface/50 backdrop-blur-sm shadow-sm', !noPadding && 'p-6', className)}>
    {children}
  </div>
);

// 3. Badge (Status indicators)
export const Badge = ({ children, variant = 'neutral', className }: { children?: React.ReactNode, variant?: 'success' | 'warning' | 'neutral' | 'danger', className?: string }) => {
    const styles = {
        success: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
        warning: 'bg-amber-500/10 text-amber-500 border-amber-500/20',
        danger: 'bg-red-500/10 text-red-500 border-red-500/20',
        neutral: 'bg-gray-800 text-gray-400 border-gray-700'
    };
    return (
        <span className={cn("inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-mono font-medium uppercase tracking-wider", styles[variant], className)}>
            {children}
        </span>
    );
}

// 4. Input (Clean, minimal)
export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
    ({ className, ...props }, ref) => {
      return (
        <input
          ref={ref}
          className={cn(
            "flex h-10 w-full rounded-md border border-border bg-[#0D1117] px-3 py-2 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-white/10 focus:border-gray-500 transition-all disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        />
      );
    }
  );
  Input.displayName = "Input";

// 5. Progress Bar
export const Progress = ({ value, max = 100, className }: { value: number, max?: number, className?: string }) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));
    return (
        <div className={cn("h-2 w-full bg-white/5 rounded-full overflow-hidden", className)}>
            <div 
                className="h-full bg-emerald-500 transition-all duration-500 ease-out" 
                style={{ width: `${percentage}%` }}
            />
        </div>
    )
}