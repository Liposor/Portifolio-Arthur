import { useState } from 'react'
import type { Video } from '../data/profile'
import { asset } from '../utils/media'

export function VideoPlayer({ video, preview = false, title, onEnded }: {
  video: Video
  preview?: boolean
  title: string
  onEnded?: () => void
}) {
  const [failed, setFailed] = useState(false)
  if (failed) return preview ? null : <p role="status">O vídeo está indisponível no momento.</p>
  return (
    <video
      className={preview ? 'preview-video' : undefined}
      aria-label={preview ? undefined : title}
      aria-hidden={preview || undefined}
      controls={!preview}
      autoPlay={preview}
      muted={preview}
      loop={preview}
      playsInline
      onEnded={preview ? undefined : onEnded}
      preload={preview ? 'auto' : 'none'}
      poster={video.poster ? asset(video.poster) : undefined}
      onError={() => setFailed(true)}
    >
      {(!preview || !video.preview) && video.webm && <source src={asset(video.webm)} type="video/webm" />}
      <source src={asset(preview && video.preview ? video.preview : video.src)} />
      {!preview && video.captions && (
        <track kind="captions" label="Português" srcLang="pt-BR" src={asset(video.captions)} />
      )}
    </video>
  )
}
