import { useState } from "react";

export default function ContactList({ contacts, loading, fetchContacts }) {
  const [search, setSearch] = useState("");
  const [sortType, setSortType] = useState("latest");

  const deleteHandler = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this contact?"
    );
    if (!confirmDelete) return;

    await fetch(`http://localhost:5000/api/contacts/${id}`, {
      method: "DELETE",
    });
    fetchContacts();
  };

  let filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  if (sortType === "name") {
    filteredContacts.sort((a, b) =>
      a.name.localeCompare(b.name)
    );
  }

  if (loading) {
    return (
      <div className="bg-white border rounded-xl shadow-lg p-8 text-center text-slate-500">
        Loading contacts...
      </div>
    );
  }

  return (
    <div className="bg-white border-t-8 border-emerald-500 rounded-xl shadow-lg">
      {/* STATS */}
      <div className="grid grid-cols-3 gap-4 p-6">
        <div className="bg-indigo-100 text-indigo-700 rounded-lg p-4 text-center">
          <p className="text-sm">Total Contacts</p>
          <p className="text-2xl font-bold">{contacts.length}</p>
        </div>
        <div className="bg-emerald-100 text-emerald-700 rounded-lg p-4 text-center">
          <p className="text-sm">Active Records</p>
          <p className="text-2xl font-bold">{contacts.length}</p>
        </div>
        <div className="bg-amber-100 text-amber-700 rounded-lg p-4 text-center">
          <p className="text-sm">System Status</p>
          <p className="text-2xl font-bold">Live</p>
        </div>
      </div>

      {/* CONTROLS */}
      <div className="px-6 py-4 border-t flex flex-col md:flex-row gap-3 justify-between">
        <input
          className="border rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
          placeholder="Search name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border rounded-lg px-3 py-2 text-sm"
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="latest">Latest First</option>
          <option value="name">Name (A–Z)</option>
        </select>
      </div>

      {/* TABLE */}
      <table className="w-full text-sm">
        <thead className="bg-emerald-50 text-emerald-700 uppercase text-xs">
          <tr>
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Email</th>
            <th className="px-6 py-3 text-left">Phone</th>
            <th className="px-6 py-3 text-right">Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredContacts.map((c) => (
            <tr
              key={c._id}
              className="border-t hover:bg-slate-50"
            >
              <td className="px-6 py-3 font-medium">{c.name}</td>
              <td className="px-6 py-3">{c.email}</td>
              <td className="px-6 py-3">{c.phone}</td>
              <td className="px-6 py-3 text-right">
                <button
                  onClick={() => deleteHandler(c._id)}
                  className="bg-red-50 text-red-600 px-3 py-1 rounded-md hover:bg-red-100 transition"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredContacts.length === 0 && (
        <div className="p-6 text-center text-slate-500">
          No matching contacts found
        </div>
      )}
    </div>
  );
}
