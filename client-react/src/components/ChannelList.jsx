export default function ChannelList({ channels, onSelect }) {
  return (
    <div>
      <h3>Channels</h3>
      {channels.map((c) => (
        <div
          key={c}
          onClick={() => onSelect(c)}
          style={{ cursor: "pointer", margin: "5px 0" }}
        >
          #{c}
        </div>
      ))}
    </div>
  );
}
