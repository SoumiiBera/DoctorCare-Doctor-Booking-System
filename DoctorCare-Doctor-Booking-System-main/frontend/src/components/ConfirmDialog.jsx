import { useEffect, useRef } from "react";

// Accessible modal built on the native <dialog> element (focus trap + Escape handled by the browser).
function ConfirmDialog({ open, title, text, confirmLabel, cancelLabel, busy, onConfirm, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      className="dialog"
      aria-labelledby="dialog-title"
      onCancel={(event) => {
        event.preventDefault();
        if (!busy) onClose();
      }}
    >
      <h2 id="dialog-title">{title}</h2>
      <p>{text}</p>
      <div className="dialog-actions">
        <button type="button" className="btn btn-outline" onClick={onClose} disabled={busy}>
          {cancelLabel}
        </button>
        <button type="button" className="btn btn-danger" onClick={onConfirm} disabled={busy}>
          {confirmLabel}
        </button>
      </div>
    </dialog>
  );
}

export default ConfirmDialog;
