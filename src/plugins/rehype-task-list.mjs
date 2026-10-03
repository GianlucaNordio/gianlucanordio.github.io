// Task lists (`- [x] done`, `- [ ] to do`) become checkboxes without a label,
// which screen readers announce as an unnamed control. This plugin names them.
export default function rehypeTaskList() {
  return (tree) => walk(tree);
}

function walk(node) {
  if (node.tagName === 'input' && node.properties?.type === 'checkbox') {
    node.properties.ariaLabel = node.properties.checked ? 'Done' : 'To do';
  }
  node.children?.forEach(walk);
}
