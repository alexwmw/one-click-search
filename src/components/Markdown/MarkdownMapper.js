import clsx from "clsx";
import Markdown from "markdown-to-jsx";

const MarkdownMapper = ({ classes, mdArray }) => {
  let key = 0;

  return (
    <div className={clsx("markdown-container", classes)}>
      {mdArray.map((text) => {
        return (
          <Markdown className={"markdown"} key={key++}>
            {text}
          </Markdown>
        );
      })}
    </div>
  );
};

export default MarkdownMapper;
