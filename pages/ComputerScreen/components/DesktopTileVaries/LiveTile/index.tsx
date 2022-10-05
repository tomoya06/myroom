import DesktopTile, {
  DesktopTileProps,
  TileBasicProps,
} from "../../DesktopTile";
import { TileLiveContent } from "../../DesktopTile/interface";

const testLiveTiles: TileLiveContent[] = [
  {
    id: "livetile_1",
    title: "LiveTile",
    content: "This app helps you nothing. Why not read some TrashBlog?",
  },
  {
    id: "livetile_2",
    title: "User Guide",
    content: "Use your hands. Nothing will explode. ",
  },
  {
    id: "livetile_4",
    elem: (
      <div>
        <h1>HELLO WORLD</h1>
        <h2>Welcome to Metro UI</h2>
      </div>
    ),
    bg: "https://avatars.githubusercontent.com/u/35499042?v=4",
  },
];

const LiveTile: React.FC<TileBasicProps> = (props) => {
  const tileProps: DesktopTileProps = {
    ...props,
    lives: testLiveTiles,
    liveInt: 10500,
    delay: 2000,
  };

  return <DesktopTile {...tileProps} />;
};

export default LiveTile;
