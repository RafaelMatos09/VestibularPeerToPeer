'use client'

import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import { useState } from 'react'
import { ProfileForm } from './profile-form'
import { ProfileView } from './profile-view'
import { perfilVazio, type PerfilAluno } from './types'

export interface StudentProfileProps {
  /** Dados iniciais do perfil. Se omitido, inicia em branco (modo cadastro). */
  initialData?: PerfilAluno
  /** Chamado ao salvar. Faça aqui o INSERT/UPDATE no banco. */
  onSave?: (data: PerfilAluno) => void | Promise<void>
  /** Começa no modo de edição/cadastro em vez da visualização. */
  startEditing?: boolean
}

export function StudentProfile({
  initialData,
  onSave,
  startEditing,
}: StudentProfileProps) {
  const [data, setData] = useState<PerfilAluno>(initialData ?? perfilVazio())
  const [editing, setEditing] = useState<boolean>(
    startEditing ?? !initialData,
  )
  const [saving, setSaving] = useState(false)

  async function handleSave(next: PerfilAluno) {
    const withTimestamp: PerfilAluno = {
      ...next,
      perfil: { ...next.perfil, atualizadoEm: new Date().toISOString() },
    }
    try {
      setSaving(true)
      await onSave?.(withTimestamp)
      setData(withTimestamp)
      setEditing(false)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div className="rounded-md border border-border bg-card p-6 sm:p-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
            <span className="inline-block h-2 w-2 rounded-full bg-primary" />
            {editing ? 'Modo edição' : 'Perfil do aluno'}
          </div>
          {!editing ? (
            <Button
              type="button"
              variant="outline"
              onClick={() => setEditing(true)}
              className="font-mono text-xs uppercase tracking-widest"
            >
              <Pencil className="h-4 w-4" />
              Editar
            </Button>
          ) : null}
        </div>

        {editing ? (
          <fieldset disabled={saving} className="contents">
            <ProfileForm
              initial={data}
              onSave={handleSave}
              onCancel={initialData ? () => setEditing(false) : undefined}
            />
          </fieldset>
        ) : (
          <ProfileView data={data} />
        )}
      </div>
    </div>
  )
}
