document.addEventListener('DOMContentLoaded', function() {

    const audio = document.getElementById('myAudio');

    const audioFile = document.getElementById('audioFile');

    const playPauseBtn = document.getElementById('playPauseBtn');

    const progressBar = document.getElementById('progressBar');

    const timeline = document.querySelector('.timeline');

    const currentTimeSpan = document.getElementById('currentTime');

    const durationSpan = document.getElementById('duration');

    // Function to format time in minutes and seconds

    function formatTime(seconds) {

        const minutes = Math.floor(seconds / 60);

        const secs = Math.floor(seconds % 60);

        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;

    }

    // Handle file selection

    audioFile.addEventListener('change', (e) => {

        const file = e.target.files[0];

        if (file) {

            // Create a URL for the selected file

            const fileURL = URL.createObjectURL(file);

            audio.src = fileURL;

            playPauseBtn.disabled = false;

        }

    });

    // Play/Pause functionality

    playPauseBtn.addEventListener('click', () => {

        if (audio.paused) {

            audio.play();

            playPauseBtn.textContent = 'Pause';

        } else {

            audio.pause();

            playPauseBtn.textContent = 'Play';

        }

    });

    // Update the progress bar and current time

    audio.addEventListener('timeupdate', () => {

        const progress = (audio.currentTime / audio.duration) * 100;

        progressBar.style.width = progress + '%';

        currentTimeSpan.textContent = formatTime(audio.currentTime);

    });

    // Update total duration when metadata is loaded

    audio.addEventListener('loadedmetadata', () => {

        durationSpan.textContent = formatTime(audio.duration);

    });

    // Skip to a specific time on the timeline

    timeline.addEventListener('click', (e) => {

        const timelineWidth = timeline.clientWidth;

        const clickX = e.offsetX;

        const newTime = (clickX / timelineWidth) * audio.duration;

        audio.currentTime = newTime;

    });

    // Update button text when audio ends

    audio.addEventListener('ended', () => {

        playPauseBtn.textContent = 'Play';

    });

});