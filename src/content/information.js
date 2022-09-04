import Markdown from "markdown-to-jsx";

const md = `

  ### About this extension
  ### Adding a new provider

  Here is some text:

  - And here are
  - A couple of bullet points

  \n\n

  ### The GoTo function

  Here is some text:

  - And here are
  - A couple of bullet points

  \n\n

  ### The GoTo function

  Here is some text:

  - And here are
  - A couple of bullet points

  \n\n

`;

const information = <Markdown>{md}</Markdown>;

export default information;
