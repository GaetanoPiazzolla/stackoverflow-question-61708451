# Question

I use Angular with vanillajs libraries. There is no problem. Library works fine, but most of the time, I have to do the following

declare var MyLib: any;
However, for this particular library (CanvasJS), this works...

import * as CanvasJS from '../../assets/canvasjs/canvasjs.min.js';
What's different, and most importantly how does the library allow import function directly?

# Answer

The difference is inside the JS library that you are importing.
In this repository I've added a showcase using canvasJs, underscoreJs and Jquery.

Only the latter has the need to be defined as a "script" inside the angular.json file ( or inside the index.html file, it's the same ) because it's not defined as an exportable object but it's a factory which adds to the global context the variable $ when initialized.
So in this case, you don't need to IMPORT it, you just have to "declare" the already present variable in the context to not have TypeScript errors!

As a bonus, the correct way to use JQuery inside an angular project is to install jquery @types, you can find it in the branch correctJquery.
