/* eslint-disable import/no-commonjs */

const fs = require('fs');
const path = require('path');
const stylelint = require('stylelint');

const spacing = fs.readFileSync(path.join(__dirname, '..', 'styles', 'spacing.css'), 'UTF-8');
const cssVarRegex = /--[a-z0-9-]+/g;
const validSpacingSettings = spacing.match(cssVarRegex);

const cssValueRegex = /[0-9]+px/g;
const valueKeys = spacing.match(cssValueRegex);

const ruleName = 'mds/spacing';
const url = 'https://mavenlink.github.io/design-system/master/#/Brand%20Identity/Spacing';

function zip(obj, value, index) {
  return { ...obj, [value]: validSpacingSettings[index] };
}
const fixmap = valueKeys.reduce(zip, {});

const messages = stylelint.utils.ruleMessages(ruleName, {
  rejected: `To promote design consistency: use MDS spacing variables for margin and padding.
This rule can always be auto fixed with the --fix option.
Ie. ${JSON.stringify(fixmap)} For more info, see: ${url}.
If you are using a spacing value that is close to the MDS variable value please consider using the MDS value.`,
});

const properties = [
  'margin',
  'margin-top',
  'margin-right',
  'margin-bottom',
  'margin-left',
  'padding',
  'padding-top',
  'padding-right',
  'padding-bottom',
  'padding-left',
];

const fixes = [];

module.exports = stylelint.createPlugin(ruleName, (primary, secondary, context) => {
  return (root, result) => {
    root.walkDecls((declaration) => {
      const property = declaration.prop;

      if (properties.includes(property)) {
        const valueTokens = declaration.value.split(' ');

        const includesCalc = declaration.value.includes('calc');
        if (includesCalc) {
          return;
        }

        const validSpacingValue = valueTokens.every((token) => {
          const includesSpacingVariable = validSpacingSettings.find((spacingVariable) => {
            return token.includes(`var(${spacingVariable})`);
          });
          return includesSpacingVariable || token === '0' || !Object.keys(fixmap).includes(token);
        });

        if (!validSpacingValue) {
          const currentValue = declaration.value;

          const fixable = currentValue.split(' ').some(value => fixmap[value]);

          if (context.fix && fixable) {
            const valueToFix = currentValue.split(' ').map((value) => {
              const fixedValue = fixmap[value];
              return fixedValue ? `var(${fixedValue})` : value;
            }).join(' ');
            fixes.push([declaration, valueToFix]);

            let shouldImport = true;
            try {
              require.resolve('@mavenlink/design-system');
            } catch (e) {
              shouldImport = false;
            }

            const importString = '@import \'@mavenlink/design-system/src/styles/spacing.css\';';
            if (!root.toString().includes(importString) && shouldImport) {
              root.prepend(importString);
            }
          } else {
            const violation = { ruleName, node: declaration, result };
            stylelint.utils.report({ ...violation, message: messages.rejected });
          }
        }
      }
    });

    // eslint-disable-next-line prefer-arrow-callback
    return new Promise(function (resolve) {
      // eslint-disable-next-line prefer-arrow-callback
      setTimeout(function () {
        // console.log(fixes);
        // eslint-disable-next-line prefer-arrow-callback
        fixes.forEach(function (fixTuple) {
          // eslint-disable-next-line no-param-reassign
          fixTuple[0].value = fixTuple[1];
        });
        resolve();
      }, 1);
    });
  };
});

module.exports.ruleName = ruleName;
module.exports.targetedProperties = properties;
