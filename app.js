const base_dir = document.getElementById('base-dir');
const REAL_PATH = base_dir.innerHTML;
const all_titles = document.getElementsByClassName('title');
const all_files = document.getElementsByClassName('file');
const container_preview = document.getElementById('preview');
const clearPreview = document.getElementById('clear-preview');
const previous = document.getElementById('previous');
const force_clear = document.getElementById('force-clear');
const file = document.getElementById('file');
const file_icon = document.getElementsByClassName('icon');
const list_extensions = ['.png', '.jpg', '.jpeg', '.gif', '.mp3', '.mp4', '.ico'];

const list_title = [];
const preview_place_holder = "Preview* ...<br><span><code>*Comments in code files are now read !</code></span>";

clearPreview.addEventListener('click', () => {
    container_preview.innerHTML = preview_place_holder;
    file.innerText = "";
});

previous.addEventListener('click', () => {
    let target = justFolderName(base_dir.innerText);
    for (let i = 0; i < list_title.length; i++) {
        const element = list_title[i];
        const titleRef = all_titles[i];

        if (element != target) continue;

        base_dir.innerText = base_dir.innerText.replace("/" + justFolderName(target), '');
        titleRef.parentNode.classList.toggle('close-dir');
        container_preview.innerHTML = preview_place_holder;
        file.innerText = "";
    }
});

force_clear.addEventListener('click', () => {
    for (let i = 0; i < all_titles.length; i++) {
        const element = all_titles[i];
        if (!element.parentNode.classList.contains('close-dir')) {
            element.parentNode.classList.toggle('close-dir');
            base_dir.innerText = REAL_PATH;
            container_preview.innerHTML = preview_place_holder;
            file.innerText = "";
        }
    }
});

function emptyLastPreview(element) {
    container_preview.innerHTML = preview_place_holder;
    return populatePreview(element)
}

function justFolderName(currentRoot) {
    const segments = currentRoot.split("/");
    return segments[segments.length - 1];
}

function removeFolderName(currentRoot) {
    const indexOfFolderName = currentRoot.lastIndexOf("/");
    return currentRoot.substring(0, indexOfFolderName);
}

function onlyExtention(element) {
    return element.match(/\.[^\.]{1,10}$/)[0];
}

async function populatePreview(element) {
    const new_dir = base_dir.innerText + "/" + element;
    return fetch(new_dir, { mode: 'no-cors' }).then(res => res.text())
        .then((data) => {
            const extension = onlyExtention(element);
            switch (extension) {
                case '.png':
                case '.jpeg':
                case '.jpg':
                case '.gif':
                case '.ico':
                    container_preview.innerHTML = `<img src='${new_dir}'>`;
                    break;
                case '.mp3':
                    container_preview.innerHTML = `<audio controls> <source src='${new_dir}' type="audio/mpeg"></source>does not support audio</audio>`;
                    break;
                case '.php':
                case '.html':
                case '.js':
                case '.css':
                    container_preview.innerHTML = data;
                    break;
                default:
                    container_preview.innerText = "Unfortunaly we can't display this information ...";
                    break;
            }
        });
}

for (let i = 0; i < all_titles.length; i++) {
    const element = all_titles[i];
    list_title.push(element.innerText);
    element.addEventListener('click', () => {
        element.parentNode.classList.toggle('close-dir');
        if (justFolderName(base_dir.innerText) != element.innerText) {
            base_dir.innerText += "/" + element.innerText
        } else {
            base_dir.innerText = removeFolderName(base_dir.innerText);
        }
    });
}

for (let i = 0; i < all_files.length; i++) {
    const e = all_files[i];
    const icon = file_icon[i];
    const text = e.firstElementChild.innerText;
    if (text.match(/\.ico$/)) {
        icon.src = base_dir.innerText + "/" + text;
    } else if (text.match(/\.png$/)) {
        icon.src = "assets/png.svg";
    } else if (text.match(/\.css$/)) {
        icon.src = "assets/css.svg";
    } else if (text.match(/\.js$/)) {
        icon.src = "assets/js.svg";
    } else if (text.match(/\.php$/)) {
        icon.src = "assets/php.svg";
    } else if (text.match(/\.mp3$/)) {
        icon.src = "assets/mp3.svg";
    } else if (text.match(/\.html$/)) {
        icon.src = "assets/html.svg";
    } else {
        icon.src = "assets/file.svg";
    }
    e.addEventListener('click', () => {
        file.innerText = text;
        emptyLastPreview(text);
    });
}