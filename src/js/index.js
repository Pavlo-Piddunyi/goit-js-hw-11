import { Notify } from "notiflix"
import { getPhoto } from "./pixabay-api";
import { markup } from "./markup";
import simpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import '../css/style.css'


const selectors = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  body: document.querySelector('body'),
  searchInput: document.querySelector('.search-input'),
  loadDiv: document.querySelector(".load"),
  loadBtn: document.querySelector(".load-more")
};

let searchWord = "";
let page = 1;


selectors.form.addEventListener('submit', onSubmit)

async function onSubmit(event) {
  event.preventDefault();
  const query = selectors.searchInput.value
  selectors.form.reset();
  selectors.gallery.innerHTML = '';
  if (!query.trim()) {
    return Notify.warning('Please enter some keyword to search images!')
  }
  if (query == searchWord) {
    return Notify.info(`You are already searching for "${query}"`)
  }
  selectors.loadDiv.classList.add('none')
  page = 1;
  searchWord = query;
  srartEngine(page)
}

selectors.loadBtn.addEventListener('click', onClick)

async function srartEngine(page) {
  const galleryItems = await getPhoto(searchWord, page);
  const hits = galleryItems.data.hits;
  const totalHits = galleryItems.data.totalHits;

    if (hits.length === 0) {
    return Notify.failure("Sorry, there are no images matching your search query. Please try again.")
  }
  if (page == 1 && hits.length > 0) {
    Notify.success(`Hooray! We found ${totalHits} "${searchWord}" images.`)
    selectors.gallery.innerHTML = '';
  }
    if (page < Math.ceil(totalHits / 40)) {
      selectors.loadDiv.classList.remove('none')
  }
  else {
    Notify.info("We're sorry, but you've reached the end of search results.")
  }

  markup(hits, page, searchWord, totalHits);
    if (page < Math.ceil(totalHits / 40)) {
      return selectors.loadDiv.classList.remove('none')
  }
  selectors.loadDiv.classList.add('none');
}

async function onClick() {
  page += 1;
  srartEngine(page)
  simple.refresh();
}

const simple = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionPosition: 'bottom',
        captionDelay: 250,
        captionClass: 'caption' 
});

export { selectors }