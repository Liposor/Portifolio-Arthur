import type { Video } from './profile'

export type Project = {
  id: string
  slug: string
  title: string
  description: string
  category: string
  year?: number
  thumbnail?: string
  video?: Video
  externalUrl?: string
  tools?: string[]
  featured?: boolean
  status: 'draft' | 'preparing' | 'published'
}

export const projects: Project[] = [
  {
    id: 'gameplay-amigos',
    slug: 'gameplay-com-amigos',
    title: 'Gameplay com amigos',
    description: 'Uma edição com momentos de gameplay entre amigos.',
    category: 'Gameplays',
    thumbnail: 'images/gameplay-amigos.jpg',
    video: { src: 'videos/gameplay-amigos.mp4', preview: 'videos/gameplay-amigos-preview.mp4' },
    featured: true,
    status: 'published'
  },
  {
    id: 'minecraft',
    slug: 'minecraft',
    title: 'Minecraft em 27 segundos',
    description: 'Uma edição curta de Minecraft com cortes rápidos e legendas que acompanham a fala.',
    category: 'Edições curtas',
    thumbnail: 'images/minecraft.jpg',
    video: { src: 'videos/minecraft.mp4', preview: 'videos/minecraft-preview.mp4' },
    featured: true,
    status: 'published'
  },
  {
    id: 'edicao',
    slug: 'vlog-vinhedo',
    title: 'Vlog em Vinhedo',
    description: 'Um grupo de amigos viaja a Vinhedo para visitar a casa de um amigo. O vlog acompanha os momentos da viagem e do encontro.',
    category: 'Vlogs',
    thumbnail: 'images/edicao.jpg',
    video: { src: 'videos/edicao.mp4', preview: 'videos/edicao-preview.mp4' },
    status: 'published'
  }
]
