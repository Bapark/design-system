The `CustomFieldInputMultipleChoice` component represents the UI for a custom field of type multi choice from Mavenlink's API.
Its accessibility interactions are inherited from [`TagList`](#/Components/TagList) and [`Tag`](#/Components/Tag) components.

### Default examples

```jsx
<CustomFieldInputMultipleChoice
  id="123"
  label="This custom field has a lot of choices"
  value={[
    { id: '1', label: 'combobox (composite role)' },
    { id: '2', label: 'grid (composite role)' },
    { id: '3', label: 'listbox (composite role)' },
    { id: '4', label: 'menu (composite role)' },
    { id: '5', label: 'menubar (composite role)' },
    { id: '6', label: 'radiogroup (composite role)' },
    { id: '7', label: 'tablist (composite role)' },
    { id: '8', label: 'tree (composite role)' },
    { id: '9', label: 'treegrid (composite role)' },
  ]}
/>
```

### Read-only examples

```jsx
<CustomFieldInputMultipleChoice
  id="234"
  label="This custom field is read-only"
  readOnly
  value={[
    { id: '1', label: 'First Choice' },
    { id: '2', label: 'Second Choice' },
    { id: '3', label: 'Third Choice' },
  ]}
/>
```