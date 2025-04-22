const BASE_URL = "https://notes-api.dicoding.dev/v2/";

class NotesApi {
  // Fetch all notes (non-archived)
  static fetchNotes() {
    return fetch(`${BASE_URL}/notes`)
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson.data || []; // Accessing the 'data' array containing notes
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
        return [];
      });
  }

  // Create a new note
  static createNote(newNote) {
    return fetch(`${BASE_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status === "success") {
          return responseJson.data; // Return the newly created note
        } else {
          throw new Error("Failed to create note");
        }
      })
      .catch((error) => {
        console.error("Error creating note:", error);
        return null;
      });
  }
}

export default NotesApi;
