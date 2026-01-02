import Contact from "../models/Contact.js";

// GET ALL CONTACTS
export const getContacts = async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.json(contacts);
};

// CREATE CONTACT
export const createContact = async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ message: "Required fields missing" });
  }

  const existing = await Contact.findOne({ email });
  if (existing) {
    return res.status(409).json({ message: "Email already exists" });
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
    message,
  });

  res.status(201).json(contact);
};

// DELETE CONTACT
export const deleteContact = async (req, res) => {
  const { id } = req.params;

  const contact = await Contact.findById(id);

  if (!contact) {
    return res.status(404).json({ message: "Contact not found" });
  }

  await Contact.findByIdAndDelete(id);
  res.json({ message: "Contact deleted successfully" });
};
