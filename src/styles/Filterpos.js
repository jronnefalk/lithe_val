import { KursContWrapper } from "./Container.styled";

const kursContWrapper = document.querySelector(
  `#${KursContWrapper.styledComponentId}`
);

const kursContWrapperRect = kursContWrapper.getBoundingClientRect();
const kursContWrapperTop = kursContWrapperRect.top;
const kursContWrapperHeight = kursContWrapperRect.height;

const percentageFromTop = (kursContWrapperTop / window.innerHeight) * 100;

export { percentageFromTop, kursContWrapperHeight as KursContWrapperHeight };
