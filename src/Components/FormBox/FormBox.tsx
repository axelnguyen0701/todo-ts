import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import { Todo } from "../../logic/Todo";

const theme = createTheme({
  palette: {
    neutral: {
      main: "#80D47F",
      contrastText: "#fff",
    },
  },
});

declare module "@mui/material/styles" {
  interface Palette {
    neutral: Palette["primary"];
  }
  // allow configuration using `createTheme`
  interface PaletteOptions {
    neutral?: PaletteOptions["primary"];
  }
}

// Update the Button's color prop options
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}

interface FormBoxProps {
  handleAddTodo: (todo: Todo) => void;
  lastId: number;
}

export default function FormBox({
  handleAddTodo: addTodo,
  lastId,
}: FormBoxProps) {
  const [value, setValue] = React.useState("");
  const [location, setLocation] = React.useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    addTodo({ id: lastId + 1, text: value, done: false, location });
    setValue("");
    setLocation("");
  };

  return (
    <Box
      id="form-box"
      component="form"
      noValidate
      bgcolor={"#b6e6e9"}
      boxShadow={3}
      px={3}
      py={2}
      mt={5}
      display={"flex"}
      flexDirection={"column"}
      alignItems={"center"}
      minWidth={{ xs: "75%", md: "30%" }}
    >
      <TextField
        id="todo-content"
        multiline
        placeholder="Type here"
        fullWidth
        sx={{ bgcolor: "#DFFBFF" }}
        value={value}
        onChange={handleInputChange}
        maxRows={4}
      />
      <Box display="flex" minWidth={"100%"} justifyContent={"space-between"}>
        <TextField
          id="todo-location"
          placeholder="Location"
          sx={{ bgcolor: "#DFFBFF", mt: 1, maxWidth: 100 }}
          value={location}
          onChange={handleLocationChange}
        />
        <ThemeProvider theme={theme}>
          <Button
            variant="contained"
            onClick={handleButtonClick}
            color="neutral"
            sx={{ border: 1, my: "auto", height: 40 }}
          >
            Add
          </Button>
        </ThemeProvider>
      </Box>
    </Box>
  );
}
