import type { CreateEventRequest } from "@/features/events/types/event.types";
import {
  Button,
  Calendar,
  DateField,
  DatePicker,
  type DateValue,
  Description,
  FieldError,
  Input,
  Label,
  TextField,
  TimeField,
  type TimeValue,
} from "@heroui/react";
import React, { useState } from "react";

interface EventFormProps {
  onSubmit: (data: CreateEventRequest) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
  initialValues?: EventFormInitialValues;
  submitLabel?: string;
}

interface EventFormInitialValues {
  name: string;
  slug: string;
  eventDate: DateValue;
  eventTime: TimeValue;
  venue: string;
}

export function EventForm({
  onSubmit,
  onCancel,
  isSubmitting,
  initialValues,
  submitLabel = "Crear Evento",
}: EventFormProps) {
  const [name, setName] = useState(initialValues?.name ?? "");
  const [slug, setSlug] = useState(initialValues?.slug ?? "");
  const [eventDate, setEventDate] = useState<DateValue | null>(
    initialValues?.eventDate ?? null,
  );
  const [eventTime, setEventTime] = useState<TimeValue | null>(
    initialValues?.eventTime ?? null,
  );
  const [venue, setVenue] = useState(initialValues?.venue ?? "");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!eventDate || !eventTime) return;

    await onSubmit({
      name: name.trim(),
      slug: slug.trim(),
      eventDate: eventDate.toString(),
      eventTime: eventTime.toString(),
      venue: venue.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <TextField>
        <Label>Nombre del evento</Label>
        <Input
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Ej. Boda de Katherine y Leonel"
          required
        />
      </TextField>

      <TextField>
        <Label>Slug</Label>
        <Input
          value={slug}
          onChange={(event) => setSlug(event.target.value)}
          placeholder="boda-katherine-leonel"
          required
          disabled={!!initialValues}
        />
      </TextField>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <DatePicker
          value={eventDate ?? undefined}
          onChange={setEventDate}
          name="date"
        >
          <Label>Date</Label>
          <DateField.Group fullWidth>
            <DateField.Input>
              {(segment) => <DateField.Segment segment={segment} />}
            </DateField.Input>
            <DateField.Suffix>
              <DatePicker.Trigger>
                <DatePicker.TriggerIndicator />
              </DatePicker.Trigger>
            </DateField.Suffix>
          </DateField.Group>
          <DatePicker.Popover>
            <Calendar aria-label="Event date">
              <Calendar.Header>
                <Calendar.YearPickerTrigger>
                  <Calendar.YearPickerTriggerHeading />
                  <Calendar.YearPickerTriggerIndicator />
                </Calendar.YearPickerTrigger>
                <Calendar.NavButton slot="previous" />
                <Calendar.NavButton slot="next" />
              </Calendar.Header>
              <Calendar.Grid>
                <Calendar.GridHeader>
                  {(day) => <Calendar.HeaderCell>{day}</Calendar.HeaderCell>}
                </Calendar.GridHeader>
                <Calendar.GridBody>
                  {(date) => <Calendar.Cell date={date} />}
                </Calendar.GridBody>
              </Calendar.Grid>
              <Calendar.YearPickerGrid>
                <Calendar.YearPickerGridBody>
                  {({ year }) => <Calendar.YearPickerCell year={year} />}
                </Calendar.YearPickerGridBody>
              </Calendar.YearPickerGrid>
            </Calendar>
          </DatePicker.Popover>
        </DatePicker>

        <TimeField value={eventTime ?? undefined} onChange={setEventTime}>
          <Label>Hora</Label>
          <TimeField.Group>
            <TimeField.Input>
              {(segment) => <TimeField.Segment segment={segment} />}
            </TimeField.Input>
          </TimeField.Group>
          <Description />
          <FieldError />
        </TimeField>
      </div>

      <TextField>
        <Label>Lugar</Label>
        <Input
          value={venue}
          onChange={(event) => setVenue(event.target.value)}
          placeholder="Ej. Hotel Real Intercontinental"
          required
        />
      </TextField>

      <div className="mt-2 flex justify-end gap-3">
        <Button
          type="button"
          variant="secondary"
          onPress={onCancel}
          isDisabled={isSubmitting}
        >
          Cancelar
        </Button>

        <Button
          type="submit"
          variant="primary"
          isDisabled={isSubmitting}
          className="rounded-xl bg-linear-to-r from-[#5428e5] to-[#d11bb5] px-5 font-semibold text-white"
        >
          {isSubmitting ? "Guardando..." : submitLabel}
        </Button>
      </div>
    </form>
  );
}
