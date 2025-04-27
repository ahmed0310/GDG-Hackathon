document.addEventListener("DOMContentLoaded", () => {
    // Initialize the voice notes manager
    const voiceNotesManager = new VoiceNotesManager()
    const bulkDownloader = new VoiceNotesBulkDownloader(voiceNotesManager)
  
    voiceNotesManager.init().then(() => {
      console.log("Voice Notes Manager initialized")
      loadVoiceNotes()
    })
  
    // DOM Elements
    const filterByCustomerBtn = document.querySelector(".filter-by-customer-btn")
    const recordNewBtn = document.querySelector(".record-new-btn")
    const customerFilterDialog = document.getElementById("customerFilterDialog")
    const recordDialog = document.getElementById("recordDialog")
    const closeDialogBtns = document.querySelectorAll(".close-dialog-btn")
    const viewNotesBtns = document.querySelectorAll(".view-notes-btn")
    const clearFilterBtn = document.querySelector(".clear-filter-btn")
    const customerSelect = document.getElementById("customer-select")
    const orderSelect = document.getElementById("order-select")
    const startRecordingBtn = document.querySelector(".start-recording-btn")
    const stopRecordingBtn = document.querySelector(".stop-recording-btn")
    const cancelRecordingBtn = document.querySelector(".cancel-recording-btn")
    const saveNoteBtn = document.querySelector(".save-note-btn")
    const recorderIdle = document.querySelector(".recorder-idle")
    const recorderActive = document.querySelector(".recorder-active")
    const recorderPreview = document.querySelector(".recorder-preview")
    const recordingTime = document.querySelector(".recording-time")
    const previewPlayBtn = document.querySelector(".preview-play-btn")
    const tagInput = document.querySelector(".tag-input")
    const tagsContainer = document.querySelector(".tags-container")
    const dateFilter = document.getElementById("date-filter")
    const orderFilter = document.getElementById("order-filter")
    const searchInput = document.querySelector(".search-input")
    const voiceNotesContainer = document.querySelector(".voice-notes-container")
  
    // State variables
    let selectedCustomerId = null
    let currentTags = []
    let recordingUpdateInterval = null
    let filteredNotes = []
  
    // Initialize bulk downloader
  
    // Bulk download button
    const bulkDownloadBtn = document.querySelector(".bulk-download-btn")
    const bulkDownloadDialog = document.getElementById("bulkDownloadDialog")
    const startDownloadBtn = document.querySelector(".start-download-btn")
  
    // Download option radio buttons
    const downloadOptionRadios = document.querySelectorAll('input[name="download-option"]')
    const customerSelectGroup = document.querySelector(".customer-select-group")
    const dateRangeGroup = document.querySelector(".date-range-group")
  
    // Open bulk download dialog
    bulkDownloadBtn.addEventListener("click", () => {
      bulkDownloadDialog.classList.add("active")
      document.body.style.overflow = "hidden"
    })
  
    // Handle download option change
    downloadOptionRadios.forEach((radio) => {
      radio.addEventListener("change", () => {
        const option = radio.value
  
        // Show/hide relevant form groups
        customerSelectGroup.style.display = option === "customer" ? "block" : "none"
        dateRangeGroup.style.display = option === "date" ? "block" : "none"
      })
    })
  
    // Start bulk download
    startDownloadBtn.addEventListener("click", () => {
      const selectedOption = document.querySelector('input[name="download-option"]:checked').value
  
      let downloadPromise
  
      switch (selectedOption) {
        case "all":
          // Download all voice notes
          downloadPromise = voiceNotesManager.getAllVoiceNotes().then((notes) => {
            bulkDownloader.addToQueue(notes)
            return bulkDownloader.startDownload()
          })
          break
  
        case "filtered":
          // Download currently filtered notes
          downloadPromise = Promise.resolve(filteredNotes).then((notes) => {
            bulkDownloader.addToQueue(notes)
            return bulkDownloader.startDownload()
          })
          break
  
        case "customer":
          // Download by customer
          const customerId = document.getElementById("bulk-customer-select").value
          if (!customerId) {
            alert("Please select a customer")
            return
          }
  
          downloadPromise = bulkDownloader.downloadAllForCustomer(customerId)
          break
  
        case "date":
          // Download by date range
          const startDate = document.getElementById("start-date").value
          const endDate = document.getElementById("end-date").value
  
          if (!startDate || !endDate) {
            alert("Please select both start and end dates")
            return
          }
  
          downloadPromise = bulkDownloader.downloadByDateRange(new Date(startDate), new Date(endDate))
          break
      }
  
      // Process the download
      if (downloadPromise) {
        // Close the dialog
        bulkDownloadDialog.classList.remove("active")
        document.body.style.overflow = ""
  
        downloadPromise
          .then((results) => {
            console.log("Download results:", results)
  
            // Show success message
            const successCount = results.filter((r) => r.success).length
            alert(`Successfully downloaded ${successCount} voice notes.`)
          })
          .catch((error) => {
            console.error("Error during bulk download:", error)
            alert("An error occurred during download. Please try again.")
          })
      }
    })
  
    // Open customer filter dialog
    filterByCustomerBtn.addEventListener("click", () => {
      customerFilterDialog.classList.add("active")
      document.body.style.overflow = "hidden"
    })
  
    // Open record new dialog
    recordNewBtn.addEventListener("click", () => {
      recordDialog.classList.add("active")
      document.body.style.overflow = "hidden"
      resetRecordForm()
    })
  
    // Close dialogs
    closeDialogBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const dialog = this.closest(".dialog-overlay")
        dialog.classList.remove("active")
        document.body.style.overflow = ""
  
        // If closing the record dialog, cancel any ongoing recording
        if (dialog === recordDialog) {
          voiceNotesManager.cancelRecording()
          clearRecordingUI()
        }
      })
    })
  
    // Close dialog when clicking outside
    document.querySelectorAll(".dialog-overlay").forEach((overlay) => {
      overlay.addEventListener("click", function (e) {
        if (e.target === this) {
          this.classList.remove("active")
          document.body.style.overflow = ""
  
          // If closing the record dialog, cancel any ongoing recording
          if (this === recordDialog) {
            voiceNotesManager.cancelRecording()
            clearRecordingUI()
          }
        }
      })
    })
  
    // View notes for a specific customer
    viewNotesBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        if (this.disabled) return
  
        const customerName = this.closest(".customer-item").querySelector("h4").textContent
        const customerId = this.getAttribute("data-customer-id")
  
        // Close the dialog
        customerFilterDialog.classList.remove("active")
  
        // Update the filter button text
        filterByCustomerBtn.innerHTML = `<i class="fas fa-user"></i> ${customerName} <i class="fas fa-times"></i>`
        filterByCustomerBtn.classList.add("active")
  
        // Set selected customer ID
        selectedCustomerId = customerId
  
        // Filter the voice notes
        loadVoiceNotes()
      })
    })
  
    // Clear customer filter
    clearFilterBtn.addEventListener("click", () => {
      // Reset the filter button text
      filterByCustomerBtn.innerHTML = `<i class="fas fa-users"></i> Filter by Customer`
      filterByCustomerBtn.classList.remove("active")
  
      // Clear selected customer ID
      selectedCustomerId = null
  
      // Show all voice notes
      loadVoiceNotes()
  
      // Close the dialog
      customerFilterDialog.classList.remove("active")
      document.body.style.overflow = ""
    })
  
    // Customer select change
    customerSelect.addEventListener("change", function () {
      const customerId = this.value
  
      // Enable/disable order select based on customer selection
      if (customerId) {
        orderSelect.disabled = false
  
        // In a real app, this would fetch orders for the selected customer
        // For demo, we'll just add some sample orders
        orderSelect.innerHTML = '<option value="">Select an order</option>'
  
        if (customerId === "1") {
          // Sarah Johnson
          orderSelect.innerHTML += `
            <option value="ORD-2023-0568">Order #ORD-2023-0568</option>
            <option value="ORD-2023-0550">Order #ORD-2023-0550</option>
          `
        } else if (customerId === "2") {
          // Michael Brown
          orderSelect.innerHTML += `
            <option value="ORD-2023-0562">Order #ORD-2023-0562</option>
          `
        } else if (customerId === "3") {
          // Emily Davis
          orderSelect.innerHTML += `
            <option value="ORD-2023-0559">Order #ORD-2023-0559</option>
          `
        }
      } else {
        orderSelect.disabled = true
        orderSelect.innerHTML = '<option value="">Select an order</option>'
      }
  
      // Enable/disable save button based on form completion
      checkFormCompletion()
    })
  
    // Note title input change
    document.getElementById("note-title").addEventListener("input", () => {
      // Enable/disable save button based on form completion
      checkFormCompletion()
    })
  
    // Start recording
    startRecordingBtn.addEventListener("click", () => {
      // Show recording UI
      recorderIdle.style.display = "none"
      recorderActive.style.display = "flex"
      recorderPreview.style.display = "none"
  
      // Start recording
      voiceNotesManager
        .startRecording()
        .then(() => {
          // Start updating the recording time display
          recordingUpdateInterval = setInterval(() => {
            recordingTime.textContent = voiceNotesManager.getRecordingDuration()
          }, 1000)
        })
        .catch((error) => {
          console.error("Error starting recording:", error)
          alert("Could not access microphone. Please check your permissions.")
  
          // Reset UI
          clearRecordingUI()
        })
    })
  
    // Stop recording
    stopRecordingBtn.addEventListener("click", () => {
      voiceNotesManager
        .stopRecording()
        .then((recordingData) => {
          // Clear the update interval
          clearInterval(recordingUpdateInterval)
  
          // Show preview UI
          recorderIdle.style.display = "none"
          recorderActive.style.display = "none"
          recorderPreview.style.display = "flex"
  
          // Enable save button if form is complete
          checkFormCompletion()
        })
        .catch((error) => {
          console.error("Error stopping recording:", error)
          clearRecordingUI()
        })
    })
  
    // Cancel recording
    cancelRecordingBtn.addEventListener("click", () => {
      voiceNotesManager.cancelRecording()
      clearInterval(recordingUpdateInterval)
      clearRecordingUI()
    })
  
    // Preview play button
    previewPlayBtn.addEventListener("click", () => {
      if (voiceNotesManager.recorder.audioUrl) {
        if (voiceNotesManager.currentlyPlaying === "preview") {
          // Pause playback
          voiceNotesManager.stopPlayback()
          previewPlayBtn.classList.remove("playing")
          previewPlayBtn.querySelector("i").classList.remove("fa-pause")
          previewPlayBtn.querySelector("i").classList.add("fa-play")
        } else {
          // Play preview
          const audio = new Audio(voiceNotesManager.recorder.audioUrl)
          voiceNotesManager.audioElement = audio
          voiceNotesManager.currentlyPlaying = "preview"
  
          audio.play()
          previewPlayBtn.classList.add("playing")
          previewPlayBtn.querySelector("i").classList.remove("fa-play")
          previewPlayBtn.querySelector("i").classList.add("fa-pause")
  
          // Update progress bar
          const progressFill = previewPlayBtn.closest(".preview-audio").querySelector(".progress-fill")
          const progressTime = previewPlayBtn.closest(".preview-audio").querySelector(".progress-time")
  
          audio.addEventListener("timeupdate", () => {
            const progress = (audio.currentTime / audio.duration) * 100
            progressFill.style.width = `${progress}%`
            progressTime.textContent = formatTime(audio.currentTime)
          })
  
          audio.addEventListener("ended", () => {
            previewPlayBtn.classList.remove("playing")
            previewPlayBtn.querySelector("i").classList.remove("fa-pause")
            previewPlayBtn.querySelector("i").classList.add("fa-play")
            progressFill.style.width = "0%"
            progressTime.textContent = "0:00"
            voiceNotesManager.currentlyPlaying = null
          })
        }
      }
    })
  
    // Save note button
    saveNoteBtn.addEventListener("click", () => {
      const customerId = customerSelect.value
      const customerName = customerSelect.options[customerSelect.selectedIndex].text
      const orderId = orderSelect.value
      const orderNumber = orderId ? orderSelect.options[orderSelect.selectedIndex].text : ""
      const title = document.getElementById("note-title").value.trim()
      const downloadCheckbox = document.getElementById("download-to-local").checked
  
      // Save the voice note and download if checkbox is checked
      voiceNotesManager
        .saveVoiceNoteAndDownload(
          {
            title,
            customerId,
            customerName,
            orderId,
            orderNumber,
            tags: currentTags,
          },
          downloadCheckbox,
        )
        .then((result) => {
          // Show success message
          let message = "Voice note saved successfully!"
          if (downloadCheckbox) {
            message += ` File saved as "${result.downloadResult.filename}".`
          }
  
          alert(message)
  
          // Close the dialog
          recordDialog.classList.remove("active")
          document.body.style.overflow = ""
  
          // Reset the form
          resetRecordForm()
  
          // Reload voice notes
          loadVoiceNotes()
        })
        .catch((error) => {
          console.error("Error saving voice note:", error)
          alert("Failed to save voice note. Please try again.")
        })
    })
  
    // Tag input
    tagInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault()
  
        const tagText = this.value.trim()
        if (tagText) {
          addTag(tagText)
          this.value = ""
        }
      }
    })
  
    // Remove tag
    tagsContainer.addEventListener("click", (e) => {
      if (e.target.classList.contains("remove-tag-btn") || e.target.parentElement.classList.contains("remove-tag-btn")) {
        const tagElement = e.target.closest(".tag")
        const tagText = tagElement.querySelector("span:first-child").textContent
  
        // Remove from UI
        tagElement.remove()
  
        // Remove from current tags array
        currentTags = currentTags.filter((tag) => tag !== tagText)
      }
    })
  
    // Date filter change
    dateFilter.addEventListener("change", () => {
      loadVoiceNotes()
    })
  
    // Order filter change
    orderFilter.addEventListener("change", () => {
      loadVoiceNotes()
    })
  
    // Search input
    searchInput.addEventListener("input", () => {
      loadVoiceNotes()
    })
  
    // Load voice notes
    function loadVoiceNotes() {
      // Get all voice notes
      let notesPromise
  
      if (selectedCustomerId) {
        notesPromise = voiceNotesManager.getVoiceNotesByCustomer(selectedCustomerId)
      } else {
        notesPromise = voiceNotesManager.getAllVoiceNotes()
      }
  
      notesPromise
        .then((notes) => {
          // Apply search filter if needed
          const searchTerm = searchInput.value.trim().toLowerCase()
          if (searchTerm) {
            notes = notes.filter(
              (note) =>
                note.title.toLowerCase().includes(searchTerm) ||
                note.customerName.toLowerCase().includes(searchTerm) ||
                (note.orderNumber && note.orderNumber.toLowerCase().includes(searchTerm)),
            )
          }
  
          // Apply date filter if needed
          if (dateFilter.value !== "all") {
            const now = new Date()
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  
            notes = notes.filter((note) => {
              const noteDate = new Date(note.createdAt)
  
              switch (dateFilter.value) {
                case "today":
                  return noteDate >= today
                case "week":
                  const weekAgo = new Date(today)
                  weekAgo.setDate(weekAgo.getDate() - 7)
                  return noteDate >= weekAgo
                case "month":
                  const monthAgo = new Date(today)
                  monthAgo.setMonth(monthAgo.getMonth() - 1)
                  return noteDate >= monthAgo
                default:
                  return true
              }
            })
          }
  
          // Apply order filter if needed
          if (orderFilter.value !== "all") {
            notes = notes.filter((note) => note.orderId)
          }
  
          // Sort by date (newest first)
          notes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  
          // Store the filtered notes
          filteredNotes = notes
  
          // Render voice notes
          renderVoiceNotes(notes)
        })
        .catch((error) => {
          console.error("Error loading voice notes:", error)
          voiceNotesContainer.innerHTML = `
          <div class="error-message">
            <i class="fas fa-exclamation-circle"></i>
            <p>Failed to load voice notes. Please try again.</p>
          </div>
        `
        })
    }
  
    // Render voice notes to the container
    function renderVoiceNotes(notes) {
      if (notes.length === 0) {
        voiceNotesContainer.innerHTML = `
          <div class="empty-state">
            <i class="fas fa-microphone-slash"></i>
            <h3>No voice notes found</h3>
            <p>Start by recording your first voice note.</p>
          </div>
        `
        return
      }
  
      let html = ""
  
      notes.forEach((note) => {
        const date = new Date(note.createdAt)
        const formattedDate =
          date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }) +
          " - " +
          date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
          })
  
        const tagsHtml =
          note.tags && note.tags.length > 0
            ? note.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")
            : '<span class="tag-empty">No tags</span>'
  
        html += `
          <div class="card voice-note-card" data-id="${note.id}">
            <div class="card-body">
              <div class="voice-note-header">
                <div class="customer-info">
                  <img src="img/customer-avatar.jpg" alt="${note.customerName}" class="customer-avatar">
                  <div class="customer-details">
                    <h3>${note.customerName}</h3>
                    <p class="order-reference">${note.orderNumber || "No order linked"}</p>
                  </div>
                </div>
                <div class="voice-note-meta">
                  <span class="voice-note-date">${formattedDate}</span>
                  <span class="voice-note-duration">${note.duration}</span>
                </div>
              </div>
              <div class="voice-note-content">
                <div class="voice-note-title">
                  <i class="fas fa-microphone"></i>
                  <span>${note.title}</span>
                </div>
                <div class="voice-note-controls">
                  <button class="play-btn" data-id="${note.id}"><i class="fas fa-play"></i></button>
                  <div class="voice-note-progress">
                    <div class="progress-bar">
                      <div class="progress-fill"></div>
                    </div>
                    <span class="progress-time">0:00</span>
                  </div>
                </div>
              </div>
              <div class="voice-note-footer">
                <div class="voice-note-tags">
                  ${tagsHtml}
                </div>
                <div class="voice-note-actions">
                  <button class="action-btn view-customer-btn" title="View Customer" data-id="${note.customerId}">
                    <i class="fas fa-user"></i>
                  </button>
                  ${
                    note.orderId
                      ? `
                  <button class="action-btn view-order-btn" title="View Order" data-id="${note.orderId}">
                    <i class="fas fa-shopping-cart"></i>
                  </button>
                  `
                      : ""
                  }
                  <button class="action-btn edit-note-btn" title="Edit" data-id="${note.id}">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="action-btn download-note-btn" title="Download" data-id="${note.id}">
                    <i class="fas fa-download"></i>
                  </button>
                  <button class="action-btn delete-note-btn" title="Delete" data-id="${note.id}">
                    <i class="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        `
      })
  
      voiceNotesContainer.innerHTML = html
  
      // Add event listeners to play buttons
      document.querySelectorAll(".play-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
          const noteId = this.getAttribute("data-id")
          const voiceNote = notes.find((note) => note.id == noteId)
  
          if (!voiceNote) return
  
          if (voiceNotesManager.currentlyPlaying === noteId) {
            // Pause playback
            voiceNotesManager.stopPlayback()
            this.classList.remove("playing")
            this.querySelector("i").classList.remove("fa-pause")
            this.querySelector("i").classList.add("fa-play")
          } else {
            // Stop any other playing audio
            document.querySelectorAll(".play-btn").forEach((btn) => {
              btn.classList.remove("playing")
              btn.querySelector("i").classList.remove("fa-pause")
              btn.querySelector("i").classList.add("fa-play")
            })
  
            // Play this note
            const audio = new Audio(voiceNote.audioData)
            voiceNotesManager.audioElement = audio
            voiceNotesManager.currentlyPlaying = noteId
  
            audio.play()
            this.classList.add("playing")
            this.querySelector("i").classList.remove("fa-play")
            this.querySelector("i").classList.add("fa-pause")
  
            // Update progress bar
            const progressFill = this.closest(".voice-note-controls").querySelector(".progress-fill")
            const progressTime = this.closest(".voice-note-controls").querySelector(".progress-time")
  
            audio.addEventListener("timeupdate", () => {
              const progress = (audio.currentTime / audio.duration) * 100
              progressFill.style.width = `${progress}%`
              progressTime.textContent = formatTime(audio.currentTime)
            })
  
            audio.addEventListener("ended", () => {
              btn.classList.remove("playing")
              btn.querySelector("i").classList.remove("fa-pause")
              btn.querySelector("i").classList.add("fa-play")
              progressFill.style.width = "0%"
              progressTime.textContent = "0:00"
              voiceNotesManager.currentlyPlaying = null
            })
          }
        })
      })
  
      // Add event listeners to delete buttons
      document.querySelectorAll(".delete-note-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
          const noteId = Number.parseInt(this.getAttribute("data-id"))
  
          if (confirm("Are you sure you want to delete this voice note? This action cannot be undone.")) {
            voiceNotesManager
              .deleteVoiceNote(noteId)
              .then(() => {
                // Reload voice notes
                loadVoiceNotes()
              })
              .catch((error) => {
                console.error("Error deleting voice note:", error)
                alert("Failed to delete voice note. Please try again.")
              })
          }
        })
      })
  
      // Add event listeners to download buttons
      document.querySelectorAll(".download-note-btn").forEach((btn) => {
        btn.addEventListener("click", function () {
          const noteId = Number.parseInt(this.getAttribute("data-id"))
          const voiceNote = notes.find((note) => note.id === noteId)
  
          if (voiceNote) {
            voiceNotesManager
              .downloadVoiceNote(voiceNote, true)
              .then((result) => {
                console.log(`Downloaded voice note as ${result.filename}`)
              })
              .catch((error) => {
                console.error("Error downloading voice note:", error)
                alert("Failed to download voice note. Please try again.")
              })
          }
        })
      })
    }
  
    // Add a tag to the current tags
    function addTag(tagText) {
      if (!currentTags.includes(tagText)) {
        currentTags.push(tagText)
  
        const tag = document.createElement("span")
        tag.className = "tag"
        tag.innerHTML = `
          <span>${tagText}</span>
          <button class="remove-tag-btn"><i class="fas fa-times"></i></button>
        `
        tagsContainer.appendChild(tag)
      }
    }
  
    // Clear recording UI
    function clearRecordingUI() {
      recorderIdle.style.display = "flex"
      recorderActive.style.display = "none"
      recorderPreview.style.display = "none"
      recordingTime.textContent = "00:00"
    }
  
    // Check if form is complete to enable save button
    function checkFormCompletion() {
      const customerId = customerSelect.value
      const title = document.getElementById("note-title").value.trim()
      const hasRecording = voiceNotesManager.recorder.audioBlob !== null
  
      if (customerId && title && hasRecording) {
        saveNoteBtn.disabled = false
      } else {
        saveNoteBtn.disabled = false
      }
    }
  
    // Reset record form
    function resetRecordForm() {
      customerSelect.value = ""
      orderSelect.value = ""
      orderSelect.disabled = true
      document.getElementById("note-title").value = ""
      tagsContainer.innerHTML = ""
      currentTags = []
  
      clearRecordingUI()
      voiceNotesManager.cancelRecording()
  
      saveNoteBtn.disabled = true
    }
  
    // Format time (seconds to MM:SS)
    function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60)
      const remainingSeconds = Math.floor(seconds % 60)
      return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
    }
  })
  