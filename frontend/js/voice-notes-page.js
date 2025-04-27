document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const filterByCustomerBtn = document.querySelector('.filter-by-customer-btn');
    const recordNewBtn = document.querySelector('.record-new-btn');
    const customerFilterDialog = document.getElementById('customerFilterDialog');
    const recordDialog = document.getElementById('recordDialog');
    const closeDialogBtns = document.querySelectorAll('.close-dialog-btn');
    const viewNotesBtns = document.querySelectorAll('.view-notes-btn');
    const clearFilterBtn = document.querySelector('.clear-filter-btn');
    const customerSelect = document.getElementById('customer-select');
    const orderSelect = document.getElementById('order-select');
    const startRecordingBtn = document.querySelector('.start-recording-btn');
    const stopRecordingBtn = document.querySelector('.stop-recording-btn');
    const cancelRecordingBtn = document.querySelector('.cancel-recording-btn');
    const saveNoteBtn = document.querySelector('.save-note-btn');
    const recorderIdle = document.querySelector('.recorder-idle');
    const recorderActive = document.querySelector('.recorder-active');
    const recorderPreview = document.querySelector('.recorder-preview');
    const recordingTime = document.querySelector('.recording-time');
    const previewPlayBtn = document.querySelector('.preview-play-btn');
    const playButtons = document.querySelectorAll('.play-btn');
    const tagInput = document.querySelector('.tag-input');
    const tagsContainer = document.querySelector('.tags-container');
    const dateFilter = document.getElementById('date-filter');
    const orderFilter = document.getElementById('order-filter');
    const searchInput = document.querySelector('.search-input');
    
    // Audio recording variables
    let mediaRecorder;
    let audioChunks = [];
    let audioBlob;
    let audioUrl;
    let recordingInterval;
    let recordingDuration = 0;
    let audioElement;
    
    // Sample audio URLs for demo purposes
    const sampleAudioUrls = [
        'audio/special-delivery-instructions.mp3',
        'audio/allergy-information.mp3',
        'audio/custom-design-details.mp3',
        'audio/payment-follow-up.mp3'
    ];
    
    // Open customer filter dialog
    filterByCustomerBtn.addEventListener('click', function() {
        customerFilterDialog.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Open record new dialog
    recordNewBtn.addEventListener('click', function() {
        recordDialog.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    // Close dialogs
    closeDialogBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const dialog = this.closest('.dialog-overlay');
            dialog.classList.remove('active');
            document.body.style.overflow = '';
            
            // Stop any playing audio
            stopAllAudio();
        });
    });
    
    // Close dialog when clicking outside
    document.querySelectorAll('.dialog-overlay').forEach(overlay => {
        overlay.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                document.body.style.overflow = '';
                
                // Stop any playing audio
                stopAllAudio();
            }
        });
    });
    
    // View notes for a specific customer
    viewNotesBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.disabled) return;
            
            const customerName = this.closest('.customer-item').querySelector('h4').textContent;
            
            // Close the dialog
            customerFilterDialog.classList.remove('active');
            
            // Update the filter button text
            filterByCustomerBtn.innerHTML = `<i class="fas fa-user"></i> ${customerName} <i class="fas fa-times"></i>`;
            filterByCustomerBtn.classList.add('active');
            
            // Filter the voice notes (in a real app, this would fetch from the server)
            filterVoiceNotes(customerName);
        });
    });
    
    // Clear customer filter
    clearFilterBtn.addEventListener('click', function() {
        // Reset the filter button text
        filterByCustomerBtn.innerHTML = `<i class="fas fa-users"></i> Filter by Customer`;
        filterByCustomerBtn.classList.remove('active');
        
        // Show all voice notes
        document.querySelectorAll('.voice-note-card').forEach(card => {
            card.style.display = '';
        });
        
        // Close the dialog
        customerFilterDialog.classList.remove('active');
        document.body.style.overflow = '';
    });
    
    // Customer select change
    customerSelect.addEventListener('change', function() {
        const customerId = this.value;
        
        // Enable/disable order select based on customer selection
        if (customerId) {
            orderSelect.disabled = false;
            
            // In a real app, this would fetch orders for the selected customer
            // For demo, we'll just add some sample orders
            orderSelect.innerHTML = '<option value="">Select an order</option>';
            
            if (customerId === '1') { // Sarah Johnson
                orderSelect.innerHTML += `
                    <option value="ORD-2023-0568">Order #ORD-2023-0568</option>
                    <option value="ORD-2023-0550">Order #ORD-2023-0550</option>
                `;
            } else if (customerId === '2') { // Michael Brown
                orderSelect.innerHTML += `
                    <option value="ORD-2023-0562">Order #ORD-2023-0562</option>
                `;
            } else if (customerId === '3') { // Emily Davis
                orderSelect.innerHTML += `
                    <option value="ORD-2023-0559">Order #ORD-2023-0559</option>
                `;
            }
        } else {
            orderSelect.disabled = true;
            orderSelect.innerHTML = '<option value="">Select an order</option>';
        }
        
        // Enable/disable save button based on form completion
        checkFormCompletion();
    });
    
    // Note title input change
    document.getElementById('note-title').addEventListener('input', function() {
        // Enable/disable save button based on form completion
        checkFormCompletion();
    });
    
    // Start recording
    startRecordingBtn.addEventListener('click', function() {
        // Request microphone access
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                // Show recording UI
                recorderIdle.style.display = 'none';
                recorderActive.style.display = 'flex';
                recorderPreview.style.display = 'none';
                
                // Reset recording duration
                recordingDuration = 0;
                recordingTime.textContent = '00:00';
                
                // Start recording timer
                recordingInterval = setInterval(updateRecordingTime, 1000);
                
                // Initialize media recorder
                mediaRecorder = new MediaRecorder(stream);
                audioChunks = [];
                
                // Collect audio chunks
                mediaRecorder.addEventListener('dataavailable', event => {
                    audioChunks.push(event.data);
                });
                
                // When recording stops
                mediaRecorder.addEventListener('stop', () => {
                    // Create audio blob and URL
                    audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
                    audioUrl = URL.createObjectURL(audioBlob);
                    
                    // Create audio element for preview
                    audioElement = new Audio(audioUrl);
                    
                    // Show preview UI
                    recorderIdle.style.display = 'none';
                    recorderActive.style.display = 'none';
                    recorderPreview.style.display = 'flex';
                    
                    // Enable save button if form is complete
                    checkFormCompletion();
                    
                    // Stop all tracks in the stream
                    stream.getTracks().forEach(track => track.stop());
                });
                
                // Start recording
                mediaRecorder.start();
            })
            .catch(error => {
                console.error('Error accessing microphone:', error);
                alert('Could not access microphone. Please check your permissions.');
                
                // Reset UI
                recorderIdle.style.display = 'flex';
                recorderActive.style.display = 'none';
                recorderPreview.style.display = 'none';
            });
    });
    
    // Stop recording
    stopRecordingBtn.addEventListener('click', function() {
        if (mediaRecorder && mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
            clearInterval(recordingInterval);
        }
    });
    
    // Cancel recording
    cancelRecordingBtn.addEventListener('click', function() {
        if (mediaRecorder && mediaRecorder.state === 'recording') {
            mediaRecorder.stop();
            clearInterval(recordingInterval);
            
            // Reset UI without showing preview
            recorderIdle.style.display = 'flex';
            recorderActive.style.display = 'none';
            recorderPreview.style.display = 'none';
        }
    });
    
    // Preview play button
    previewPlayBtn.addEventListener('click', function() {
        if (!audioElement) return;
        
        if (audioElement.paused) {
            // Stop any other playing audio
            stopAllAudio();
            
            // Play this audio
            audioElement.play();
            previewPlayBtn.classList.add('playing');
            previewPlayBtn.querySelector('i').classList.remove('fa-play');
            previewPlayBtn.querySelector('i').classList.add('fa-pause');
            
            // Update progress bar
            const progressFill = previewPlayBtn.closest('.preview-audio').querySelector('.progress-fill');
            const progressTime = previewPlayBtn.closest('.preview-audio').querySelector('.progress-time');
            
            audioElement.addEventListener('timeupdate', function() {
                const progress = (audioElement.currentTime / audioElement.duration) * 100;
                progressFill.style.width = `${progress}%`;
                progressTime.textContent = formatTime(audioElement.currentTime);
            });
            
            audioElement.addEventListener('ended', function() {
                previewPlayBtn.classList.remove('playing');
                previewPlayBtn.querySelector('i').classList.remove('fa-pause');
                previewPlayBtn.querySelector('i').classList.add('fa-play');
                progressFill.style.width = '0%';
                progressTime.textContent = '0:00';
            });
        } else {
            // Pause audio
            audioElement.pause();
            previewPlayBtn.classList.remove('playing');
            previewPlayBtn.querySelector('i').classList.remove('fa-pause');
            previewPlayBtn.querySelector('i').classList.add('fa-play');
        }
    });
    
    // Save note button
    saveNoteBtn.addEventListener('click', function() {
        if (!audioBlob) {
            alert('No recording to save.');
            return;
        }
        
        const customerId = customerSelect.value;
        const customerName = customerSelect.options[customerSelect.selectedIndex].text;
        const orderId = orderSelect.value;
        const orderText = orderId ? orderSelect.options[orderSelect.selectedIndex].text : '';
        const title = document.getElementById('note-title').value.trim();
        
        // Get tags
        const tags = [];
        tagsContainer.querySelectorAll('.tag span:first-child').forEach(tag => {
            tags.push(tag.textContent);
        });
        
        // In a real application, you would save the audio blob to a server here
        console.log('Saving voice note:', {
            customerId,
            customerName,
            orderId,
            orderText,
            title,
            tags,
            audioBlob,
            duration: formatTime(recordingDuration)
        });
        
        // Show success message
        alert('Voice note saved successfully!');
        
        // Close the dialog
        recordDialog.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset the form
        resetRecordForm();
    });
    
    // Play buttons in voice notes list
    playButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const voiceNote = this.closest('.voice-note-content');
            const progressFill = voiceNote.querySelector('.progress-fill');
            const progressTime = voiceNote.querySelector('.progress-time');
            
            // For demo purposes, we'll use sample audio files
            // In a real application, you would use the actual audio URLs
            const audioUrl = sampleAudioUrls[index % sampleAudioUrls.length];
            
            if (this.classList.contains('playing')) {
                // Pause audio
                if (audioElement) {
                    audioElement.pause();
                }
                this.classList.remove('playing');
                this.querySelector('i').classList.remove('fa-pause');
                this.querySelector('i').classList.add('fa-play');
            } else {
                // Stop any other playing audio
                stopAllAudio();
                
                // Create and play audio
                audioElement = new Audio(audioUrl);
                audioElement.play();
                
                this.classList.add('playing');
                this.querySelector('i').classList.remove('fa-play');
                this.querySelector('i').classList.add('fa-pause');
                
                // Update progress bar
                audioElement.addEventListener('timeupdate', function() {
                    const progress = (audioElement.currentTime / audioElement.duration) * 100;
                    progressFill.style.width = `${progress}%`;
                    progressTime.textContent = formatTime(audioElement.currentTime);
                });
                
                audioElement.addEventListener('ended', function() {
                    button.classList.remove('playing');
                    button.querySelector('i').classList.remove('fa-pause');
                    button.querySelector('i').classList.add('fa-play');
                    progressFill.style.width = '0%';
                    progressTime.textContent = '0:00';
                });
            }
        });
    });
    
    // Tag input
    tagInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            
            const tagText = this.value.trim();
            if (tagText) {
                addTag(tagText);
                this.value = '';
            }
        }
    });
    
    // Remove tag
    tagsContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-tag-btn') || e.target.parentElement.classList.contains('remove-tag-btn')) {
            const tagElement = e.target.closest('.tag');
            tagElement.remove();
        }
    });
    
    // Date filter change
    dateFilter.addEventListener('change', function() {
        // In a real app, this would filter voice notes by date
        console.log('Date filter changed:', this.value);
    });
    
    // Order filter change
    orderFilter.addEventListener('change', function() {
        // In a real app, this would filter voice notes by order status
        console.log('Order filter changed:', this.value);
    });
    
    // Search input
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.trim().toLowerCase();
        
        // Filter voice notes by search term
        document.querySelectorAll('.voice-note-card').forEach(card => {
            const title = card.querySelector('.voice-note-title span').textContent.toLowerCase();
            const customer = card.querySelector('.customer-details h3').textContent.toLowerCase();
            const order = card.querySelector('.order-reference').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || customer.includes(searchTerm) || order.includes(searchTerm)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    });
    
    // Helper Functions
    
    // Update recording time
    function updateRecordingTime() {
        recordingDuration++;
        const minutes = Math.floor(recordingDuration / 60);
        const seconds = recordingDuration % 60;
        recordingTime.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    
    // Format time (seconds to MM:SS)
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    
    // Stop all playing audio
    function stopAllAudio() {
        // Stop preview audio if playing
        if (audioElement && !audioElement.paused) {
            audioElement.pause();
            audioElement.currentTime = 0;
        }
        
        // Reset all play buttons
        document.querySelectorAll('.play-btn, .preview-play-btn').forEach(btn => {
            btn.classList.remove('playing');
            const icon = btn.querySelector('i');
            if (icon) {
                icon.className = 'fas fa-play';
            }
        });
        
        // Reset all progress bars
        document.querySelectorAll('.progress-fill').forEach(fill => {
            fill.style.width = '0%';
        });
        
        // Reset all progress times
        document.querySelectorAll('.progress-time').forEach(time => {
            time.textContent = '0:00';
        });
    }
    
    // Add tag
    function addTag(text) {
        const tag = document.createElement('span');
        tag.className = 'tag';
        tag.innerHTML = `
            <span>${text}</span>
            <button class="remove-tag-btn"><i class="fas fa-times"></i></button>
        `;
        tagsContainer.appendChild(tag);
    }
    
    // Check if form is complete to enable save button
    function checkFormCompletion() {
        const customerId = customerSelect.value;
        const title = document.getElementById('note-title').value.trim();
        const hasRecording = audioBlob !== undefined;
        
        if (customerId && title && hasRecording) {
            saveNoteBtn.disabled = false;
        } else {
            saveNoteBtn.disabled = true;
        }
    }
    
    // Reset record form
    function resetRecordForm() {
        customerSelect.value = '';
        orderSelect.value = '';
        orderSelect.disabled = true;
        document.getElementById('note-title').value = '';
        tagsContainer.innerHTML = '';
        
        recorderIdle.style.display = 'flex';
        recorderActive.style.display = 'none';
        recorderPreview.style.display = 'none';
        
        // Clear audio data
        if (audioUrl) {
            URL.revokeObjectURL(audioUrl);
            audioUrl = null;
        }
        audioBlob = null;
        audioElement = null;
        
        saveNoteBtn.disabled = true;
    }
    
    // Filter voice notes by customer
    function filterVoiceNotes(customerName) {
        document.querySelectorAll('.voice-note-card').forEach(card => {
            const cardCustomerName = card.querySelector('.customer-details h3').textContent;
            
            if (cardCustomerName === customerName) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        });
    }
});