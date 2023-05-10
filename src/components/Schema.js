//Style
import {
  SchemaKursInfoCont,
  SchemaKurserCont,
  TerminWrapperSchema,
} from "../styles/Container.styled";
import { InfoTitel, PeriodSchema } from "../styles/Text.styled";

import KursSchema from "./KursSchema";

export default function Schema(props) {
  return (
    <>
      {props.FireBaseData.length > 0 &&
        [7, 8, 9].map((termin) => (
          <TerminWrapperSchema key={termin}>
            <InfoTitel>Termin {termin}</InfoTitel>
            {[1, 2].map((period) => (
              <>
                <PeriodSchema>Period {period}</PeriodSchema>
                <SchemaKurserCont key={period}>
                  {props.FireBaseData.filter(
                    (kurs) =>
                      props.courseData[kurs.kurskod]?.termin ===
                        String(termin) &&
                      (String(props.courseData[kurs.kurskod]?.period[0]) ===
                        String(period) ||
                        String(props.courseData[kurs.kurskod]?.period[1]) ===
                          String(period))
                  )
                    .sort(
                      (a, b) =>
                        props.courseData[a.kurskod].block[0] -
                        props.courseData[b.kurskod].block[0]
                    ) // Sort the items by block number
                    .map((kurs) => (
                      <SchemaKursInfoCont>
                        <KursSchema
                          courseData={props.courseData[kurs.kurskod]}
                          handleDelete={props.handleDelete}
                          handleMove={props.handleMove}
                          kurs={kurs}
                        />
                      </SchemaKursInfoCont>
                    ))}
                </SchemaKurserCont>
              </>
            ))}
          </TerminWrapperSchema>
        ))}
    </>
  );
}
