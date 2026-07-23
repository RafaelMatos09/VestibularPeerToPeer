'use client'

import { cn } from '@/lib/utils'
import type { ReactNode, SelectHTMLAttributes } from 'react'

export function Field({
  label,
  htmlFor,
  hint,
  children,
  className,
}: {
  label: string
  htmlFor?: string
  hint?: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label
        htmlFor={htmlFor}
        className="font-mono text-xs uppercase tracking-widest text-muted-foreground"
      >
        {label}
      </label>
      {children}
      {hint ? (
        <span className="font-mono text-[0.7rem] text-muted-foreground/70">
          {hint}
        </span>
      ) : null}
    </div>
  )
}

const controlClasses =
  'w-full rounded-sm border border-border bg-input/30 px-3 py-2 font-mono text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-primary focus:ring-1 focus:ring-primary'

export function TextInput({
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cn(controlClasses, className)} {...props} />
}

export function TextArea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(controlClasses, 'min-h-24 resize-y leading-relaxed', className)}
      {...props}
    />
  )
}

export function Select({
  className,
  children,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) {
  return (
    <select className={cn(controlClasses, 'appearance-none', className)} {...props}>
      {children}
    </select>
  )
}

export function DataRow({
  label,
  value,
}: {
  label: string
  value?: ReactNode
}) {
  return (
    <div className="flex flex-col gap-0.5 border-b border-border/60 py-2.5 last:border-b-0">
      <span className="font-mono text-[0.7rem] uppercase tracking-widest text-muted-foreground">
        {label}
      </span>
      <span className="font-mono text-sm text-foreground">
        {value === undefined || value === '' || value === null ? (
          <span className="text-muted-foreground/50">—</span>
        ) : (
          value
        )}
      </span>
    </div>
  )
}
