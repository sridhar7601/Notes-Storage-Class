import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { openDB } from "idb";

const App = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(!!Cookies.get("user"));
  const [notes, setNotes] = useState<Array<{ content: string, timestamp: number }>>([]);
  const [draft, setDraft] = useState<string>(sessionStorage.getItem("draft") || "");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">(localStorage.getItem("sortOrder") as "newest" | "oldest" || "newest");

  useEffect(() => {
    const fetchNotes = async () => {
      const db = await openDB("notes-db", 1, {
        upgrade(db) {
          db.createObjectStore("notes", { keyPath: "id", autoIncrement: true });
        }
      });
      const allNotes = await db.getAll("notes");
      setNotes(allNotes.sort((a, b) => sortOrder === "newest" ? b.timestamp - a.timestamp : a.timestamp - b.timestamp));
    };
    fetchNotes();
  }, [sortOrder]);

  const handleLogin = () => {
    Cookies.set("user", "loggedIn", { expires: 1 });
    setLoggedIn(true);
  };

  const handleLogout = () => {
    Cookies.remove("user");
    setLoggedIn(false);
  };

  const handleSaveNote = async () => {
    const db = await openDB("notes-db", 1);
    const timestamp = Date.now();
    await db.add("notes", { content: draft, timestamp });
    setDraft("");
    sessionStorage.removeItem("draft");
    const allNotes = await db.getAll("notes");
    setNotes(allNotes.sort((a, b) => sortOrder === "newest" ? b.timestamp - a.timestamp : a.timestamp - b.timestamp));
  };

  const handleDraftChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value;
    setDraft(content);
    sessionStorage.setItem("draft", content);
  };

  const handleSortOrderChange = (newOrder: "newest" | "oldest") => {
    setSortOrder(newOrder);
    localStorage.setItem("sortOrder", newOrder);
  };

  return (
    <div>
      {!loggedIn ? (
        <button onClick={handleLogin}>Login</button>
      ) : (
        <>
          <button onClick={handleLogout}>Logout</button>
          <div>
            <h2>Create Note</h2>
            <textarea value={draft} onChange={handleDraftChange} placeholder="Write your note..." />
            <button onClick={handleSaveNote} disabled={!draft}>Save Note</button>
          </div>
          <div>
            <h2>Saved Notes</h2>
            <label>
              Sort by: 
              <select value={sortOrder} onChange={(e) => handleSortOrderChange(e.target.value as "newest" | "oldest")}>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
              </select>
            </label>
            <ul>
              {notes.map((note, idx) => (
                <li key={idx}>
                  <p>{note.content}</p>
                  <small>{new Date(note.timestamp).toLocaleString()}</small>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
