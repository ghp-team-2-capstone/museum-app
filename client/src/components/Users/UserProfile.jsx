import React, { useState, useEffect } from "react";
import {
  fetchJournalEntriesByUserId,
  addJournalEntry,
  editJournalEntry,
  deleteJournalEntry,
} from "../../helpers/fetching";
import "./JournalEntries.css";

export default function JournalEntries({ token, userId }) {
  const [journalEntries, setJournalEntries] = useState([]);
  const [error, setError] = useState(null);
  const [editingEntry, setEditingEntry] = useState(null);
  const [newEntry, setNewEntry] = useState({ title: "", body: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [customDate, setCustomDate] = useState("");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const entries = await fetchJournalEntriesByUserId(userId);
        if (Array.isArray(entries)) {
          setJournalEntries(entries);
        } else {
          setError("Invalid data received from the server.");
        }
      } catch (error) {
        setError("Failed to fetch journal entries. Please try again later.");
      }
    };

    fetchEntries();
  }, [userId]);

  const handleCreateEntry = async () => {
    if (!token) {
      setError("You must be logged in to create a journal entry.");
      return;
    }

    try {
      const createdEntry = await addJournalEntry(
        token,
        userId,
        newEntry.title,
        newEntry.body,
        customDate || new Date().toISOString()
      );

      setJournalEntries([...journalEntries, createdEntry]);
      setNewEntry({ title: "", body: "" });
      setCustomDate(""); // Clear the custom date
    } catch (error) {
      setError("Failed to create a journal entry. Please try again later.");
    }
  };

  const handleEditEntry = (entryId) => {
    const entryToEdit = journalEntries.find(
      (entry) => entry.entryId === entryId
    );
    setEditingEntry(entryToEdit);
  };

  const saveEditedEntry = async () => {
    if (!editingEntry) return;

    try {
      const updatedEntry = await editJournalEntry(
        editingEntry.entryId,
        userId,
        editingEntry.title,
        editingEntry.body,
        editingEntry.date,
        token
      );

      setJournalEntries((entries) =>
        entries.map((entry) =>
          entry.entryId === updatedEntry.entryId ? updatedEntry : entry
        )
      );

      setEditingEntry(null);
    } catch (error) {
      setError("Failed to edit journal entry. Please try again later.");
    }
  };

  const handleDeleteEntry = async (entryId) => {
    try {
      const result = await deleteJournalEntry(entryId, token);

      if (result) {
        setJournalEntries((entries) =>
          entries.filter((entry) => entry.entryId !== entryId)
        );
      } else {
        setError("Failed to delete journal entry. Please try again later.");
      }
    } catch (error) {
      setError("An error occurred while deleting the journal entry.");
    }
  };

  // Filter entries based on the search query
  const filteredEntries = journalEntries.filter(
    (entry) =>
      entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      entry.body.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="journal-entries-container">
      <h1>Journal Entries</h1>
      {error && <p className="error-message">{error}</p>}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search entries..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <ul className="journal-entry-list">
        {filteredEntries.map((entry) => (
          <li key={entry.entryId} className="journal-entry-card">
            {editingEntry?.entryId === entry.entryId ? (
              <div className="edit-entry-form">
                <h2>Edit Journal Entry</h2>
                <input
                  type="text"
                  value={editingEntry.title}
                  onChange={(e) =>
                    setEditingEntry({
                      ...editingEntry,
                      title: e.target.value,
                    })
                  }
                />
                <textarea
                  value={editingEntry.body}
                  onChange={(e) =>
                    setEditingEntry({
                      ...editingEntry,
                      body: e.target.value,
                    })
                  }
                />
                <button className="save-button" onClick={saveEditedEntry}>
                  Save
                </button>
                <button
                  className="cancel-button"
                  onClick={() => setEditingEntry(null)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div className="view-entry">
                <h2>{entry.title}</h2>
                <p>{entry.body}</p>
                <p>Date: {formatDate(entry.date)}</p>
                {token && (
                  <div className="action-buttons">
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteEntry(entry.entryId)}
                    >
                      Delete
                    </button>
                    <button
                      className="edit-button"
                      onClick={() => handleEditEntry(entry.entryId)}
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
      <div className="create-entry-form">
        <h2>Create New Journal Entry</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="form-input">
          <label htmlFor="entryTitle">Title</label>
          <input
            type="text"
            id="entryTitle"
            placeholder="Title"
            value={newEntry.title}
            onChange={(e) =>
              setNewEntry({ ...newEntry, title: e.target.value })
            }
          />
        </div>
        <div className="form-input">
          <label htmlFor="entryBody">Body</label>
          <textarea
            id="entryBody"
            rows={5} // Adjust the number of rows as needed
            placeholder="Body"
            value={newEntry.body}
            onChange={(e) =>
              setNewEntry({ ...newEntry, body: e.target.value })
            }
          />
        </div>
        <div className="form-input">
          <label htmlFor="customDate">Custom Date (optional)</label>
          <input
            type="date"
            id="customDate"
            value={customDate}
            onChange={(e) => setCustomDate(e.target.value)}
          />
        </div>
        <button className="create-button" onClick={handleCreateEntry}>
          Create
        </button>
      </div>
    </div>
  );
}



















// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   fetchJournalEntriesByUserId,
//   addJournalEntry,
//   editJournalEntry,
//   deleteJournalEntry,
// } from "../../helpers/fetching";
// import "./JournalEntries.css";

// export default function JournalEntries({ token, userId }) {
//   const [journalEntries, setJournalEntries] = useState([]);
//   const [error, setError] = useState(null);
//   const [editingEntry, setEditingEntry] = useState(null);
//   const [newEntry, setNewEntry] = useState({ title: "", body: "" });
//   const [searchQuery, setSearchQuery] = useState("");

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString();
//   };

//   useEffect(() => {
//     const fetchEntries = async () => {
//       try {
//         const entries = await fetchJournalEntriesByUserId(userId);
//         if (Array.isArray(entries)) {
//           setJournalEntries(entries);
//         } else {
//           setError("Invalid data received from the server.");
//         }
//       } catch (error) {
//         setError("Failed to fetch journal entries. Please try again later.");
//       }
//     };

//     fetchEntries();
//   }, [userId]);

//   const handleCreateEntry = async () => {
//     if (!token) {
//       setError("You must be logged in to create a journal entry.");
//       return;
//     }

//     try {
//       const createdEntry = await addJournalEntry(
//         token,
//         userId,
//         newEntry.title,
//         newEntry.body,
//         new Date().toISOString()
//       );

//       setJournalEntries([...journalEntries, createdEntry]);
//       setNewEntry({ title: "", body: "" });
//     } catch (error) {
//       setError("Failed to create a journal entry. Please try again later.");
//     }
//   };

//   const handleEditEntry = (entryId) => {
//     const entryToEdit = journalEntries.find(
//       (entry) => entry.entryId === entryId
//     );
//     setEditingEntry(entryToEdit);
//   };

//   const saveEditedEntry = async () => {
//     if (!editingEntry) return;

//     try {
//       const updatedEntry = await editJournalEntry(
//         editingEntry.entryId,
//         userId,
//         editingEntry.title,
//         editingEntry.body,
//         editingEntry.date,
//         token
//       );

//       setJournalEntries((entries) =>
//         entries.map((entry) =>
//           entry.entryId === updatedEntry.entryId ? updatedEntry : entry
//         )
//       );

//       setEditingEntry(null);
//     } catch (error) {
//       setError("Failed to edit journal entry. Please try again later.");
//     }
//   };

//   const handleDeleteEntry = async (entryId) => {
//     try {
//       const result = await deleteJournalEntry(entryId, token);

//       if (result) {
//         setJournalEntries((entries) =>
//           entries.filter((entry) => entry.entryId !== entryId)
//         );
//       } else {
//         setError("Failed to delete journal entry. Please try again later.");
//       }
//     } catch (error) {
//       setError("An error occurred while deleting the journal entry.");
//     }
//   };

//   // Filter entries based on the search query
//   const filteredEntries = journalEntries.filter((entry) =>
//     entry.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div className="journal-entries-container">
//       <h1>Journal Entries</h1>
//       {error && <p className="error-message">{error}</p>}
//       <div className="search-bar">
//         <input
//           type="text"
//           placeholder="Search entries..."
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)}
//         />
//       </div>
//       <ul className="journal-entry-list">
//         {filteredEntries.map((entry) => (
//           <li key={entry.entryId} className="journal-entry-card">
//             {editingEntry?.entryId === entry.entryId ? (
//               <div className="edit-entry-form">
//                 <h2>Edit Journal Entry</h2>
//                 <input
//                   type="text"
//                   value={editingEntry.title}
//                   onChange={(e) =>
//                     setEditingEntry({
//                       ...editingEntry,
//                       title: e.target.value,
//                     })
//                   }
//                 />
//                 <textarea
//                   value={editingEntry.body}
//                   onChange={(e) =>
//                     setEditingEntry({
//                       ...editingEntry,
//                       body: e.target.value,
//                     })
//                   }
//                 />
//                 <button className="save-button" onClick={saveEditedEntry}>
//                   Save
//                 </button>
//                 <button
//                   className="cancel-button"
//                   onClick={() => setEditingEntry(null)}
//                 >
//                   Cancel
//                 </button>
//               </div>
//             ) : (
//               <div className="view-entry">
//                 <h2>{entry.title}</h2>
//                 <p>{entry.body}</p>
//                 <p>Date: {formatDate(entry.date)}</p>
//                 {token && (
//                   <div className="action-buttons">
//                     <button
//                       className="delete-button"
//                       onClick={() => handleDeleteEntry(entry.entryId)}
//                     >
//                       Delete
//                     </button>
//                     <button
//                       className="edit-button"
//                       onClick={() => handleEditEntry(entry.entryId)}
//                     >
//                       Edit
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </li>
//         ))}
//       </ul>
//       <div className="create-entry-form">
//         <h2>Create New Journal Entry</h2>
//         {error && <p className="error-message">{error}</p>}
//         <div className="form-input">
//           <label htmlFor="entryTitle">Title</label>
//           <input
//             type="text"
//             id="entryTitle"
//             placeholder="Title"
//             value={newEntry.title}
//             onChange={(e) =>
//               setNewEntry({ ...newEntry, title: e.target.value })
//             }
//           />
//         </div>
//         <div className="form-input">
//           <label htmlFor="entryBody">Body</label>
//           <textarea
//             id="entryBody"
//             rows={5} // Adjust the number of rows as needed
//             placeholder="Body"
//             value={newEntry.body}
//             onChange={(e) => setNewEntry({ ...newEntry, body: e.target.value })}
//           />
//         </div>
//         <button className="create-button" onClick={handleCreateEntry}>
//           Create
//         </button>
//       </div>
//     </div>
//   );
// }

