import { format } from "date-fns";
import React, { useState } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import { Controller, FormState, UseFormMethods } from "react-hook-form";
import { FormFieldProps, Form, Label } from "semantic-ui-react";

type IProps = CalendarProps &
  Partial<UseFormMethods> &
  FormFieldProps & {
    name: string;
    intialValue: Date | undefined;
    dateFormat?: string;
    maxDate?: Date;
    minDate?: Date;
    formState: FormState<any>;
    onChange: (date: Date | Date[]) => void;
  };

export const CalendarDropdown: React.FC<IProps> = ({
  name,
  width,
  placeholder,
  minDate,
  maxDate,
  control,
  formState,
  onChange,
  intialValue,
  dateFormat = "dd MMM yyyy",
  ...rest
}) => {
  const [showCalendar, setshowCalendar] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string | number | readonly string[] | undefined>("");
  const rootRef = React.useRef(null);

  const toggleCalendar = (val?: boolean) => {
    setshowCalendar(val || !showCalendar);
  };

  const handleClickAway = (e: MouseEvent) => {
    const el: any = rootRef.current;
    if (el && !el.contains(e.target)) {
      setshowCalendar(false);
    }
  };

  const onCalendarChange = (date: Date | Date[]) => {
    if (date instanceof Date) {
      onChange(date);
      setInputValue(format(date, dateFormat));
      toggleCalendar(false);
    }
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleClickAway, false);
    return () => document.removeEventListener("mousedown", handleClickAway, false);
  });

  return (
    <Form.Field
      className="field react-calendar"
      error={formState.touched[name] && formState.errors[name]}
      width={width}
    >
      <div ref={rootRef}>
        <input
          value={inputValue ? inputValue : intialValue ? format(intialValue, dateFormat) : ""}
          placeholder={placeholder}
          readOnly={true}
          onFocus={() => toggleCalendar(true)}
        />
        <Controller
          control={control}
          defaultValue={inputValue ? inputValue : intialValue ? intialValue : ""}
          name={name}
          render={({ value }) => (
            <>
              {showCalendar && (
                <Calendar
                  onChange={onCalendarChange}
                  value={value}
                  calendarType="US"
                  maxDate={maxDate}
                  minDate={minDate}
                  {...rest}
                />
              )}
              {formState.touched[name] && formState.errors[name] && (
                <Label basic color="red">
                  {formState.errors[name].message}
                </Label>
              )}
            </>
          )}
        />
      </div>
    </Form.Field>
  );
};
