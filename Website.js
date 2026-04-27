document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search-input');
    const characterBoxes = document.querySelectorAll('.box');

    searchInput.addEventListener('keyup', () => {
        const searchTerm = searchInput.value.toLowerCase();

        characterBoxes.forEach(box => {
            const characterName = box.dataset.name.toLowerCase();
            if (characterName.includes(searchTerm)) {
                box.style.display = 'block';
            } else {
                box.style.display = 'none';
            }
        });
    });
});