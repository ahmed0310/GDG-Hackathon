// New file for bulk download functionality

class VoiceNotesBulkDownloader {
    constructor(voiceNotesManager) {
      this.voiceNotesManager = voiceNotesManager
      this.downloadQueue = []
      this.isDownloading = false
    }
  
    // Add voice notes to download queue
    addToQueue(voiceNotes) {
      if (!Array.isArray(voiceNotes)) {
        voiceNotes = [voiceNotes]
      }
  
      this.downloadQueue = [...this.downloadQueue, ...voiceNotes]
      return this.downloadQueue.length
    }
  
    // Clear the download queue
    clearQueue() {
      this.downloadQueue = []
      return 0
    }
  
    // Start downloading voice notes in queue
    startDownload() {
      if (this.isDownloading || this.downloadQueue.length === 0) {
        return Promise.resolve([])
      }
  
      this.isDownloading = true
      const results = []
  
      // Create a progress indicator
      const progressContainer = document.createElement("div")
      progressContainer.className = "download-progress-container"
      progressContainer.innerHTML = `
        <div class="download-progress-overlay"></div>
        <div class="download-progress-dialog">
          <h3>Downloading Voice Notes</h3>
          <div class="progress-bar-container">
            <div class="progress-bar-fill" style="width: 0%"></div>
          </div>
          <div class="progress-text">Preparing downloads...</div>
        </div>
      `
      document.body.appendChild(progressContainer)
  
      const progressFill = progressContainer.querySelector(".progress-bar-fill")
      const progressText = progressContainer.querySelector(".progress-text")
  
      // Process downloads sequentially with a delay
      const processDownloads = async () => {
        const total = this.downloadQueue.length
        let completed = 0
  
        for (const voiceNote of this.downloadQueue) {
          try {
            // Update progress
            const progress = Math.round((completed / total) * 100)
            progressFill.style.width = `${progress}%`
            progressText.textContent = `Downloading ${completed + 1} of ${total}: ${voiceNote.title || "Voice Note"}`
  
            // Get download link but don't auto-download
            const downloadInfo = await this.voiceNotesManager.downloadVoiceNote(voiceNote, false)
  
            // Trigger download manually
            downloadInfo.triggerDownload()
  
            // Wait a bit between downloads to avoid browser throttling
            await new Promise((resolve) => setTimeout(resolve, 1000))
  
            // Clean up
            downloadInfo.cleanup()
  
            results.push({
              id: voiceNote.id,
              filename: downloadInfo.filename,
              success: true,
            })
          } catch (error) {
            console.error(`Error downloading voice note ${voiceNote.id}:`, error)
            results.push({
              id: voiceNote.id,
              error: error.message,
              success: false,
            })
          }
  
          completed++
        }
  
        // Update final progress
        progressFill.style.width = "100%"
        progressText.textContent = `Downloaded ${completed} of ${total} voice notes`
  
        // Remove progress indicator after a delay
        setTimeout(() => {
          document.body.removeChild(progressContainer)
        }, 2000)
  
        this.downloadQueue = []
        this.isDownloading = false
  
        return results
      }
  
      return processDownloads()
    }
  
    // Download all voice notes for a specific customer
    downloadAllForCustomer(customerId) {
      return this.voiceNotesManager.getVoiceNotesByCustomer(customerId).then((notes) => {
        this.addToQueue(notes)
        return this.startDownload()
      })
    }
  
    // Download voice notes by date range
    downloadByDateRange(startDate, endDate) {
      return this.voiceNotesManager.getVoiceNotesByDateRange(startDate, endDate).then((notes) => {
        this.addToQueue(notes)
        return this.startDownload()
      })
    }
  }
  
  // Add to window object for access in other scripts
  window.VoiceNotesBulkDownloader = VoiceNotesBulkDownloader
  