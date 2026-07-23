'use client'

import { Button } from '@/components/ui/button'
import { Plus, Trash2 } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { Field, Select, TextArea, TextInput } from './fields'
import { formatCep, formatCpf, formatTelefone } from './format'
import {
  GENERO_LABELS,
  TIPO_CONTATO_LABELS,
  type Genero,
  type PerfilAluno,
  type TipoContato,
  type UsuarioContato,
  type UsuarioEndereco,
} from './types'

function SectionTitle({ index, title }: { index: string; title: string }) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <span className="font-mono text-xs text-primary">{index}</span>
      <h2 className="font-mono text-sm font-medium uppercase tracking-widest text-foreground">
        {title}
      </h2>
      <span className="h-px flex-1 bg-border" />
    </div>
  )
}

export function ProfileForm({
  initial,
  onSave,
  onCancel,
}: {
  initial: PerfilAluno
  onSave: (data: PerfilAluno) => void
  onCancel?: () => void
}) {
  const [data, setData] = useState<PerfilAluno>(initial)

  function setUsuario<K extends keyof PerfilAluno['usuario']>(
    key: K,
    value: PerfilAluno['usuario'][K],
  ) {
    setData((d) => ({ ...d, usuario: { ...d.usuario, [key]: value } }))
  }

  function setPerfil<K extends keyof PerfilAluno['perfil']>(
    key: K,
    value: PerfilAluno['perfil'][K],
  ) {
    setData((d) => ({ ...d, perfil: { ...d.perfil, [key]: value } }))
  }

  function updateContato(i: number, patch: Partial<UsuarioContato>) {
    setData((d) => ({
      ...d,
      contatos: d.contatos.map((c, idx) => (idx === i ? { ...c, ...patch } : c)),
    }))
  }

  function addContato() {
    setData((d) => ({
      ...d,
      contatos: [...d.contatos, { tipo: 'celular', valor: '' }],
    }))
  }

  function removeContato(i: number) {
    setData((d) => ({ ...d, contatos: d.contatos.filter((_, idx) => idx !== i) }))
  }

  function updateEndereco(i: number, patch: Partial<UsuarioEndereco>) {
    setData((d) => ({
      ...d,
      enderecos: d.enderecos.map((e, idx) => {
        if (idx !== i) {
          // se o editado virou principal, os demais deixam de ser
          return patch.principal ? { ...e, principal: false } : e
        }
        return { ...e, ...patch }
      }),
    }))
  }

  function addEndereco() {
    setData((d) => ({
      ...d,
      enderecos: [
        ...d.enderecos,
        {
          logradouro: '',
          numero: '',
          complemento: '',
          bairro: '',
          cidade: '',
          estado: '',
          cep: '',
          principal: d.enderecos.length === 0,
        },
      ],
    }))
  }

  function removeEndereco(i: number) {
    setData((d) => ({
      ...d,
      enderecos: d.enderecos.filter((_, idx) => idx !== i),
    }))
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    onSave(data)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {/* Conta */}
      <section>
        <SectionTitle index="01" title="Conta" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Nome completo" htmlFor="nome">
            <TextInput
              id="nome"
              required
              value={data.usuario.nome}
              onChange={(e) => setUsuario('nome', e.target.value)}
              placeholder="Maria da Silva"
            />
          </Field>
          <Field label="E-mail" htmlFor="email">
            <TextInput
              id="email"
              type="email"
              required
              value={data.usuario.email}
              onChange={(e) => setUsuario('email', e.target.value)}
              placeholder="maria@exemplo.com"
            />
          </Field>
        </div>
      </section>

      {/* Perfil */}
      <section>
        <SectionTitle index="02" title="Perfil" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Data de nascimento" htmlFor="nascimento">
            <TextInput
              id="nascimento"
              type="date"
              value={data.perfil.dataNascimento}
              onChange={(e) => setPerfil('dataNascimento', e.target.value)}
            />
          </Field>
          <Field label="CPF" htmlFor="cpf">
            <TextInput
              id="cpf"
              inputMode="numeric"
              value={formatCpf(data.perfil.cpf)}
              onChange={(e) =>
                setPerfil('cpf', e.target.value.replace(/\D/g, ''))
              }
              placeholder="000.000.000-00"
            />
          </Field>
          <Field label="Gênero" htmlFor="genero">
            <Select
              id="genero"
              value={data.perfil.genero}
              onChange={(e) => setPerfil('genero', e.target.value as Genero)}
            >
              {(Object.keys(GENERO_LABELS) as Genero[]).map((g) => (
                <option key={g} value={g}>
                  {GENERO_LABELS[g]}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="URL da foto" htmlFor="foto" hint="Link público da imagem">
            <TextInput
              id="foto"
              type="url"
              value={data.perfil.fotoUrl}
              onChange={(e) => setPerfil('fotoUrl', e.target.value)}
              placeholder="https://..."
            />
          </Field>
        </div>
        <div className="mt-4">
          <Field label="Bio" htmlFor="bio">
            <TextArea
              id="bio"
              value={data.perfil.bio}
              onChange={(e) => setPerfil('bio', e.target.value)}
              placeholder="Conte um pouco sobre você, sua trajetória e objetivos no vestibular..."
            />
          </Field>
        </div>
      </section>

      {/* Contatos */}
      <section>
        <SectionTitle index="03" title="Contatos" />
        <div className="flex flex-col gap-3">
          {data.contatos.map((c, i) => (
            <div
              key={i}
              className="flex flex-col gap-3 rounded-sm border border-border bg-card p-3 sm:flex-row sm:items-end"
            >
              <Field label="Tipo" className="sm:w-40">
                <Select
                  value={c.tipo}
                  onChange={(e) =>
                    updateContato(i, { tipo: e.target.value as TipoContato })
                  }
                >
                  {(Object.keys(TIPO_CONTATO_LABELS) as TipoContato[]).map(
                    (t) => (
                      <option key={t} value={t}>
                        {TIPO_CONTATO_LABELS[t]}
                      </option>
                    ),
                  )}
                </Select>
              </Field>
              <Field label="Valor" className="flex-1">
                <TextInput
                  value={
                    c.tipo === 'email' ? c.valor : formatTelefone(c.valor)
                  }
                  onChange={(e) =>
                    updateContato(i, {
                      valor:
                        c.tipo === 'email'
                          ? e.target.value
                          : e.target.value.replace(/\D/g, ''),
                    })
                  }
                  placeholder={
                    c.tipo === 'email' ? 'nome@exemplo.com' : '(00) 00000-0000'
                  }
                />
              </Field>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => removeContato(i)}
                aria-label="Remover contato"
                className="shrink-0 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={addContato}
            className="w-fit font-mono text-xs uppercase tracking-widest"
          >
            <Plus className="h-4 w-4" />
            Adicionar contato
          </Button>
        </div>
      </section>

      {/* Endereços */}
      <section>
        <SectionTitle index="04" title="Endereços" />
        <div className="flex flex-col gap-4">
          {data.enderecos.map((e, i) => (
            <div
              key={i}
              className="flex flex-col gap-4 rounded-sm border border-border bg-card p-4"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Endereço {i + 1}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeEndereco(i)}
                  aria-label="Remover endereço"
                  className="text-muted-foreground hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
                <Field label="Logradouro" className="sm:col-span-4">
                  <TextInput
                    value={e.logradouro}
                    onChange={(ev) =>
                      updateEndereco(i, { logradouro: ev.target.value })
                    }
                    placeholder="Rua / Avenida"
                  />
                </Field>
                <Field label="Número" className="sm:col-span-2">
                  <TextInput
                    value={e.numero}
                    onChange={(ev) =>
                      updateEndereco(i, { numero: ev.target.value })
                    }
                    placeholder="123"
                  />
                </Field>
                <Field label="Complemento" className="sm:col-span-3">
                  <TextInput
                    value={e.complemento}
                    onChange={(ev) =>
                      updateEndereco(i, { complemento: ev.target.value })
                    }
                    placeholder="Apto, bloco..."
                  />
                </Field>
                <Field label="Bairro" className="sm:col-span-3">
                  <TextInput
                    value={e.bairro}
                    onChange={(ev) =>
                      updateEndereco(i, { bairro: ev.target.value })
                    }
                    placeholder="Centro"
                  />
                </Field>
                <Field label="Cidade" className="sm:col-span-3">
                  <TextInput
                    value={e.cidade}
                    onChange={(ev) =>
                      updateEndereco(i, { cidade: ev.target.value })
                    }
                    placeholder="São Paulo"
                  />
                </Field>
                <Field label="UF" className="sm:col-span-1">
                  <TextInput
                    value={e.estado}
                    maxLength={2}
                    onChange={(ev) =>
                      updateEndereco(i, {
                        estado: ev.target.value.toUpperCase(),
                      })
                    }
                    placeholder="SP"
                  />
                </Field>
                <Field label="CEP" className="sm:col-span-2">
                  <TextInput
                    inputMode="numeric"
                    value={formatCep(e.cep)}
                    onChange={(ev) =>
                      updateEndereco(i, {
                        cep: ev.target.value.replace(/\D/g, ''),
                      })
                    }
                    placeholder="00000-000"
                  />
                </Field>
              </div>
              <label className="flex w-fit cursor-pointer items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                <input
                  type="checkbox"
                  checked={e.principal}
                  onChange={(ev) =>
                    updateEndereco(i, { principal: ev.target.checked })
                  }
                  className="h-4 w-4 accent-primary"
                />
                Endereço principal
              </label>
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={addEndereco}
            className="w-fit font-mono text-xs uppercase tracking-widest"
          >
            <Plus className="h-4 w-4" />
            Adicionar endereço
          </Button>
        </div>
      </section>

      {/* Ações */}
      <div className="flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end">
        {onCancel ? (
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            className="font-mono text-xs uppercase tracking-widest"
          >
            Cancelar
          </Button>
        ) : null}
        <Button
          type="submit"
          className="font-mono text-xs uppercase tracking-widest"
        >
          Salvar perfil
        </Button>
      </div>
    </form>
  )
}
