// function createListHTML(links) {
//     //Use join to change the array and make it a string separated by spaces
//     return links
//       .map(
//         link =>
//           `<li class ="button"><a href="./${link.toLowerCase()}/" data-navigo>${link}</a></li>`
//       )
//       .join(" ");
//   }
  
  export default st => `
  <nav>
  <ul class="flex justify-space-around">
    ${"LastCall"}
  </ul>
  </nav>
  `;