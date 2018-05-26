# sass

This is the foundation of all Lurka's styles. There are two main sections:

#### core
Contains core styles that transpile to CSS. Imported once in `app/index.jsx`

#### utils
Contains sass abstractions that do not transpile to CSS.

These utils are then imported throughout Lurka to create custom styles using shared code.

## variables.sass
Contains CSS4 colors, layout dimensions and other shared variables.
