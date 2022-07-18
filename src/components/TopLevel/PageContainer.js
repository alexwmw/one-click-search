import IconsPage from "../IconsPage/IconsPage";
import ControlsPage from "../ControlsPage/ControlsPage";

function ColorPage() {
  return (
    <ul
      id={"colorPage"}
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "15px",
        flex: 1,
      }}
    >
      <li>@P1</li>
      <li>@P2</li>
      <li>@P3</li>
      <li>@A1</li>
      <li>@A2</li>
      <li>@A3</li>
      <li>@D1</li>
      <li>@D2</li>
      <li>@D3</li>
      <li>@L1</li>
      <li>@L2</li>
      <li>@L3</li>
      <li>@Success</li>
      <li>@Danger</li>
      <li>@Warning</li>
      <li>@Info</li>
    </ul>
  );
}

function PageContainer({ tabNames, selectedTab }) {
  return (
    <div className={"flex-container"} id="pageContainer">
      {selectedTab == tabNames.icons && <IconsPage />}
      {selectedTab == tabNames.controls && <ControlsPage />}
      {selectedTab == tabNames.color && <ColorPage />}
    </div>
  );
}

export default PageContainer;
