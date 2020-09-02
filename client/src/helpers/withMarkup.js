function getByTextWithMarkup(getByText, text) {
  return getByText((content, node) => {
    const hasText = (node) => node.textContent === text;

    const nodeHasText = hasText(node);
    const childrenDontHaveText = Array.from(node.children).every(
      (child) => !hasText(child)
    );

    return nodeHasText && childrenDontHaveText;
  });
}

export default getByTextWithMarkup;
