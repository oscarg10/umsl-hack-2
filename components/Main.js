
import * as views from "./views";

export default st => {
  return `
<main>
<!-- The pieces of view are now functional components - INVOKE them -->
  ${views[st.mainContent](st)}
</main>
`;
};
