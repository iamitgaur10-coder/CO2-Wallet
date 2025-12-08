
import React, { useState, createContext, useContext, useEffect } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, CheckCircle2, AlertCircle } from 'lucide-react';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- TOAST SYSTEM ---
type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = (message: string, type: ToastType = 'info') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              className="pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl bg-[#0D1117] border border-white/10 text-white shadow-2xl min-w-[300px]"
            >
              {t.type === 'success' && <CheckCircle2 className="text-emerald-500" size={20} />}
              {t.type === 'error' && <AlertCircle className="text-red-500" size={20} />}
              <span className="text-sm font-medium">{t.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within a ToastProvider');
  return context;
};

// --- COMPONENTS ---

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
export const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { noPadding?: boolean }>(
  ({ className, children, noPadding = false, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('rounded-xl border border-border bg-surface/50 backdrop-blur-sm shadow-sm', !noPadding && 'p-6', className)}
      {...props}
    >
      {children}
    </div>
  )
);
Card.displayName = 'Card';

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

// 6. Skeleton Loader
export const Skeleton = ({ className }: { className?: string }) => (
  <div className={cn("animate-pulse rounded-md bg-white/5", className)} />
);

// 7. Motion Component Wrapper
export const MotionDiv = motion.div;

// 8. Accordion (FAQ)
export const Accordion = ({ items }: { items: { title: string; content: string }[] }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="border border-white/5 rounded-lg bg-surface/30 overflow-hidden">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full flex justify-between items-center p-4 text-left font-medium text-white hover:bg-white/5 transition-colors"
          >
            {item.title}
            <ChevronDown
              className={cn("transition-transform duration-300 text-gray-400", openIndex === index && "rotate-180")}
              size={18}
            />
          </button>
          <div
            className={cn(
              "overflow-hidden transition-all duration-300 ease-in-out",
              openIndex === index ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <div className="p-4 pt-0 text-sm text-gray-400 leading-relaxed">
              {item.content}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
