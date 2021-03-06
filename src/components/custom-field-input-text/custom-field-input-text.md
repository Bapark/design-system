The Custom Field Input Text component represents the UI for a custom field of type text from Mavenlink's API.
It is also used as the basis for the Custom Field Input Number components (and probably others).
It has no underlying validations besides developer intent (see Error example for more information).

##### Basic usage:

```js
<CustomFieldInputText
  id="basic-test-1"
  label="Example 1"
/>
```

```js
<CustomFieldInputText
  defaultValue="This uses an uncontrolled value"
  id="basic-test-2"
  label="Example 1"
/>
```

```js
<CustomFieldInputText
  id="basic-test-3"
  label="Example 1"
  value="This uses a controlled value"
/>
```

##### Disabled state:

```js
<CustomFieldInputText
  disabled
  defaultValue="This value cannot be changed"
  id="test-id-2"
  label="Example 2"
/>
```

##### Errored state:

The `errorText` property indicates the error state of the component.
The underlying `input` element will be invalid due to the custom error provided.

```js
<CustomFieldInputText
  errorText="Custom error message here."
  id="test-id-3"
  label="Example 3"
/>
```
----
##### Ref usage:

All CustomFieldInput* use `forwardRef` and `useImperativeHandle` to provide an API similar to the DOM native for determining their value.
Below is an example of this usage:

```jsx
function TestComponent() {
  const inputRef = React.useRef(null);
  const [value, setValue] = React.useState('');

  const onChange = () => {
    setValue(inputRef.current.value);
  }

  return (
    <div>
      <CustomFieldInputText
        id="test-id-4"
        label="Example 4"
        onChange={onChange}
        ref={inputRef}
      />
      <span>Value is: {value}</span>
    </div>
  )
}

<TestComponent />
```
