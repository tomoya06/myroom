import { useEffect, useState } from "react";
import { ai3jsGame, aiEasonBot, aiXiaoXiaoLe } from "../../../apps/installed";
import { AppInfo } from "../../../interface";
import DesktopTile, {
  DesktopTileProps,
  TileBasicProps,
} from "../../DesktopTile";
import { TileLiveContent } from "../../DesktopTile/interface";
import "./index.scss";
import { preloadManager } from "../../../../../src/utils/image";

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

const livesImages = [
  [
    "https://s2.loli.net/2022/10/04/nHVEW1s27do63Dl.png",
    "https://tomoya06.github.io/superhappy-xiaoxiaole/assets/xinniankuaile.b2a8d8fb.jpg",
  ],
  [
    "https://s2.loli.net/2022/10/04/nDBkKxOiG1tlTIE.png",
    "https://tomoya06.github.io/easonbot/img/waiting.jpg",
  ],
  ["https://s2.loli.net/2022/10/04/CZ9Jo6LSzUKXn4c.png"],
];

const AppStore: React.FC<TileBasicProps> = (props) => {
  const [lives, setLives] = useState<TileLiveContent[]>();

  const loadlives = async () => {
    await preloadManager(livesImages.flat());
    setLives([
      {
        id: "wallpaper1",
        title: <AppStoreShowcaseTitle appInfo={aiXiaoXiaoLe} />,
        content: "激情三消 助力国足登顶世界杯",
        bg: livesImages[0][0],
        elem: <AppStoreShowcase cover={livesImages[0][1]} />,
      },
      {
        id: "wallpaper2",
        title: <AppStoreShowcaseTitle appInfo={aiEasonBot} />,
        content: "E神：这句词我没唱过",
        bg: livesImages[1][0],
        elem: <AppStoreShowcase cover={livesImages[1][1]} />,
      },
      {
        id: "wallpaper3",
        title: <AppStoreShowcaseTitle appInfo={ai3jsGame} />,
        content: "指尖一点 遨游星空",
        bg: livesImages[2][0],
      },
    ]);
  };

  useEffect(() => {
    loadlives();
  }, []);

  const tileProps: DesktopTileProps = {
    ...props,
    lives,
    liveInt: 8000,
    delay: 3000,
  };

  return <DesktopTile {...tileProps} />;
};

export default AppStore;
