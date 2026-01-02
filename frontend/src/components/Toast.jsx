export default function Toast({ message }) {
  const isError = message.includes("❌");

  return (
    <div
      className={`fixed bottom-6 right-6 px-6 py-3 rounded-lg shadow-xl text-white transition
      ${isError ? "bg-red-600" : "bg-emerald-600"}`}
    >
      {message}
    </div>
  );
}
