export default function Message({ message }) {
  return (
    <div style={{ padding: "5px 0" }}>
      <strong>{message.authorId}:</strong> {message.content}
    </div>
  );
}
