import Icon from "../components/Icons/Icon";

const help = {
  title: "How To Use",
  body: (
    <>
      <p>
        Each item in this list represents a different{" "}
        <strong>search provider</strong>.{" "}
      </p>
      <p>
        Drag and drop the search providers into the order you want them to
        appear in the search pop-up.
      </p>
      <p>Drag the items to different sections to alter their visibility:</p>
      <ul>
        <li>
          Items in the <strong>visible</strong> section will be visible whenever
          the pop-up is shown.
        </li>
        <li>
          Items in the <strong>hidden</strong> section will remain hidden until
          youhover over the pop-up.
        </li>
        <li>
          Items in the <strong>disabled</strong> section will never be visible.
        </li>
      </ul>
      <p>
        Click the <Icon type={"more"} /> <strong>more</strong> icon to change
        each search provider's settings.
      </p>
    </>
  ),
};

export default help;
