type Props = { label: string; value: string; good?: boolean; bad?: boolean };
export default function Stat({ label, value, good, bad }: Props) {
  return (
    <div className="stat">
      <div className="statLabel">{label}</div>
      <div className={`statValue ${good ? 'good' : ''} ${bad ? 'bad' : ''}`}>{value}</div>
    </div>
  );
}
