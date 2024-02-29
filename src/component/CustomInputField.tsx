import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import { MainContext } from "./context";
import {
  checkConfirmPassword,
  checkEmail,
  checkPassword,
  checkUsername,
  handleValueChange,
  handleVisibility,
} from "./functions";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function CustomInputField({
  lable,
  Icon,
  value,
  setValue,
  show,
  setShow,
  helpertext,
  password,
}: any) {
  const match = useMediaQuery("(max-width:768px)");
  const [focused, setFocused] = useState(false);
  const { mode } = MainContext();
  if (show || setShow) {
    return (
      <FormControl variant="outlined" className={mode == "dark" ? "input" : ""}>
        <InputLabel
          htmlFor={lable}
          sx={{
            fontWeight: "700",
            color: mode == "dark" ? "white" : "black",
          }}
        >
          {lable}
        </InputLabel>
        <OutlinedInput
          size={match ? "small" : "medium"}
          id="password"
          value={value}
          type={show ? "text" : "password"}
          className={mode == "dark" ? "inputText" : ""}
          onChange={(e) => {
            setValue(e.target.value);
            lable.includes("Confirm")
              ? checkConfirmPassword(
                  e.target.value,
                  password,
                  setFocused,
                  setValue
                )
              : handleValueChange(
                  e,
                  value,
                  setValue,
                  checkPassword,
                  setFocused
                );
          }}
          inputProps={{ maxLength: 10, minLength: 5, required: true }}
          startAdornment={
            <InputAdornment position="start">
              <IconButton
                onClick={() => handleVisibility(show, setShow)}
                size={match ? "small" : "large"}
                color={mode == "dark" ? "warning" : "default"}
              >
                {!show ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          label={`${lable} s`}
        />

        {focused && (
          <FormHelperText
            style={{
              color: mode == "light" ? "black" : "orange",
            }}
          >
            {helpertext}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
  return (
    <FormControl variant="outlined" className={mode == "dark" ? "input" : ""}>
      <InputLabel
        htmlFor={lable}
        sx={{
          fontWeight: "700",
          color: mode == "dark" ? "white" : "black",
        }}
      >
        Enter {lable}
      </InputLabel>
      <OutlinedInput
        id={lable}
        size={match ? "small" : "medium"}
        type="text"
        value={value}
        className={mode == "dark" ? "inputText" : ""}
        startAdornment={
          <InputAdornment position="start">
            <IconButton
              size={match ? "small" : "large"}
              color={mode == "dark" ? "warning" : "default"}
            >
              <Icon />
            </IconButton>
          </InputAdornment>
        }
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => {
          lable.includes("username")
            ? handleValueChange(e, value, setValue, checkUsername, setFocused)
            : handleValueChange(e, value, setValue, checkEmail, setFocused);
        }}
        label={`Enter ${lable}s`}
      />
      {focused && (
        <FormHelperText
          style={{
            color: mode == "light" ? "black" : "orange",
          }}
        >
          {helpertext}
        </FormHelperText>
      )}
    </FormControl>
  );
}

export default CustomInputField;
