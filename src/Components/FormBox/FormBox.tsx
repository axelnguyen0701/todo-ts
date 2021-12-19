import React from "react";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";

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

export default function FormBox() {
  const [value, setValue] = React.useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleButtonClick = (event: React.MouseEvent<HTMLElement>) => {
    alert(value);
    setValue("");
  };

  return (
    <Box
      id="form-box"
      component="form"
      noValidate
      sx={{
        bgcolor: "#b6e6e9",
        boxShadow: 3,
        p: 5,
        mt: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minWidth: "30%",
      }}
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
      <ThemeProvider theme={theme}>
        <Button
          variant="contained"
          onClick={handleButtonClick}
          color="neutral"
          sx={{ border: 1, maxWidth: 10, alignSelf: "flex-end", mt: 1 }}
        >
          Add
        </Button>
      </ThemeProvider>
    </Box>
  );
}
