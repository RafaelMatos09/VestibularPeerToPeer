'use client'

import { MapPin, Phone, Star } from 'lucide-react'
import { DataRow } from './fields'
import {
  calcularIdade,
  formatCep,
  formatCpf,
  formatData,
  formatDataHora,
  formatTelefone,
  iniciais,
} from './format'
import {
  GENERO_LABELS,
  TIPO_CONTATO_LABELS,
  type PerfilAluno,
} from './types'

function SectionTitle({ index, title }: { index: string; title: string }) {
  return (
    <div className="mb-3 flex items-center gap-2">
      <span className="font-mono text-xs text-primary">{index}</span>
      <h2 className="font-mono text-sm font-medium uppercase tracking-widest text-foreground">
        {title}
      </h2>
      <span className="h-px flex-1 bg-border" />
    </div>
  )
}

export function ProfileView({ data }: { data: PerfilAluno }) {
  const { usuario, perfil, contatos, enderecos } = data
  const idade = calcularIdade(perfil.dataNascimento)

  return (
    <div className="flex flex-col gap-8">
      {/* Cabeçalho estilo carteirinha 42 */}
      <header className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-sm border border-border bg-secondary">
          {perfil.fotoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={perfil.fotoUrl || '/placeholder.svg'}
              alt={`Foto de ${usuario.nome}`}
              className="h-full w-full object-cover"
              crossOrigin="anonymous"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center font-mono text-2xl text-muted-foreground">
              {iniciais(usuario.nome || '?')}
            </div>
          )}
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-mono text-xs uppercase tracking-widest text-primary">
            Aluno · Vestibular Comunitário
          </span>
          <h1 className="text-balance font-mono text-2xl font-semibold text-foreground">
            {usuario.nome || 'Sem nome'}
          </h1>
          <p className="font-mono text-sm text-muted-foreground">
            {usuario.email || 'sem e-mail'}
          </p>
          {perfil.atualizadoEm ? (
            <p className="mt-1 font-mono text-[0.7rem] text-muted-foreground/60">
              atualizado em {formatDataHora(perfil.atualizadoEm)}
            </p>
          ) : null}
        </div>
      </header>

      {/* Perfil */}
      <section>
        <SectionTitle index="01" title="Perfil" />
        <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
          <DataRow
            label="Data de nascimento"
            value={
              perfil.dataNascimento
                ? `${formatData(perfil.dataNascimento)}${
                    idade !== null ? ` · ${idade} anos` : ''
                  }`
                : ''
            }
          />
          <DataRow label="CPF" value={perfil.cpf ? formatCpf(perfil.cpf) : ''} />
          <DataRow label="Gênero" value={GENERO_LABELS[perfil.genero]} />
        </div>
        {perfil.bio ? (
          <div className="mt-2">
            <DataRow label="Bio" value={perfil.bio} />
          </div>
        ) : null}
      </section>

      {/* Contatos */}
      <section>
        <SectionTitle index="02" title="Contatos" />
        {contatos.length === 0 ? (
          <p className="font-mono text-sm text-muted-foreground/60">
            Nenhum contato cadastrado.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {contatos.map((c, i) => (
              <li
                key={i}
                className="flex items-center gap-3 rounded-sm border border-border bg-card px-3 py-2.5"
              >
                <Phone className="h-4 w-4 text-primary" aria-hidden />
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  {TIPO_CONTATO_LABELS[c.tipo]}
                </span>
                <span className="ml-auto font-mono text-sm text-foreground">
                  {c.tipo === 'email' ? c.valor : formatTelefone(c.valor)}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Endereços */}
      <section>
        <SectionTitle index="03" title="Endereços" />
        {enderecos.length === 0 ? (
          <p className="font-mono text-sm text-muted-foreground/60">
            Nenhum endereço cadastrado.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            {enderecos.map((e, i) => (
              <div
                key={i}
                className="flex flex-col gap-1 rounded-sm border border-border bg-card p-4"
              >
                <div className="mb-1 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" aria-hidden />
                  <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    Endereço {i + 1}
                  </span>
                  {e.principal ? (
                    <span className="ml-auto flex items-center gap-1 rounded-sm bg-accent px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-widest text-accent-foreground">
                      <Star className="h-3 w-3" aria-hidden />
                      Principal
                    </span>
                  ) : null}
                </div>
                <p className="font-mono text-sm text-foreground">
                  {e.logradouro}
                  {e.numero ? `, ${e.numero}` : ''}
                  {e.complemento ? ` — ${e.complemento}` : ''}
                </p>
                <p className="font-mono text-sm text-muted-foreground">
                  {[e.bairro, e.cidade, e.estado].filter(Boolean).join(' · ')}
                </p>
                <p className="font-mono text-xs text-muted-foreground/70">
                  CEP {e.cep ? formatCep(e.cep) : '—'}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
