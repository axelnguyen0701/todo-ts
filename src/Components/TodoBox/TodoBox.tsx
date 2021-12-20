import React from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import UndoOutlineIcon from "@mui/icons-material/UndoOutlined";
import { Todo } from "../../logic/Todo";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    warning: {
      main: "#D4CC7F",
      contrastText: "#fff",
    },
  },
});

type TodoBoxTypes = Todo & {
  handleDeleteTodo: (todo: Todo) => void;
  handleToggleDone: (todo: Todo) => void;
};

export default function TodoBox({
  id,
  text,
  done,
  location,
  handleDeleteTodo,
  handleToggleDone,
}: TodoBoxTypes) {
  const handleDeleteButton = (event: React.MouseEvent<HTMLElement>) => {
    handleDeleteTodo({ id, text, done });
  };
  const handleDoneButton = (event: React.MouseEvent<HTMLElement>) => {
    handleToggleDone({ id, text, done });
  };

  const renderDoneButton = () => {
    if (!done) {
      return (
        <IconButton
          aria-label="done"
          size="large"
          color="success"
          onClick={handleDoneButton}
        >
          <DoneOutlineIcon fontSize="inherit" />
        </IconButton>
      );
    }
    return (
      <ThemeProvider theme={theme}>
        <IconButton
          aria-label="undone"
          size="large"
          color="warning"
          onClick={handleDoneButton}
        >
          <UndoOutlineIcon fontSize="inherit" />
        </IconButton>
      </ThemeProvider>
    );
  };

  const renderedLocation = () => {
    location = location || "";
    if (/home/i.test(location)) {
      return "🏠 Home";
    }
    if (/work/i.test(location)) {
      return "🏢 Work";
    }
    return "📍" + location;
  };

  return (
    <Box
      bgcolor={done ? "#C0FFC7" : "#DFFBFF"}
      border={1}
      borderColor={"white"}
      boxShadow={3}
      px={3}
      py={2}
      mt={5}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"start"}
      minWidth={{ xs: "75%", md: "30%" }}
    >
      <Typography>{text}</Typography>
      <Box display="flex" minWidth={"100%"} justifyContent={"space-between"}>
        <Typography mt={1} p={2} component={"h4"} variant={"subtitle2"}>
          {renderedLocation()}
        </Typography>
        <div>
          <IconButton
            aria-label="delete"
            size="large"
            color="error"
            onClick={handleDeleteButton}
          >
            <DeleteOutlineIcon fontSize="inherit" />
          </IconButton>
          {renderDoneButton()}
        </div>
      </Box>
    </Box>
  );
}
