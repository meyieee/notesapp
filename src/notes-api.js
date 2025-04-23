const BASE_URL = "https://notes-api.dicoding.dev/v2/";

class NotesApi {
  // Fetch all notes (non-archived)
  static fetchNotes() {
    const loadingIndicator = document.getElementById("loadingIndicator");
    loadingIndicator.style.display = "block"; // Show loading indicator while fetching

    return fetch(`${BASE_URL}/notes`)
      .then((response) => response.json())
      .then((responseJson) => {
        loadingIndicator.style.display = "none"; // Hide loading indicator after fetching
        return responseJson.data || []; // Accessing the 'data' array containing notes
      })
      .catch((error) => {
        loadingIndicator.style.display = "none"; // Hide loading indicator on error
        console.error("Error fetching notes:", error);
        return [];
      });
  }

  // Create a new note
  static createNote(newNote) {
    const loadingIndicator = document.getElementById("loadingIndicator");
    loadingIndicator.style.display = "block"; // Show loading indicator while creating

    console.log("Sending request to create note:", newNote); // Debugging log for newNote

    return fetch(`${BASE_URL}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newNote),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        loadingIndicator.style.display = "none"; // Hide loading indicator after creation
        if (responseJson.status === "success") {
          console.log("Created note:", responseJson.data); // Debugging log
          return responseJson.data; // Return the newly created note
        } else {
          throw new Error("Failed to create note");
        }
      })
      .catch((error) => {
        loadingIndicator.style.display = "none"; // Hide loading indicator on error
        console.error("Error creating note:", error);
        return null;
      });
  }
}

export default NotesApi;
