import { Items, galleryItems } from "./gallery-items.js";
// import SimpleLightbox from "simplelightbox";
// import "simplelightbox/dist/simple-lightbox.min.css";
const galleryRef: HTMLDivElement | null = document.querySelector(".gallery");
galleryRef?.insertAdjacentHTML("beforeend", createGalleryMarkup(galleryItems));

// @ts-ignore
const lightbox = new SimpleLightbox(".gallery a", {
  captionDelay: 250,
  captionsData: "alt",
});

lightbox.on("show.lightbox");

function createGalleryMarkup(images: Items[]): string {
  return images
    .map(
      ({
        preview,
        original,
        description,
      }) => `<a class="gallery__item" href="${original}">
  <img class="gallery__image" src="${preview}" alt="${description}" />
</a>`
    )
    .join("");
}
