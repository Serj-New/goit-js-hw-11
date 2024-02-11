'use strict';

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

export class ImagesAPI {
  constructor() {
    this.BASE_URL = 'https://pixabay.com/api/';
    this.KEY = `?key=42244518-9742bcd26a7acdceb08ce98f6`;
  }

  getImages(userImgTag) {
    this.PARAMS = `&q=${userImgTag}&image_type=photo&orientation=horizontal&safesearch=true`;
    const url = this.BASE_URL + this.KEY + this.PARAMS;

    return fetch(url)
    .then(res => res.json())
    .then(data => {
      if (data.hits && data.hits.length > 0) {
        return data.hits;
      } else {
        iziToast.error({
          message: 'Sorry, there are no images matching your search query. Please try again!',
          titleColor: 'white',
          titleSize: '16px',
          messageColor: 'white',
          messageSize: '16px',
          backgroundColor: '#ef4040',
          iconUrl: '/img/error.svg',
          iconColor: 'white',
          position: 'topRight',
          maxWidth: '432px',
        });
      }
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
  }
}