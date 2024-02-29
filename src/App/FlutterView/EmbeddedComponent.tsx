import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControlLabel from "@mui/material/FormControlLabel/FormControlLabel";
import Checkbox from "@mui/material/Checkbox/Checkbox";
import { FlutterView } from "./FlutterView";

const FlutterAppWrapper = styled("div")(({ theme }) => ({
  border: "1px solid #eee",
  borderRadius: "5px",
  height: "380px",
  width: "600px",
  transition: theme.transitions.create("all", {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflow: "hidden",
}));

const EmbeddedComponent = () => {
  const theme = useTheme();
  const [classNames, setClassNames] = React.useState("");
  const [screen, setScreen] = React.useState("button");
  const [variant, setVariant] = React.useState("solid");
  const [action, setAction] = React.useState("primary");
  const [size, setSize] = React.useState("$md");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isFocusVisible, setIsFocusVisible] = useState(false);

  const handleCheckboxDisabledChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsDisabled(event.target.checked as boolean);
  };

  const handleCheckboxFocusVisibleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsFocusVisible(event.target.checked as boolean);
  };

  const toggleClassName = (className: string) => {
    const classNamesArray = classNames.trim().split(/\s+/);
    const index = classNamesArray.indexOf(className);
    if (index === -1) {
      classNamesArray.push(className);
    } else {
      classNamesArray.splice(index, 1);
    }
    setClassNames(classNamesArray.join(" "));
  };
  const handleScreenChange = (event: SelectChangeEvent) => {
    setScreen(event.target.value as string);
  };

  const handleVariantChange = (event: SelectChangeEvent<string>) => {
    setVariant(event.target.value as string);
  };

  const handleActionChange = (event: SelectChangeEvent<string>) => {
    setAction(event.target.value as string);
  };

  const handleSizeChange = (event: SelectChangeEvent<string>) => {
    setSize(event.target.value as string);
  };

  return (
    <Box sx={{ display: "flex", flexGrow: 1 }}>
      <CssBaseline />

      <Box
        sx={{
          overflow: "auto",

          paddingLeft: theme.spacing(30),
          paddingTop: theme.spacing(25),
        }}
      >
        <List>
          <Box
            sx={{
              width: "300px",
              display: "flex",
              flexGrow: 1,
              flexWrap: "wrap",
              gap: "5px",
            }}
          >
            <FormControl fullWidth>
              <InputLabel id="action-select-label">Action</InputLabel>
              <Select
                labelId="action-select-label"
                value={action}
                label="Action"
                onChange={handleActionChange}
              >
                <MenuItem value="primary">primary</MenuItem>
                <MenuItem value="secondary">secondary</MenuItem>
                <MenuItem value="positive">positive</MenuItem>
                <MenuItem value="negative">negative</MenuItem>
              </Select>
            </FormControl>
            <br></br>

            <FormControl fullWidth>
              <InputLabel id="variant-select-label">Variant</InputLabel>
              <Select
                labelId="variant-select-label"
                value={variant}
                label="TEXT"
                onChange={handleVariantChange}
              >
                <MenuItem value="solid">solid</MenuItem>
                <MenuItem value="outline">outline</MenuItem>
                <MenuItem value="link">link</MenuItem>
              </Select>
            </FormControl>
            <br></br>

            <FormControl fullWidth>
              <InputLabel id="size-select-label">Size</InputLabel>
              <Select
                labelId="size-select-label"
                value={size}
                label="Size"
                onChange={handleSizeChange}
              >
                <MenuItem value="$xs">$xs</MenuItem>
                <MenuItem value="$sm">$sm</MenuItem>
                <MenuItem value="$md">$md</MenuItem>
                <MenuItem value="$lg">$lg</MenuItem>
              </Select>
            </FormControl>

            <div>
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isDisabled}
                      onChange={handleCheckboxDisabledChange}
                    />
                  }
                  label="isDisabled"
                />
              </div>
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={isFocusVisible}
                      onChange={handleCheckboxFocusVisibleChange}
                    />
                  }
                  label="isFocusVisible"
                />
              </div>
            </div>
          </Box>
        </List>
      </Box>

      <Box
        sx={{
          overflow: "auto",
          paddingLeft: theme.spacing(5),
          paddingTop: theme.spacing(25),
        }}
      >
        <FlutterAppWrapper className={classNames}>
          <FlutterView
            assetBase={"/flutter/"}
            src={"/flutter/main.dart.js"}
            onScreenChange={setScreen}
            screen={screen}
            variant={variant}
            action={action}
            size={size}
            disabled={isDisabled}
            focused={isFocusVisible}
          />
        </FlutterAppWrapper>
      </Box>
    </Box>
  );
};

export default EmbeddedComponent;
