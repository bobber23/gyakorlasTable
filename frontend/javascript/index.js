document.addEventListener('DOMContentLoaded', () => {
    postSulosKaja();
});

const postSulosKaja = async () => {
    try {
        const uploadButton = document.getElementById('uploadBtn');
        const kajaForm = document.getElementById('kajaForm');

        uploadButton.addEventListener('click', async () => {
            const formData = new FormData(kajaForm);
            try {
                const result = await postMethodFetch(
                    'http://127.0.0.1:3000/api/insertkaja',
                    formData
                );
                console.log(result);
            } catch (error) {
                console.error('Hiba:', error.message);
            }
        });
    } catch (error) {
        console.log(error);
    }
};

const postMethodFetch = async (url, data) => {
    try {
        const response = await fetch(url, { method: 'POST', body: data });
        if (!response.ok) {
            throw new Error(`POST hiba: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        throw new Error(`Hiba történt: ${error.message}`);
    }
};
