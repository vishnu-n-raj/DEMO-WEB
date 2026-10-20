// Copy Liquid Code Functionality
function copyCode(button) {
    const card = button.closest('.snippet-card');
    const codeText = card.querySelector('pre code').innerText;
    
    navigator.clipboard.writeText(codeText).then(() => {
        const originalText = button.innerHTML;
        button.innerHTML = '<span class="mr-1">✅</span> Copied!';
        button.classList.remove('bg-blue-50', 'text-blue-700');
        button.classList.add('bg-emerald-50', 'text-emerald-700');
        
        setTimeout(() => {
            button.innerHTML = originalText;
            button.classList.remove('bg-emerald-50', 'text-emerald-700');
            button.classList.add('bg-blue-50', 'text-blue-700');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy code: ', err);
    });
}

// Search Filter Functionality
function filterSnippets() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const cards = document.querySelectorAll('.snippet-card');
    let visibleCount = 0;

    cards.forEach(card => {
        const title = card.querySelector('.snippet-title').innerText.toLowerCase();
        const code = card.querySelector('pre code').innerText.toLowerCase();

        if (title.includes(input) || code.includes(input)) {
            card.style.display = "block";
            visibleCount++;
        } else {
            card.style.display = "none";
        }
    });

    document.getElementById('snippetCount').innerText = `Showing ${visibleCount} of ${cards.length} code snippets`;
}

// Reset Search Function
function resetSearch() {
    document.getElementById('searchInput').value = '';
    filterSnippets();
}
