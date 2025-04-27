// Voice Notes Storage System
// This uses IndexedDB to store voice notes directly in the browser

class VoiceNotesStorage {
  constructor() {
    this.db = null
    this.dbName = "voiceNotesDB"
    this.dbVersion = 1
    this.storeName = "voiceNotes"
    this.init()
  }

  // Initialize the database
  init() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion)

      request.onerror = (event) => {
        console.error("IndexedDB error:", event.target.error)
        reject("Error opening database")
      }

      request.onsuccess = (event) => {
        this.db = event.target.result
        console.log("Database opened successfully")
        resolve(this.db)
      }

      request.onupgradeneeded = (event) => {
        const db = event.target.result

        // Create object store for voice notes if it doesn't exist
        if (!db.objectStoreNames.contains(this.storeName)) {
          const store = db.createObjectStore(this.storeName, { keyPath: "id", autoIncrement: true })

          // Create indexes for searching and filtering
          store.createIndex("customerId", "customerId", { unique: false })
          store.createIndex("orderId", "orderId", { unique: false })
          store.createIndex("createdAt", "createdAt", { unique: false })
          store.createIndex("title", "title", { unique: false })

          console.log("Object store created")
        }
      }
    })
  }

  // Save a voice note to IndexedDB
  saveVoiceNote(voiceNote) {
    return new Promise((resolve, reject) => {
      // Make sure database is initialized
      if (!this.db) {
        return this.init()
          .then(() => this.saveVoiceNote(voiceNote))
          .then(resolve)
          .catch(reject)
      }

      // Add timestamp if not provided
      if (!voiceNote.createdAt) {
        voiceNote.createdAt = new Date().toISOString()
      }

      const transaction = this.db.transaction([this.storeName], "readwrite")
      const store = transaction.objectStore(this.storeName)
      const request = store.add(voiceNote)

      request.onsuccess = (event) => {
        console.log("Voice note saved successfully")
        resolve(event.target.result) // Returns the ID of the newly added record
      }

      request.onerror = (event) => {
        console.error("Error saving voice note:", event.target.error)
        reject("Error saving voice note")
      }
    })
  }

  // Get all voice notes
  getAllVoiceNotes() {
    return new Promise((resolve, reject) => {
      // Make sure database is initialized
      if (!this.db) {
        return this.init()
          .then(() => this.getAllVoiceNotes())
          .then(resolve)
          .catch(reject)
      }

      const transaction = this.db.transaction([this.storeName], "readonly")
      const store = transaction.objectStore(this.storeName)
      const request = store.getAll()

      request.onsuccess = (event) => {
        resolve(event.target.result)
      }

      request.onerror = (event) => {
        console.error("Error getting voice notes:", event.target.error)
        reject("Error getting voice notes")
      }
    })
  }

  // Get voice notes by customer ID
  getVoiceNotesByCustomer(customerId) {
    return new Promise((resolve, reject) => {
      // Make sure database is initialized
      if (!this.db) {
        return this.init()
          .then(() => this.getVoiceNotesByCustomer(customerId))
          .then(resolve)
          .catch(reject)
      }

      const transaction = this.db.transaction([this.storeName], "readonly")
      const store = transaction.objectStore(this.storeName)
      const index = store.index("customerId")
      const request = index.getAll(customerId)

      request.onsuccess = (event) => {
        resolve(event.target.result)
      }

      request.onerror = (event) => {
        console.error("Error getting voice notes by customer:", event.target.error)
        reject("Error getting voice notes by customer")
      }
    })
  }

  // Get a voice note by ID
  getVoiceNoteById(id) {
    return new Promise((resolve, reject) => {
      // Make sure database is initialized
      if (!this.db) {
        return this.init()
          .then(() => this.getVoiceNoteById(id))
          .then(resolve)
          .catch(reject)
      }

      const transaction = this.db.transaction([this.storeName], "readonly")
      const store = transaction.objectStore(this.storeName)
      const request = store.get(id)

      request.onsuccess = (event) => {
        resolve(event.target.result)
      }

      request.onerror = (event) => {
        console.error("Error getting voice note:", event.target.error)
        reject("Error getting voice note")
      }
    })
  }

  // Update a voice note
  updateVoiceNote(id, updates) {
    return new Promise((resolve, reject) => {
      // Make sure database is initialized
      if (!this.db) {
        return this.init()
          .then(() => this.updateVoiceNote(id, updates))
          .then(resolve)
          .catch(reject)
      }

      const transaction = this.db.transaction([this.storeName], "readwrite")
      const store = transaction.objectStore(this.storeName)

      // First get the existing record
      const getRequest = store.get(id)

      getRequest.onsuccess = (event) => {
        const voiceNote = event.target.result
        if (!voiceNote) {
          reject("Voice note not found")
          return
        }

        // Update the voice note with new values
        Object.assign(voiceNote, updates)

        // Put the updated voice note back in the store
        const updateRequest = store.put(voiceNote)

        updateRequest.onsuccess = () => {
          resolve(voiceNote)
        }

        updateRequest.onerror = (event) => {
          console.error("Error updating voice note:", event.target.error)
          reject("Error updating voice note")
        }
      }

      getRequest.onerror = (event) => {
        console.error("Error getting voice note for update:", event.target.error)
        reject("Error getting voice note for update")
      }
    })
  }

  // Delete a voice note
  deleteVoiceNote(id) {
    return new Promise((resolve, reject) => {
      // Make sure database is initialized
      if (!this.db) {
        return this.init()
          .then(() => this.deleteVoiceNote(id))
          .then(resolve)
          .catch(reject)
      }

      const transaction = this.db.transaction([this.storeName], "readwrite")
      const store = transaction.objectStore(this.storeName)
      const request = store.delete(id)

      request.onsuccess = () => {
        resolve(true)
      }

      request.onerror = (event) => {
        console.error("Error deleting voice note:", event.target.error)
        reject("Error deleting voice note")
      }
    })
  }

  // Search voice notes by title
  searchVoiceNotes(searchTerm) {
    return new Promise((resolve, reject) => {
      this.getAllVoiceNotes()
        .then((notes) => {
          const lowerSearchTerm = searchTerm.toLowerCase()
          const results = notes.filter(
            (note) =>
              note.title.toLowerCase().includes(lowerSearchTerm) ||
              (note.customerName && note.customerName.toLowerCase().includes(lowerSearchTerm)),
          )
          resolve(results)
        })
        .catch(reject)
    })
  }

  // Get voice notes created within a date range
  getVoiceNotesByDateRange(startDate, endDate) {
    return new Promise((resolve, reject) => {
      this.getAllVoiceNotes()
        .then((notes) => {
          const results = notes.filter((note) => {
            const noteDate = new Date(note.createdAt)
            return noteDate >= startDate && noteDate <= endDate
          })
          resolve(results)
        })
        .catch(reject)
    })
  }
}

// Voice Recorder class to handle recording functionality
class VoiceRecorder {
  constructor() {
    this.mediaRecorder = null
    this.audioChunks = []
    this.audioBlob = null
    this.audioUrl = null
    this.stream = null
    this.isRecording = false
    this.recordingStartTime = null
    this.recordingDuration = 0
    this.recordingInterval = null
  }

  // Start recording
  startRecording() {
    return new Promise((resolve, reject) => {
      // Request microphone access
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          this.stream = stream
          this.audioChunks = []

          // Create media recorder
          this.mediaRecorder = new MediaRecorder(stream)

          // Collect audio chunks
          this.mediaRecorder.addEventListener("dataavailable", (event) => {
            this.audioChunks.push(event.data)
          })

          // When recording stops
          this.mediaRecorder.addEventListener("stop", () => {
            // Create audio blob and URL
            this.audioBlob = new Blob(this.audioChunks, { type: "audio/webm" })
            this.audioUrl = URL.createObjectURL(this.audioBlob)

            // Stop all tracks in the stream
            this.stream.getTracks().forEach((track) => track.stop())
            this.stream = null

            // Clear recording interval
            if (this.recordingInterval) {
              clearInterval(this.recordingInterval)
              this.recordingInterval = null
            }

            this.isRecording = false
            resolve({
              blob: this.audioBlob,
              url: this.audioUrl,
              duration: this.recordingDuration,
            })
          })

          // Start recording
          this.mediaRecorder.start()
          this.isRecording = true
          this.recordingStartTime = Date.now()

          // Start duration timer
          this.recordingInterval = setInterval(() => {
            this.recordingDuration = Math.floor((Date.now() - this.recordingStartTime) / 1000)
          }, 1000)

          resolve({ started: true })
        })
        .catch((error) => {
          console.error("Error accessing microphone:", error)
          reject("Could not access microphone. Please check your permissions.")
        })
    })
  }

  // Stop recording
  stopRecording() {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder || this.mediaRecorder.state !== "recording") {
        reject("Not recording")
        return
      }

      this.mediaRecorder.stop()
      // The 'stop' event handler will resolve the promise
    })
  }

  // Cancel recording
  cancelRecording() {
    if (this.mediaRecorder && this.mediaRecorder.state === "recording") {
      this.mediaRecorder.stop()
    }

    if (this.recordingInterval) {
      clearInterval(this.recordingInterval)
      this.recordingInterval = null
    }

    if (this.stream) {
      this.stream.getTracks().forEach((track) => track.stop())
      this.stream = null
    }

    if (this.audioUrl) {
      URL.revokeObjectURL(this.audioUrl)
      this.audioUrl = null
    }

    this.audioBlob = null
    this.audioChunks = []
    this.isRecording = false
    this.recordingDuration = 0
  }

  // Format time (seconds to MM:SS)
  formatTime(seconds) {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
  }

  // Get current recording duration formatted
  getFormattedDuration() {
    return this.formatTime(this.recordingDuration)
  }
}

// VoiceNotesManager - combines storage and recording functionality
class VoiceNotesManager {
  constructor() {
    this.storage = new VoiceNotesStorage()
    this.recorder = new VoiceRecorder()
    this.currentlyPlaying = null
    this.audioElement = null
  }

  // Initialize the manager
  async init() {
    await this.storage.init()
    return this
  }

  // Start recording a voice note
  startRecording() {
    return this.recorder.startRecording()
  }

  // Stop recording
  stopRecording() {
    return this.recorder.stopRecording()
  }

  // Cancel recording
  cancelRecording() {
    this.recorder.cancelRecording()
  }

  // Get recording duration
  getRecordingDuration() {
    return this.recorder.getFormattedDuration()
  }

  // Save a voice note
  async saveVoiceNote(data) {
    if (!this.recorder.audioBlob) {
      throw new Error("No recording available")
    }

    // Convert audio blob to base64 for storage
    const base64Audio = await this.blobToBase64(this.recorder.audioBlob)

    const voiceNote = {
      title: data.title,
      audioData: base64Audio,
      duration: this.recorder.getFormattedDuration(),
      customerId: data.customerId,
      customerName: data.customerName,
      orderId: data.orderId,
      orderNumber: data.orderNumber,
      tags: data.tags || [],
      createdAt: new Date().toISOString(),
    }

    const id = await this.storage.saveVoiceNote(voiceNote)
    return id
  }

  // Convert blob to base64
  blobToBase64(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    })
  }

  // Get all voice notes
  getAllVoiceNotes() {
    return this.storage.getAllVoiceNotes()
  }

  // Get voice notes by customer
  getVoiceNotesByCustomer(customerId) {
    return this.storage.getVoiceNotesByCustomer(customerId)
  }

  // Play a voice note
  playVoiceNote(voiceNote) {
    // Stop any currently playing audio
    this.stopPlayback()

    // Create and play audio element
    this.audioElement = new Audio(voiceNote.audioData)
    this.audioElement.play()
    this.currentlyPlaying = voiceNote.id

    // Return a promise that resolves when audio ends
    return new Promise((resolve) => {
      this.audioElement.onended = () => {
        this.currentlyPlaying = null
        resolve()
      }
    })
  }

  // Stop current playback
  stopPlayback() {
    if (this.audioElement && !this.audioElement.paused) {
      this.audioElement.pause()
      this.audioElement.currentTime = 0
    }
    this.currentlyPlaying = null
  }

  // Delete a voice note
  deleteVoiceNote(id) {
    return this.storage.deleteVoiceNote(id)
  }

  // Search voice notes
  searchVoiceNotes(searchTerm) {
    return this.storage.searchVoiceNotes(searchTerm)
  }

  // Get voice notes by date range
  getVoiceNotesByDateRange(startDate, endDate) {
    return this.storage.getVoiceNotesByDateRange(startDate, endDate)
  }

  // New method to download voice note to local machine
  downloadVoiceNote(voiceNote, autoDownload = false) {
    return new Promise((resolve, reject) => {
      try {
        // If the audio data is in base64 format, convert it to a blob
        let audioBlob

        if (voiceNote.audioData.startsWith("data:")) {
          // Convert base64 to blob
          const base64Data = voiceNote.audioData.split(",")[1]
          const byteCharacters = atob(base64Data)
          const byteArrays = []

          for (let i = 0; i < byteCharacters.length; i += 512) {
            const slice = byteCharacters.slice(i, i + 512)
            const byteNumbers = new Array(slice.length)

            for (let j = 0; j < slice.length; j++) {
              byteNumbers[j] = slice.charCodeAt(j)
            }

            byteArrays.push(new Uint8Array(byteNumbers))
          }

          audioBlob = new Blob(byteArrays, { type: "audio/webm" })
        } else if (voiceNote.audioBlob) {
          // Use existing blob if available
          audioBlob = voiceNote.audioBlob
        } else {
          throw new Error("No valid audio data found")
        }

        // Create a download link
        const url = URL.createObjectURL(audioBlob)
        const a = document.createElement("a")

        // Generate filename based on customer info and date
        const date = new Date(voiceNote.createdAt || new Date())
        const formattedDate = date.toISOString().split("T")[0] // YYYY-MM-DD
        const formattedTime = date.toTimeString().split(" ")[0].replace(/:/g, "-") // HH-MM-SS

        // Clean customer name for filename (remove special chars)
        const customerName = (voiceNote.customerName || "Unknown").replace(/[^a-z0-9]/gi, "_").toLowerCase()

        // Create filename with pattern: customer_name_YYYY-MM-DD_HH-MM-SS_title.webm
        const title = (voiceNote.title || "voice_note").replace(/[^a-z0-9]/gi, "_").toLowerCase()
        const filename = `${customerName}_${formattedDate}_${formattedTime}_${title}.webm`

        a.href = url
        a.download = filename
        a.style.display = "none"

        // Add to document, trigger click, then remove
        document.body.appendChild(a)

        if (autoDownload) {
          a.click()
        } else {
          // Return the download link and function for manual triggering
          resolve({
            downloadUrl: url,
            filename: filename,
            triggerDownload: () => a.click(),
            cleanup: () => {
              document.body.removeChild(a)
              URL.revokeObjectURL(url)
            },
          })
          return
        }

        document.body.removeChild(a)
        URL.revokeObjectURL(url)
        resolve({ filename })
      } catch (error) {
        console.error("Error downloading voice note:", error)
        reject(error)
      }
    })
  }

  // New method to save voice note to IndexedDB AND download it
  saveVoiceNoteAndDownload(data, autoDownload = true) {
    return new Promise(async (resolve, reject) => {
      try {
        // First save to IndexedDB
        const id = await this.saveVoiceNote(data)

        // Get the saved voice note
        const voiceNote = await this.storage.getVoiceNoteById(id)

        // Then download it
        const downloadResult = await this.downloadVoiceNote(voiceNote, autoDownload)

        resolve({
          id,
          downloadResult,
        })
      } catch (error) {
        reject(error)
      }
    })
  }
}

// Export the manager for use in other scripts
window.VoiceNotesManager = VoiceNotesManager
