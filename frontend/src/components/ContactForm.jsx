import { useState } from "react";

const emailRegex =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm({ fetchContacts, setToast }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [error, setError] = useState("");

  const isValid =
    form.name.trim() &&
    emailRegex.test(form.email) &&
    form.phone.trim();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");

    const res = await fetch("http://localhost:5000/api/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setToast("✅ Contact added successfully");
      setForm({ name: "", email: "", phone: "", message: "" });
      fetchContacts();
      setTimeout(() => setToast(""), 2500);
    } else {
      setToast("❌ Email already exists");
      setTimeout(() => setToast(""), 2500);
    }
  };

  return (
    <div className="bg-white border-l-8 border-indigo-500 rounded-xl shadow-lg p-6">
      <h2 className="text-lg font-semibold text-slate-900 mb-1">
        Add New Contact
      </h2>
      <p className="text-sm text-slate-500 mb-4">
        Enter contact details
      </p>

      {error && (
        <p className="text-sm text-red-600 mb-3">{error}</p>
      )}

      <form onSubmit={submitHandler} className="space-y-4">
        <input
          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          placeholder="Full Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          placeholder="Email Address"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          placeholder="Phone Number"
          value={form.phone}
          onChange={(e) =>
            setForm({ ...form, phone: e.target.value })
          }
        />

        <textarea
          rows="3"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
          placeholder="Message (optional)"
          value={form.message}
          onChange={(e) =>
            setForm({ ...form, message: e.target.value })
          }
        />

        <button
          disabled={!isValid}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg disabled:opacity-50 transition"
        >
          Save Contact
        </button>
      </form>
    </div>
  );
}
