// Function to handle the query search
function handleSearch(event) {
    event.preventDefault();

    const seatNumberInput = document.getElementById('seatNumber').value.trim();
    const nationalIdInput = document.getElementById('nationalId').value.trim();
    const errorMessage = document.getElementById('errorMessage');
    const searchCard = document.getElementById('searchCard');
    const resultsCard = document.getElementById('resultsCard');

    // Expected credentials
    const targetSeatNumber = '250019';
    const targetNationalId = '30708072403492';

    if (seatNumberInput === targetSeatNumber && nationalIdInput === targetNationalId) {
        // Clear error message if any
        errorMessage.style.display = 'none';
        errorMessage.textContent = '';

        // Populate display details
        document.getElementById('displaySeatNumber').textContent = targetSeatNumber;
        document.getElementById('displayNationalId').textContent = targetNationalId;

        // Set dynamic date in Arabic format
        const today = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        document.getElementById('currentDate').textContent = today.toLocaleDateString('ar-EG', options);

        // Switch visible cards
        searchCard.classList.add('hidden');
        resultsCard.classList.remove('hidden');

        // Scroll to top of the page smoothly
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        // Show error message
        errorMessage.textContent = 'عذراً، رقم الجلوس أو الرقم القومي غير صحيح. يرجى التحقق من البيانات والمحاولة مرة أخرى.';
        errorMessage.style.display = 'block';
    }
}

// Function to return to the search screen
function resetSearch() {
    const searchCard = document.getElementById('searchCard');
    const resultsCard = document.getElementById('resultsCard');
    const searchForm = document.getElementById('searchForm');
    const errorMessage = document.getElementById('errorMessage');

    // Clear inputs and error
    searchForm.reset();
    errorMessage.style.display = 'none';
    errorMessage.textContent = '';

    // Switch visible cards
    resultsCard.classList.add('hidden');
    searchCard.classList.remove('hidden');
}

// Setup SVG fallbacks for logos if the image file logo.png is missing
window.addEventListener('DOMContentLoaded', () => {
    const svgLogoHTML = `
        <svg width="80" height="80" viewBox="0 0 100 100" fill="none" stroke="black" stroke-width="2" style="display:block; margin: 0 auto;">
            <circle cx="50" cy="50" r="46" stroke-width="1.5" />
            <circle cx="50" cy="50" r="41" stroke-width="1" stroke-dasharray="2 2" />
            <path d="M50,18 L73,32 L73,63 L50,82 L27,63 L27,32 Z" fill="white" stroke-width="1.5" />
            <!-- Book Icon in Center -->
            <path d="M35,50 C40,47 50,47 50,52 C50,47 60,47 65,50 M35,62 C40,59 50,59 50,64 C50,59 60,59 65,62" stroke-width="1" />
            <line x1="50" y1="52" x2="50" y2="64" stroke-width="1" />
            <path d="M35,50 L35,62 M65,50 L65,62" stroke-width="1" />
            <!-- Torch/Flame Icon -->
            <path d="M50,28 C47,33 53,35 50,42 C48,38 52,36 50,28 Z" fill="black" stroke="none" />
            <!-- Text elements -->
            <text x="50" y="24" font-size="5.5" font-family="'Cairo', sans-serif" font-weight="bold" text-anchor="middle" fill="black" stroke="none">جامعة بني سويف الأهلية</text>
            <text x="50" y="75" font-size="5" font-family="'Cairo', sans-serif" text-anchor="middle" fill="black" stroke="none">BNSU</text>
        </svg>
    `;

    const logos = document.querySelectorAll('.univ-logo, .transcript-logo');
    logos.forEach(logo => {
        logo.addEventListener('error', function() {
            const container = this.parentElement;
            this.style.display = 'none';
            
            // Create a wrapper for SVG to make sure it doesn't break styling
            const wrapper = document.createElement('div');
            wrapper.innerHTML = svgLogoHTML;
            container.appendChild(wrapper);
        });
        
        // Trigger error handler manually if already failed/cached as broken
        if (logo.complete && logo.naturalWidth === 0) {
            logo.dispatchEvent(new Event('error'));
        }
    });
});
