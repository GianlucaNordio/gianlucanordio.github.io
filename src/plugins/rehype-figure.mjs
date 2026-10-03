// Markdown has no syntax for image captions. This plugin gives it one:
//
//   ![Alt text](./images/plot.png "Caption text")
//
// An image that stands alone in its paragraph becomes a <figure>, and its
// title (the quoted text) becomes the <figcaption>. Without a title the
// image is still wrapped in a <figure>, just without a caption.
export default function rehypeFigure() {
  return (tree) => walk(tree);
}

function walk(node) {
  if (!node.children) return;
  node.children.forEach((child, i) => {
    const img = loneImage(child);
    if (!img) return walk(child);

    const caption = img.properties.title;
    delete img.properties.title;
    node.children[i] = {
      type: 'element',
      tagName: 'figure',
      properties: {},
      children: caption
        ? [img, { type: 'element', tagName: 'figcaption', properties: {}, children: [{ type: 'text', value: caption }] }]
        : [img],
    };
  });
}

// Returns the <img> if `node` is a paragraph containing only that image.
function loneImage(node) {
  if (node.type !== 'element' || node.tagName !== 'p') return null;
  const content = node.children.filter((c) => !(c.type === 'text' && c.value.trim() === ''));
  const only = content.length === 1 ? content[0] : null;
  return only?.type === 'element' && only.tagName === 'img' ? only : null;
}
