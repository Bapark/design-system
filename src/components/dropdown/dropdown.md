```js
const ExampleChild = () => {
    return <h1>Example</h1>;
};
const ExampleButton = () => {
    return <button>hit me</button>;
};

<Dropdown content={ExampleButton} open={true} dropdownContent={ExampleChild} >
</Dropdown>
```
