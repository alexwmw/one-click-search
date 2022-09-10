function Img(props) {
  return (
    <img
      onError={({ currentTarget }) => {
        currentTarget.onerror = null; // prevents looping
        currentTarget.src = chrome.runtime.getURL("/icons/broken-link.png");
      }}
      {...props}
    />
  );
}

export default Img;
