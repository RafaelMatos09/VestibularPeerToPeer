// Tipos que espelham as tabelas do banco de dados.

// Tabela: usuarios
export interface Usuario {
  nome: string
  email: string
  // senha_hash normalmente NAO deve ser exibida/editada aqui.
  // Mantida como opcional apenas para compatibilidade com a query.
  senhaHash?: string
}

// Tabela: usuario_perfis
export interface UsuarioPerfil {
  dataNascimento: string // formato ISO: "AAAA-MM-DD"
  cpf: string
  genero: Genero
  fotoUrl: string
  bio: string
  atualizadoEm?: string // ISO timestamp, preenchido pelo backend
}

export type Genero =
  | 'feminino'
  | 'masculino'
  | 'nao_binario'
  | 'outro'
  | 'prefiro_nao_informar'

// Tabela: usuario_contatos
export interface UsuarioContato {
  tipo: TipoContato
  valor: string // telefone, email, etc.
}

export type TipoContato = 'celular' | 'fixo' | 'whatsapp' | 'email' | 'outro'

// Tabela: usuario_enderecos
export interface UsuarioEndereco {
  logradouro: string
  numero: string
  complemento: string
  bairro: string
  cidade: string
  estado: string
  cep: string
  principal: boolean
}

// Estrutura agregada usada pelo componente de perfil.
export interface PerfilAluno {
  usuario: Usuario
  perfil: UsuarioPerfil
  contatos: UsuarioContato[]
  enderecos: UsuarioEndereco[]
}

export const GENERO_LABELS: Record<Genero, string> = {
  feminino: 'Feminino',
  masculino: 'Masculino',
  nao_binario: 'Não-binário',
  outro: 'Outro',
  prefiro_nao_informar: 'Prefiro não informar',
}

export const TIPO_CONTATO_LABELS: Record<TipoContato, string> = {
  celular: 'Celular',
  fixo: 'Fixo',
  whatsapp: 'WhatsApp',
  email: 'E-mail',
  outro: 'Outro',
}

export function perfilVazio(): PerfilAluno {
  return {
    usuario: { nome: '', email: '' },
    perfil: {
      dataNascimento: '',
      cpf: '',
      genero: 'prefiro_nao_informar',
      fotoUrl: '',
      bio: '',
    },
    contatos: [{ tipo: 'celular', valor: '' }],
    enderecos: [
      {
        logradouro: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
        cep: '',
        principal: true,
      },
    ],
  }
}
