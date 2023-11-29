import * as basicLightbox from 'basiclightbox';
import  { Items, galleryItems }  from "./gallery-items.js";

const galleryRef: HTMLDivElement | null = document.querySelector(".gallery");
galleryRef?.insertAdjacentHTML("beforeend", createGalleryMarkup(galleryItems));
galleryRef?.addEventListener("click", onGalleryItemClick);
let instance: basicLightbox.BasicLightBox | undefined;

function createGalleryMarkup(images: Items[]): string {
  return images
    .map(
      ({ preview, original, description }) => `<div class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</div>`
    )
    .join("");
}

function onGalleryItemClick(event: MouseEvent): void {
  event.preventDefault();
  const target = event.target as HTMLElement;
  if (target.nodeName !== "IMG") {
    return;
  }
  onModalOpen(event);
}

function onModalOpen(event: MouseEvent): void {
  const target = event.target as HTMLElement;

  instance = basicLightbox.create(
    `<img src="${target.dataset.source}">`,
    {
      onShow: () => {
        window.addEventListener("keydown", onEscKeyPress);
        return true;
      },
      onClose: () => {
        window.removeEventListener("keydown", onEscKeyPress);
        return true;
      },
    }
  );
    instance?.show();
  }

function onModalClose(): void {
  instance?.close();
}

function onEscKeyPress(event: KeyboardEvent): void {
  if (event.code === "Escape") {
    onModalClose();
  }
}
