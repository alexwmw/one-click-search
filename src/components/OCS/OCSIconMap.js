import OCSIcon from "./OCSicon";

const OCSIconMap = ({
  text,
  providers,
  onIconClick,
  linkTarget,
  allowTitles,
}) => {
  const icons = providers.map((provider) => {
    return (
      <OCSIcon

        onIconClick={onIconClick}
        provider={provider}
        key={provider.name}
        text={text}
        visibility={provider.visibility}
        linkTarget={linkTarget}
        allowTitles={allowTitles}
      />
    );
  });

  return <>{icons}</>;
};

export default OCSIconMap;
