function scrollIntoView(element, container) {
  requestAnimationFrame(() => {
    if (element) {
      const offset = element.offsetTop - container.scrollTop;
      container.scrollBy({
        top: offset
      });
    }
  });
}

export { scrollIntoView };
