export default function Ink() {
  return (
    <section className="scene scene--ink" id="ink" aria-label="Ink writing">
      <div className="ink__page">
        <div className="ink__line" id="inkLine" aria-live="polite" />
        <span className="ink__nib" id="inkNib" />
      </div>
      <div className="ink__vignette" />
    </section>
  );
}
