import DesktopTile, {
  DesktopTileProps,
  TileBasicProps,
} from "../../DesktopTile";
import { useEffect, useState } from "react";
import { randInt } from "three/src/math/MathUtils";
import randomItem from "random-item";
import { WeatherTextName } from "./util";
import delay from "delay";
import { TileLiveContent } from "../../DesktopTile/interface";
import "./index.scss";

const CityList = [
  "Zhanjiang|Guangdong, China|101281001",
  "Guangzhou|Guangdong, China|101280101",
  "Shanghai|China|101020100",
  "New York|United States|1E98E",
];

interface DisplayWeather {
  cityName: string;
  cityDistrict: string;
  weatherData: {
    tempCur: number;
    tempLo: number;
    tempHi: number;
    text: string;
  };
}

const renderWeatherTile = (weather: DisplayWeather) => {
  const { cityName, cityDistrict, weatherData } = weather;

  const iconname = weatherData.text.toLowerCase().replaceAll(" ", "-");

  return (
    <div className="WeatherTile">
      <div className="WeatherTileIcon">
        <i className={`qi-${iconname}-fill`}></i>
      </div>
      <div className="WeatherTileData">
        <div className="WeatherTileCity">{cityName}</div>
        <div className="WeatherTileDistrict">{cityDistrict}</div>
        <div className="WeatherTileWeather">
          <div className="text">{weatherData.text}</div>
          <div className="temp">{weatherData.tempCur}°C</div>
          <div className="tempRange">
            {weatherData.tempLo}°C ~ {weatherData.tempHi}°C
          </div>
        </div>
      </div>
    </div>
  );
};

const NotWeatherTile: React.FC<TileBasicProps> = (props) => {
  const [weathers, setWeathers] = useState<DisplayWeather[]>([]);

  const loadWeatherData = async () => {
    const randomDelay = randInt(500, 3000);
    await delay(randomDelay);

    const output: DisplayWeather[] = CityList.map((city) => {
      const [cityName, cityDistrict] = city.split("|");

      const tempLo = randInt(-40, 30);
      const tempHi = randInt(tempLo, tempLo + 30);
      const tempCur = randInt(tempLo, tempHi);
      const text = randomItem(WeatherTextName);

      return {
        cityName,
        cityDistrict,
        weatherData: {
          tempLo,
          tempHi,
          tempCur,
          text,
        },
      };
    });

    setWeathers(output);
  };

  useEffect(() => {
    loadWeatherData();
  }, []);

  const lives: TileLiveContent[] = weathers.map((weather) => {
    return {
      id: weather.cityName,
      elem: renderWeatherTile(weather),
    };
  });
  lives.unshift({
    id: "NotWeather_hint",
    title: "This is Not A Weather App",
    content:
      "All weather data here are fake. But you can always trust QWeather.com/ .",
  });

  const tileProps: DesktopTileProps = {
    ...props,
    lives,
    liveInt: 5000,
    onLoopEnd: loadWeatherData,
  };

  return <DesktopTile {...tileProps} />;
};

export default NotWeatherTile;
