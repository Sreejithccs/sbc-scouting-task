import { AlertColor } from "@mui/material";

export interface AlertMessage {
  severity?: AlertColor;
  title?: string;
  message?: string;
}
