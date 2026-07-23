'use client'

import { useMemo } from 'react'
import { useAuth } from '@/contexts/auth-context'
import { StudentProfile } from './student-profile'
import { perfilVazio, type PerfilAluno } from './types'

const exemploPerfil: Omit<PerfilAluno, 'usuario'> = {
  perfil: {
    dataNascimento: '2005-03-14',
    cpf: '12345678909',
    genero: 'feminino',
    fotoUrl: '',
    bio: 'Estudante da rede pública, apaixonada por tecnologia. Cursando o vestibular comunitário para ingressar em Ciência da Computação.',
    atualizadoEm: '2026-07-20T14:32:00.000Z',
  },
  contatos: [
    { tipo: 'whatsapp', valor: '11987654321' },
    { tipo: 'email', valor: '' },
  ],
  enderecos: [
    {
      logradouro: 'Rua das Palmeiras',
      numero: '245',
      complemento: 'Apto 32',
      bairro: 'Jardim América',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '01415000',
      principal: true,
    },
  ],
}

export default function Page() {
  const { user } = useAuth()

  const initialData = useMemo<PerfilAluno>(() => {
    const base = perfilVazio()
    if (!user) return base

    return {
      ...base,
      ...exemploPerfil,
      usuario: {
        nome: user.name,
        email: user.email,
      },
      contatos: exemploPerfil.contatos.map((c) =>
        c.tipo === 'email' ? { ...c, valor: user.email } : c,
      ),
    }
  }, [user])

  async function handleSave(data: PerfilAluno) {
    // TODO: conectar ao endpoint de perfil quando disponível
    console.log('[profile] Perfil salvo:', data)
  }

  return (
    <div className="p-6">
      <div className="mx-auto mb-8 w-full max-w-3xl">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-sm bg-primary font-mono text-lg font-bold text-primary-foreground">
            54
          </span>
          <div>
            <h1 className="font-mono text-sm font-semibold uppercase tracking-widest text-foreground">
              Vestibular Comunitário
            </h1>
            <p className="font-mono text-xs text-muted-foreground">
              cadastro &amp; perfil do aluno
            </p>
          </div>
        </div>
      </div>

      <StudentProfile initialData={initialData} onSave={handleSave} />
    </div>
  )
}
