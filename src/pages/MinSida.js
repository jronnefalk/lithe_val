import getData from "../functions/getData";
import Kurs from "../components/Kurs";
import { v4 as uuidv4 } from "uuid"; // Key generator for React komponenter

export function MinSida() {
  const kurs = "TSBK38";
  const getCourseData = getData(kurs);

  return (
    <div>
      <h1>My Courses</h1>
      <div>
        {getCourseData.map((kurs) => (
          <Kurs key={uuidv4()} kursdata={kurs} />
        ))}
      </div>
    </div>
  );
}
