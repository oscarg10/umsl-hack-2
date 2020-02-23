

// 'Destructoring' each of the named components from the components directories.
import { Header, Nav, Main, Footer } from "./components";

// this is a node_moduleso we don't include './'
import * as state from "./store";

import capitalize from "lodash.capitalize";

import Navigo from "navigo";

import axios from "axios";

//import { db } from "./firebase";

const router = new Navigo(location.origin);

console.log(router);
if (!location.pathname.slice(1) === "") {
  render(state[capitalize(location.pathname.slice(1))]);
}
/**
 *
 * @param {Object} st - a piece of state
 */

function render(st = state.Home) {
  //Query the document using a CSS selector
  document.querySelector("#root").innerHTML =
    //INVOKE each FUNCTIONAL COMPONENT passing in a piece of state each time.
    `
${Header(st)}
${Nav(state.Links)}
${Main(st)}
${Footer(st)}
`;

  // router.updatePageLinks();
  //TODO: Listen for clicks on our menu and log what was clicked on.
}

router
  //'on' is navigo's way of handling a specific type of event

  .on(":page", params => {
    render(state[capitalize(params.page)]);
  })
  .on("/", () => render())
  //resolve is required for all navigo methods
  .resolve();

//Axios simplifies the 'fetch' process
axios
  .get("https://jsonplaceholder.typicode.com/posts")
  //then grab the results and convert to json
  .then(results => {
    state.Blog.posts = results.data;
    /**
     * Slice off the slash from 'url'
     * Capitalize the result
     * If it is 'Blog', then render the new post
     */
    if (capitalize(router.lastRouteResolved().url.slice(1)) === "Blog") {
      render(state.Blog);
    }
  }) //Include a catch for basic error handling when working with promises
  .catch(error => console.error(error));

axios
  // We GET from a RESTful
  .get("https://jsonplaceholder.typicode.com/photos")
  .then(photos => {
    photos.data.forEach(photo =>
      db
        .collection("pics")
        .add(photo)
        .then(() => console.log("Added pic"))
        .catch(error => console.error(error))
    );
  });
//then grab the results and convert to json
db.collection("pics")
  .get()
  .then(querySnapshot => {
    querySnapshot.forEach(pic => state.Gallery.pics.push(pic.data()));
    if (capitalize(router.lastRouteResolved().url.slice(1)) === "Blog") {
      render(state.Blog);
    }
  })
  .catch(error => console.error(error));