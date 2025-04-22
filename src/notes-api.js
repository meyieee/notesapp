const BASE_URL = "https://notes-api.dicoding.dev/v2/";

class NotesApi {
  static fetchNotes() {
    return fetch(`${BASE_URL}/notes`)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response.json();
        } else {
          return Promise.reject(new Error(`Something went wrong`));
        }
      })
      .then((responseJson) => {
        const { notes } = responseJson; // Renamed to 'notes' to match your app

        if (notes && notes.length > 0) {
          return Promise.resolve(notes);
        } else {
          return Promise.reject(new Error("No notes found"));
        }
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
        return [];
      });
  }
}

export default NotesApi;
