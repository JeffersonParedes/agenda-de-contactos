import { useState } from 'react'
import { Contact } from './types/Contact.tsx'
import ContactForm from './components/ContactForm'
import ContactList from './components/ContactList'
import SearchBar from './components/SearchBar'
import ThemeToggle from './components/ThemeToggle'
import './App.css'

function App() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [editingContact, setEditingContact] = useState<Contact | null>(null)

  const handleAddContact = (contact: Omit<Contact, 'id'>) => {
    const newContact: Contact = {
      ...contact,
      id: Date.now().toString()
    }
    setContacts([...contacts, newContact])
  }

  const handleDeleteContact = (id: string) => {
    setContacts(contacts.filter(contact => contact.id !== id))
  }

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact)
  }

  const handleUpdateContact = (updatedContact: Contact) => {
    const updatedList = contacts.map(c =>
      c.id === updatedContact.id ? updatedContact : c
    )
    setContacts(updatedList)
    setEditingContact(null)
  }

  const handleCancelEdit = () => {
    setEditingContact(null)
  }

  // 🔍 Filtro en tiempo real
  const filteredContacts = contacts.filter(contact => {
    const search = searchTerm.toLowerCase()
    return (
      contact.name.toLowerCase().includes(search) ||
      (contact.lastName && contact.lastName.toLowerCase().includes(search)) ||
      (contact.email && contact.email.toLowerCase().includes(search)) ||
      contact.phone.toLowerCase().includes(search)
    )
  })

  return (
    <div className="app">
      <header className="app-header">
        <h1>Agenda de Contactos</h1>
        <ThemeToggle />
      </header>

      <main className="app-main">
        <section className="form-section">
          <h2>{editingContact ? 'Editar Contacto' : 'Agregar Contacto'}</h2>
          <ContactForm
            onSubmit={handleAddContact}
            editingContact={editingContact}
            onUpdate={handleUpdateContact}
            onCancelEdit={handleCancelEdit}
          />
        </section>

        <section className="contacts-section">
          <h2>Lista de Contactos</h2>
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
          <ContactList
            contacts={filteredContacts}
            onDelete={handleDeleteContact}
            onEdit={handleEditContact}
          />
        </section>
      </main>
    </div>
  )
}

export default App

