import DesktopTile, {
  DesktopTileProps,
  TileBasicProps,
} from "../../DesktopTile";
import { TileLiveContent } from "../../DesktopTile/interface";

const testLiveTiles: TileLiveContent[] = [
  {
    id: "livetile_1",
    title: "LiveTile Test",
  },
  {
    id: "livetile_2",
    title: "LiveTile Test 2",
    content: "This is the content for LiveTile Test 2",
  },
  {
    id: "livetile_3",
    title: "LiveTile Test 3",
    content:
      "This is the content for LiveTile Test 3 and this is a veeeeerrry long text. ",
    bg: "https://avatars.githubusercontent.com/u/35499042?v=4",
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
    liveInt: 5000,
  };

  return <DesktopTile {...tileProps} />;
};

export default LiveTile;
