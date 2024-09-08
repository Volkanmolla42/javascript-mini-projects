/**
 * Notes Application
 * ===============
 *
 * This script handles the functionality of a simple note-taking application.
 * It allows users to create, edit, and delete notes, and saves the notes to local storage.
 */

// Initialize notes array from local storage, or create a new array if none exists
const notes = JSON.parse(localStorage.getItem('notes')) || []

/**
 * Render Notes
 * -----------
 *
 * Renders the notes to the page, including the note text and delete buttons.
 *
 * @returns {void}
 */
function renderNotes() {
  let notesHtml = ''

  // Loop through the notes in reverse order to display the most recent notes first
  notes
    .slice()
    .reverse()
    .forEach((note, index) => {
      const html = `
    <div class="note-box not-id-${index}">
      <textarea class="input-box w-100 bg-light p-3 rounded-2 text-black">
      ${note.notes}
      </textarea>
      <img
        src="images/trash-solid.svg"
        class="icons-small deleteBtn"
        alt=""
        data-index="${notes.length - 1 - index}"
      />
    </div>
    `
      notesHtml += html
    })

  // Set the inner HTML of the notes container to the rendered notes
  document.querySelector('.notes-container').innerHTML = notesHtml

  // Add event listeners for delete buttons
  document.querySelectorAll('.deleteBtn').forEach((btn) => {
    /**
     * Delete Note
     * ----------
     *
     * Deletes a note from the notes array and saves the updated array to local storage.
     *
     * @param {Event} e - The click event
     * @returns {void}
     */
    btn.addEventListener('click', (e) => {
      const index = e.target.getAttribute('data-index')
      notes.splice(index, 1)
      saveStorage()
      renderNotes()
    })
  })

  // Add event listeners for textarea changes
  document.querySelectorAll('.input-box').forEach((textarea, index) => {
    /**
     * Update Note
     * ----------
     *
     * Updates a note in the notes array and saves the updated array to local storage.
     *
     * @param {Event} e - The input event
     * @returns {void}
     */
    textarea.addEventListener('input', (e) => {
      notes[notes.length - 1 - index].notes = e.target.value
      saveStorage()
    })
  })
}

/**
 * Save Storage
 * ------------
 *
 * Saves the notes array to local storage.
 *
 * @returns {void}
 */
function saveStorage() {
  localStorage.setItem('notes', JSON.stringify(notes))
}

// Add event listener for create note button
document.querySelector('.create-notes').addEventListener('click', () => {
  /**
   * Create Note
   * ----------
   *
   * Creates a new note and adds it to the notes array.
   *
   * @returns {void}
   */
  notes.push({ notes: '' })
  renderNotes()
  saveStorage()
})

// Render notes on page load
renderNotes()
