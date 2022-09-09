import { useContext,createContext } from "react";
import { ReportContextModel } from "../interface/ReportInterface";

const ReportContext = createContext({} as ReportContextModel);

export default ReportContext