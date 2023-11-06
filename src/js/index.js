import { Notify } from "notiflix"
import { getPhoto } from "./pixabay-api";
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

function onSubmit(event) {
  event.preventDefault();
  const query = selectors.searchInput.value
  selectors.form.reset();
  if (!query.trim()) {
    return Notify.warning('Please enter some keyword to search images!')
  }
  if (query == searchWord) {
    return Notify.info(`You are already searching for "${query}"`)
  }
  selectors.loadDiv.classList.add('none')
  page = 1;
  searchWord = query;
  return getPhoto(searchWord);
}

selectors.loadBtn.addEventListener('click', onClick)

function onClick() {
  selectors.loadDiv.classList.add('none')
  page += 1;
  return getPhoto(searchWord, page)
}

export { selectors }