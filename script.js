// script.js

function copyCode(button) {
    const card = button.closest('.snippet-card');
    const codeText = card.querySelector('pre code').innerText;
    
    navigator.clipboard.writeText(codeText).then(() => {
        const originalHTML = button.innerHTML;
        button.innerHTML = 'Copied! <span class="ml-1.5">✅</span>';
        button.classList.remove('bg-blue-600', 'hover:bg-blue-700');
        button.classList.add('bg-emerald-600', 'hover:bg-emerald-700');
        
        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.classList.remove('bg-emerald-600', 'hover:bg-emerald-700');
            button.classList.add('bg-blue-600', 'hover:bg-blue-700');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy code: ', err);
    });
}
