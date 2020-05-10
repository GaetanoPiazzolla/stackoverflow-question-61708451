import {Component, OnInit} from '@angular/core';

// no need to import minified files here as the bundling process will take care of that
import * as CanvasJS from '../../node_modules/canvasjs/dist/canvasjs';
import {Chart} from '../../node_modules/canvasjs/dist/canvasjs';

import * as _ from '../../node_modules/underscore/underscore';
import {sample} from '../../node_modules/underscore/underscore';

// JQUERY is impossible to import as it's not a module but a factory and not the actual jQuery object.
// import * as $ from '../../node_modules/jquery/dist/jquery.js;

// so we can add it to angular.json "script" field: https://angular.io/guide/workspace-config
// "An object containing JavaScript script files to add to the global context of the project."
// and then we can use it like this:
// declare var $: any;
// https://dzone.com/articles/quick-tip-%E2%80%93-typescript-declare

// still, the correct approach is to use the @types for jquery and then we can use ti like this
// https://www.angularjswiki.com/angular/how-to-install-and-use-jquery-in-angular-projects/
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  title = 'library';

  chart;
  chartFull;

  randomNumber;
  randomNumberFull;

  constructor() {
  }

  ngOnInit() {

    const dataPoints = [
      {y: 71},
      {y: 55},
      {y: 50}
    ];

    const obj = {
      title: {
        text: 'Example import JS Library'
      },
      data: [{
        type: 'column',
        dataPoints // <- https://eslint.org/docs/rules/object-shorthand
      }]
    };

    // In the library canvas.js there is "exports.Chart = Chart"; at line 13795
    // https://www.tutorialsteacher.com/nodejs/nodejs-module-exports:
    // The module.exports or exports is a special object which is included in every JS file in the Node.js application by default.
    // module is a variable that represents current module and exports is an object that will be exposed as a module.
    // So, whatever you assign to module.exports or exports, will be exposed as a module.
    this.chart = new Chart('chartContainer', obj);
    this.chart.render();

    // we can do the same thing importing the full library (*) and using the single method
    this.chartFull = new CanvasJS.Chart('chartContainerModule', obj);
    this.chartFull.render();

    // also underscore.js do work!
    // at line 2, there is this call :
    // module.exports = factory()
    // factory is the method called by an IIFE https://developer.mozilla.org/en-US/docs/Glossary/IIFE
    // at line 10 which will export all the methods inside
    const array = [1, 2, 3, 4, 5, 6];

    this.randomNumber = sample(array);
    // we can do the same thing importing the full library (*) and using the single method
    this.randomNumberFull = _.sample(array);

    $('#colored').css('background-color', 'red');

  }

}
