# Atomic Design

We follow [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) by
[Brad Frost](https://bradfrost.com/).
Read [the book](https://atomicdesign.bradfrost.com/table-of-contents/) online.

## Extending atomic design

Since atomic design is just a concept and very simple, often too simple for large scale projects we
decided to extend it. To have a valid reasoning for the names we looked at
[Extending Atomic Design](https://bradfrost.com/blog/post/extending-atomic-design/).

We decided to add, ions to allow design-tokens, utility functions or similar.

One of the reasons we love Atomic Design is the ability to add new levels without breaking the
[methodology](https://atomicdesign.bradfrost.com/chapter-2/).

## Ions

Ions are entities that are too small to render or just deliver logic.  

**Good examples are:**

* constants
* contexts
* hooks
* design-tokens
* utility functions

## Atoms

Atoms are components that don't have any smaller component in them. They can use
[HTML elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Element) or [Ions](#ions).

**Good examples are:**

* Buttons
* Icons
* Input elements
* Input labels
* Links

## Molecules

Molecules are components that have one or more [Atoms](#atoms) and or smaller atomic entities.

**Good examples are:**

* Searchbar with Input, Button and Label
* Menu with Links

## Organisms

Organisms contain one or more [Organisms](#organisms) and or smaller atomic entities.

**Good examples are:**

* Header with Searchbar, Logo and Menu


## Templates 

Templates provide render and layout logic that changes based on data.

## Pages

Pages are the entry point of a user. A page will collect data from the server or another source, 
choose a template and render and fill it with data. 
In our case pages will be used by [next.js](https://nextjs.org/docs/basic-features/pages). We love
how nicely this fits into our structure.



