function closestParentMatch(element, matcher) {
  let parent = element.parentElement;

  while (parent) {
    if (parent.matches(matcher)) return parent;
    parent = parent.parentElement;
  }

  return parent;
}

export { closestParentMatch };
