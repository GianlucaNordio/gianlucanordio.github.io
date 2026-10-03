// Grayscale syntax theme for Shiki. Tokens are told apart by weight and
// slant, not colour. The two "colours" are the CSS variables defined in
// global.css, so code blocks follow light and dark mode automatically.
const text = 'var(--text)';
const grey = 'var(--grey)';

export default {
  name: 'grayscale',
  type: 'light',
  colors: {
    'editor.foreground': text,
    'editor.background': 'transparent',
  },
  tokenColors: [
    {
      scope: ['comment', 'punctuation.definition.comment'],
      settings: { foreground: grey, fontStyle: 'italic' },
    },
    {
      scope: ['keyword', 'storage', 'keyword.operator.new', 'keyword.operator.expression'],
      settings: { fontStyle: 'bold' },
    },
    {
      // Symbol operators (=, +, ->) stay regular weight.
      scope: [
        'keyword.operator',
        'keyword.operator.assignment',
        'keyword.operator.arithmetic',
        'keyword.operator.comparison',
        'storage.type.function.arrow',
      ],
      settings: { fontStyle: '' },
    },
    {
      // Only quoted strings: unquoted ones (shell arguments, YAML values)
      // would turn whole blocks italic.
      scope: ['string.quoted', 'string.template'],
      settings: { fontStyle: 'italic' },
    },
    {
      scope: ['string.quoted.docstring'],
      settings: { foreground: grey, fontStyle: 'italic' },
    },
    {
      scope: ['markup.heading', 'markup.bold'],
      settings: { fontStyle: 'bold' },
    },
    {
      scope: ['markup.italic', 'markup.quote'],
      settings: { fontStyle: 'italic' },
    },
  ],
};
