import { withInfo } from '@storybook/addon-info';
import { withOptions } from '@storybook/addon-options';
import { addDecorator, configure } from '@storybook/react';

addDecorator(withInfo);

addDecorator(withOptions({
  name: 'Mavenlink Design System',
  url: 'https://mavenlink.design',
  addonPanelInRight: true,
}));

function loadStories() {
  const req = require.context('../src/components', true, /\-story\.jsx$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
