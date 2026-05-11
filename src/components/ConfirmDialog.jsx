import { useEffect, useRef } from 'react'

export default function ConfirmDialog({
  open,
  title = 'Confirm action',
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
}) {
  const cancelRef = useRef(null)

  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (e.key === 'Escape') onCancel?.()
    }
    document.addEventListener('keydown', handler)
    cancelRef.current?.focus()
    return () => document.removeEventListener('keydown', handler)
  }, [open, onCancel])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-dialog-title"
      onClick={onCancel}
    >
      <div className="card max-w-md w-full animate-fade-in-scale" onClick={(e) => e.stopPropagation()}>
        <h3 id="confirm-dialog-title" className="text-lg font-semibold text-content dark:text-content-dark">
          {title}
        </h3>
        <p className="mt-2 text-content-muted dark:text-content-muted-dark">{message}</p>
        <div className="flex flex-col-reverse sm:flex-row gap-3 mt-6">
          <button ref={cancelRef} type="button" onClick={onCancel} className="btn-secondary sm:flex-1">
            {cancelLabel}
          </button>
          <button type="button" onClick={onConfirm} className="btn-danger sm:flex-1">
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
