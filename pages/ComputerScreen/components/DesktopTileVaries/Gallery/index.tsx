import DesktopTile, {
  DesktopTileProps,
  TileBasicProps,
} from "../../DesktopTile";

const Gallery: React.FC<TileBasicProps> = (props) => {
  const tileProps: DesktopTileProps = {
    ...props,
    lives: [
      {
        id: "wallpaper1",
        bg: "https://s2.loli.net/2022/10/04/aiF3cY8tngo1leH.png",
      },
      {
        id: "wallpaper2",
        bg: "https://s2.loli.net/2022/10/04/nDBkKxOiG1tlTIE.png",
      },
      {
        id: "wallpaper3",
        bg: "https://s2.loli.net/2022/10/04/CZ9Jo6LSzUKXn4c.png",
      },
      {
        id: "wallpaper4",
        bg: "https://s2.loli.net/2022/10/04/nHVEW1s27do63Dl.png",
      },
      {
        id: "wallpaper5",
        bg: "https://s2.loli.net/2022/10/04/Ovdtl7XhxiVkN2D.png",
      },
    ],
    liveInt: 8000,
  };

  return <DesktopTile {...tileProps} />;
};

export default Gallery;
