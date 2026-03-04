document.addEventListener('DOMContentLoaded', () => {
    getSulosKaja();
    document.getElementById('deleteBtn').addEventListener('click', deleteSuloskaja);
});

const tableClick = () => {
    const select = (tbody) => {
        for (const tr of tbody.children) {
            tr.addEventListener('click', function () {
                const item = this;
                console.log(item);
                if (item.dataset.selected === 'true') {
                    item.dataset.selected = 'false';
                    item.classList.remove('table-active');
                } else {
                    for (const tr of tbody.children) {
                        tr.dataset.selected = 'false';
                        tr.classList.remove('table-active');
                    }
                    item.dataset.selected = 'true';
                    item.classList.add('table-active');
                }
            });
        }
    };

    select(document.getElementById('suloskajaTbody'));
};

const getSulosKaja = async () => {
    try {
        const result = await getMethodFetch('http://127.0.0.1:3000/api/suloskajak');
        const kajak = result.results;
        const tbody = document.getElementById('suloskajaTbody');
        tbody.replaceChildren();
        kajak.forEach((element) => {
            const tr = document.createElement('tr');
            const nev = document.createElement('td');
            nev.innerHTML = element.nev;
            const ar = document.createElement('td');
            ar.innerHTML = element.ar;
            const finomsag = document.createElement('td');
            finomsag.innerHTML = element.finomsag;
            const lejarat = document.createElement('td');
            lejarat.innerHTML = element.lejarat;
            const mennyiseg = document.createElement('td');
            mennyiseg.innerHTML = element.mennyiseg;
            tr.replaceChildren(nev, ar, finomsag, lejarat, mennyiseg);
            tbody.appendChild(tr);
        });

        tableClick();
    } catch (error) {
        console.log(error);
    }
};

const deleteSuloskaja = async () => {
    try {
        const selectedRow = document.querySelector('#suloskajaTbody tr[data-selected="true"]');
        if (!selectedRow) {
            alert('Nincs kiválasztva sor!');
            return;
        }
        const selectedNev = selectedRow.children[0].innerHTML;
        const result = await postMethodFetch('http://127.0.0.1:3000/api/deletesuloskaja', {
            nev: selectedNev
        });

        await getSulosKaja();
    } catch (error) {
        console.log(error);
    }
};

const getMethodFetch = async (url, data) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`POST hiba: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        throw new Error(`Hiba történt: ${error.message}`);
    }
};

const postMethodFetch = async (url, data) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`POST hiba: ${response.status} ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        throw new Error(`Hiba történt: ${error.message}`);
    }
};
