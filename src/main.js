'use strict';

import { ImagesAPI } from './js/pixabay-api';
import renderImages from './js/render-functions';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const STORAGE_KEY = 'image-tag';

const refs = {
    imgTagInput: document.querySelector('#search-img'),
    searchBtn: document.querySelector('.form'),
    loader: document.querySelector('.backdrop'),
};

refs.imgTagInput.addEventListener('input', onFormInput);
refs.searchBtn.addEventListener('submit', onSearchImg);

const imagesAPI = new ImagesAPI();

function onFormInput() {
  const tag = refs.imgTagInput.value.trim();
  
  const data = {
      tag,
  };

  saveToLS(STORAGE_KEY, data);
}

function onSearchImg(evt) {
    evt.preventDefault();

    const userImgTag = refs.imgTagInput.value.trim();

    if (userImgTag === '') {
        iziToast.error({
        message: 'Please enter a search tag',
        titleColor: 'white',
        titleSize: '16px',
        messageColor: 'white',
        messageSize: '16px',
        backgroundColor: '#ef4040',
        iconUrl: '/img/error.svg',
        iconColor: 'white',
        position: 'topRight',
        });
    } else {
        refs.loader.classList.add('is-open');
        imagesAPI
            .getImages(userImgTag)
            .then(data => renderImages(data))
            .catch(err => {
                console.log(err)
            })
            .finally(() => {refs.loader.classList.remove('is-open');});
    }

    localStorage.removeItem(STORAGE_KEY);

    refs.searchBtn.reset();
}

function saveToLS(key, value) {
  const archive = JSON.stringify(value);
  localStorage.setItem(key, archive);
}

function loadFromLS(key) {
    const archive = localStorage.getItem(key);

    try {
        return JSON.parse(archive);
    } catch (error) {
        console.error('Error parsing JSON from localStorage:', error);
        return {};
    }
}

function init() {
    const data = loadFromLS(STORAGE_KEY) || {};
    refs.imgTagInput.value = data.tag || '';
}

init();