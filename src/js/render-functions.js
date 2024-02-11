'use strict';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const refs = {
    imageElem: document.querySelector('.gallery'),
};

function templateImage({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) {
    return  `
    <li class="gallery-item">
        <a href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}""/>
            <div class="img-info">
                <p class="info-item"><b>Likes:</b>${likes}</p>
                <p class="info-item"><b>Views:</b>${views}</p>
                <p class="info-item"><b>Comments:</b>${comments}</p>
                <p class="info-item"><b>Downloads:</b>${downloads}</p>
            </div>
        </a>
    </li>
    `;
};

function templateImages(images) {
    return images.map(templateImage).join('');
}

export default function renderImages(images) {
    const markup = templateImages(images);
    refs.imageElem.innerHTML = markup;

    const gallery = new SimpleLightbox('.gallery a', {
        captions: true,
        captionDelay: 250,
        captionsData: 'alt',
      });
    
    gallery.refresh();
}