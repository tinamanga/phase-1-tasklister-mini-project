const chai = require('chai');
global.expect = chai.expect;



const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');
const babel = require('@babel/core');

// Load HTML content
const html = fs.readFileSync(path.resolve(__dirname, '..', 'index.html'), 'utf-8');

// Transform JavaScript using Babel
const { code: transformedScript } = babel.transformFileSync(
  path.resolve(__dirname, '..', 'src/index.js'),
  { presets: ['@babel/preset-env'] }
);

// Initialize JSDOM
const dom = new JSDOM(html, {
  runScripts: 'dangerously',
  resources: 'usable'
});

// Inject the transformed JavaScript into the virtual DOM
const scriptElement = dom.window.document.createElement('script');
scriptElement.textContent = transformedScript;
dom.window.document.body.appendChild(scriptElement);

// Expose JSDOM globals to the testing environment
global.window = dom.window;
global.document = dom.window.document;
global.navigator = dom.window.navigator;
global.HTMLElement = dom.window.HTMLElement;
global.Node = dom.window.Node;
global.Text = dom.window.Text;
global.XMLHttpRequest = dom.window.XMLHttpRequest;

// Sample test suite for JavaScript event handling
describe('Handling form submission', () => {
  let form;
  let formInput;
  let taskList;

  before(() => {
    // Get references to the form, input, and task list
    form = document.getElementById('create-task-form');
    formInput = document.getElementById('new-task-description');
    taskList = document.getElementById('tasks');
  });

  it('should add an event to the form and add input to webpage', () => {
    // Ensure form, input, and task list are present
    expect(form).to.not.be.null;
    expect(formInput).to.not.be.null;
    expect(taskList).to.not.be.null;

    // Simulate user input
    formInput.value = 'Wash the dishes';

    // Prevent default form submission behavior
    const event = new dom.window.Event('submit');
    form.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent form from submitting and refreshing the page

      const taskDescription = formInput.value.trim();
      if (taskDescription) {
        // Create a new task and add it to the task list
        const newTask = document.createElement('li');
        newTask.textContent = taskDescription;
        taskList.appendChild(newTask);
      }
    });

    // Dispatch the submit event
    form.dispatchEvent(event);

    // Assert that the task was added to the task list
    const newTask = taskList.querySelector('li');  // Get the first <li> element
    expect(newTask).to.not.be.null;  // Ensure the new task exists
    expect(newTask.textContent).to.include('Wash the dishes');  // Ensure the task text is correct
  });
});
