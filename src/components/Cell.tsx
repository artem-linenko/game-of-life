export default function Cell({ alive }: { alive: boolean }) {
  return (
    <div className={`field-cell field-cell--${alive ? "alive" : "dead"}`} />
  );
}
