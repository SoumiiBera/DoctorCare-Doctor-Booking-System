// Label + control + hint/error, wired for screen readers.
function FormField({ id, label, error, hint, as: Control = "input", trailing, children, ...props }) {
  const messageId = error ? `${id}-error` : hint ? `${id}-hint` : undefined;

  return (
    <div className={`field ${error ? "has-error" : ""}`}>
      <label htmlFor={id}>{label}</label>
      <div className="field-control">
        <Control
          id={id}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={messageId}
          {...props}
        >
          {children}
        </Control>
        {trailing}
      </div>
      {error ? (
        <p className="field-error" id={messageId}>
          {error}
        </p>
      ) : (
        hint && (
          <p className="field-hint" id={messageId}>
            {hint}
          </p>
        )
      )}
    </div>
  );
}

export default FormField;
