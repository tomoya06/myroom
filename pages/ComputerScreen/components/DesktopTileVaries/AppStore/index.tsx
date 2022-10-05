import { ai3jsGame, aiEasonBot, aiXiaoXiaoLe } from "../../../apps/installed";
import { AppInfo } from "../../../interface";
import DesktopTile, {
  DesktopTileProps,
  TileBasicProps,
} from "../../DesktopTile";
import "./index.scss";

const AppStoreShowcase: React.FC<{
  cover: string;
}> = (props) => {
  return (
    <div className="AppStoreShowcaseCover">
      <img src={props.cover} alt={props.cover} />
    </div>
  );
};

const AppStoreShowcaseTitle: React.FC<{ appInfo: AppInfo }> = (props) => {
  const { icon, id } = props.appInfo;
  return (
    <div className="AppStoreShowcaseTitle">
      <img src={icon} alt={id} />
      <span>{id}</span>
    </div>
  );
};

const AppStore: React.FC<TileBasicProps> = (props) => {
  const tileProps: DesktopTileProps = {
    ...props,
    lives: [
      {
        id: "wallpaper1",
        title: <AppStoreShowcaseTitle appInfo={aiXiaoXiaoLe} />,
        content: "激情三消 助力国足登顶世界杯",
        bg: "https://s2.loli.net/2022/10/04/nHVEW1s27do63Dl.png",
        elem: (
          <AppStoreShowcase cover="https://tomoya06.github.io/superhappy-xiaoxiaole/assets/xinniankuaile.b2a8d8fb.jpg" />
        ),
      },
      {
        id: "wallpaper2",
        title: <AppStoreShowcaseTitle appInfo={aiEasonBot} />,
        content: "E神：这句词我没唱过",
        bg: "https://s2.loli.net/2022/10/04/nDBkKxOiG1tlTIE.png",
        elem: (
          <AppStoreShowcase cover="https://tomoya06.github.io/easonbot/img/waiting.jpg" />
        ),
      },
      {
        id: "wallpaper3",
        title: <AppStoreShowcaseTitle appInfo={ai3jsGame} />,
        content: "指尖一点 遨游星空",
        bg: "https://s2.loli.net/2022/10/04/CZ9Jo6LSzUKXn4c.png",
      },
      // {
      //   id: "wallpaper4",
      //   bg: "https://s2.loli.net/2022/10/04/aiF3cY8tngo1leH.png",
      // },
      // {
      //   id: "wallpaper5",
      //   bg: "https://s2.loli.net/2022/10/04/Ovdtl7XhxiVkN2D.png",
      // },
    ],
    liveInt: 8000,
    delay: 3000,
  };

  return <DesktopTile {...tileProps} />;
};

export default AppStore;
