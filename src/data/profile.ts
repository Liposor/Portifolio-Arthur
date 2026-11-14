export type Video = {
  src: string
  webm?: string
  preview?: string
  poster?: string
  captions?: string
}

type Contact = 'email' | 'instagram' | 'youtube' | 'discord' | 'whatsapp'
type Profile = {
  name: string
  role: string
  photo?: string
  showreel?: Video
  contacts: Partial<Record<Contact, string>>
}

export const profile: Profile = {
  name: 'Arthur de Freitas',
  role: 'Editor de vídeo',
  contacts: {
    instagram: 'https://www.instagram.com/thuurfreitas/',
    youtube: 'https://www.youtube.com/@japudo27'
  }
}

export const contactLinks = (Object.entries(profile.contacts) as [Contact, string][])
  .filter(([, value]) => value.trim())
  .map(([kind, value]) => ({
    label: { email: 'E-mail', instagram: 'Instagram', youtube: 'YouTube', discord: 'Discord', whatsapp: 'WhatsApp' }[kind],
    kind,
    href: kind === 'email' ? `mailto:${value.trim()}` : value.trim()
  }))
  .filter(({ href }) => /^(https:\/\/|mailto:[^\s@]+@[^\s@]+$)/i.test(href))
