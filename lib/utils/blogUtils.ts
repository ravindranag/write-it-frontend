import { OutputData } from "@editorjs/editorjs";
import { readingTime } from "reading-time-estimator";

export const getReadingTimeEstimate = (data: OutputData) => (readingTime(JSON.stringify(data))).text