export async function fetchMessages(channelId) {
  const res = await fetch(`http://localhost:3000/messages/${channelId}`);
  return res.json();
}
