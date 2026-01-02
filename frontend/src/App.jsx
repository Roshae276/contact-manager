import { useEffect, useState } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import Toast from "./components/Toast";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchContacts = async () => {
    setLoading(true);
    const res = await fetch("http://localhost:5000/api/contacts");
    const data = await res.json();
    setContacts(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-emerald-50 to-amber-50">

      {/* TOP BAR */}
      <header className="bg-gradient-to-r from-indigo-600 via-blue-600 to-emerald-600 shadow-lg">
  <div className="max-w-7xl mx-auto px-6 py-6">
    <h1 className="text-3xl font-bold text-white">
      Civic Contact Management
    </h1>
    <p className="text-sm text-indigo-100">
      Inspired by Village Grievance Redressal Systems
    </p>
  </div>
</header>


      {/* MAIN CONTENT */}
      <main className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT: FORM */}
        <div className="lg:col-span-1">
          <ContactForm fetchContacts={fetchContacts} setToast={setToast} />
        </div>

        {/* RIGHT: TABLE */}
        <div className="lg:col-span-2">
          <ContactList
            contacts={contacts}
            loading={loading}
            fetchContacts={fetchContacts}
          />
        </div>
      </main>

      {toast && <Toast message={toast} />}
    </div>
  );
};

export default App;
