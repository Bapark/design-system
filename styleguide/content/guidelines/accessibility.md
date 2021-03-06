Accessibility is important to our customers and our business. These guidelines serve as a baseline that we intend to meet for all features, and are based off of a [great article by Pablo Stanley](https://uxdesign.cc/designing-for-accessibility-is-not-that-hard-c04cc4779d94).

## **Guidelines**

- **Add enough color contrast**

  Color contrast between text and its background should be at least 4.5 to 1. Larger and heavier fonts (18pt or bold 14pt) can have 3 to 1.

- **Don't use color alone to make critical information understandable**

  Not all users can see or perceive the difference between colors. Other indicators such as icons, labels, and patterns should be used to indicate when things are different, important, or prompting a response.

- **Design and implement usable focus states**

  People using their keyboards to navigate the site must have some visual indication of what element on the page has focus. Do not remove focus outlines - they're there for good reason!

- **Use labels with form fields and inputs**

  Form fields must have be labelled in some way (normally through a label element, but there are alternatives), so that screen readers can understand them. Placeholder text is not enough, and is usually low contrast and hard to read.

- **Write useful alternative text for your images and other non-text content**

  Images and other non-text content are not inherently available to people using screen readers. We must provide alternative text for them. Most of the time this is done within the alt attribute, but there are alternatives.

  Also, if the image is purely decorative or if the alternative text would be redundant because surrounding context already describes it, use alt="" so that screen readers skip it.

- **Use correct markup on your content**

  The web is inherently accessible, and native HTML elements are already accessible.

  For example, h elements are intended to describe the hierarchy of our page, and using them correctly greatly aids in the ability of screen readers to quickly navigate our site.

- **Support keyboard navigation**

  Many of our customers - with and without disabilities - use the keyboard to navigate and use our app. All functionality of our site should be achievable through keyboard use only. Generally speaking, tab should move through links, fields, and widgets, and enter should trigger some action.

## **References**

- [Designing for Accessibility is Not That Hard](https://uxdesign.cc/designing-for-accessibility-is-not-that-hard-c04cc4779d94) -- Article where these guidelines came from.
- [WCAG 2.0 Level AA](https://www.w3.org/WAI/WCAG21/quickref/?versions=2.0&currentsidebar=%23col_overview&levels=aaa) -- General accessibility standard that we aspire to achieve.
- [WAI-ARIA Authoring Practices 1.1](https://www.w3.org/TR/wai-aria-practices-1.1/) -- Specifications for various widgets/controls
- [Writing HTML with Accessibility in Mind](https://medium.com/alistapart/writing-html-with-accessibility-in-mind-a62026493412) -- Nice introduction to accessibility.
- [9 Tips to Get the Bare Minimum of Web Accessibility](https://medium.com/@realabhijeet4u/9-tips-to-get-bare-minimum-of-web-accessibility-739899a9437c) -- Another nice introduction, with links to a lot of tooling that we can use.
