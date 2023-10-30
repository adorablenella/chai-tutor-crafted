import { TFormSubmission } from "@/sdk/next/types";
import { Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow } from "@tremor/react";
import { isEmpty, map } from "lodash";
import FormSubmissionDataPopup from "./form-submission-data-popup";

const formatDate = (date: string, formatOption = { onlyDate: false }) => {
  const options: any = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  const dateAndTime = new Intl.DateTimeFormat("en-US", options).format(new Date(date));

  if (formatOption.onlyDate) return dateAndTime.split(",").shift();

  return dateAndTime;
};

export default function FormSubmissionTable({ data }: { data: TFormSubmission[] }) {
  return (
    <Table className="max-h-[84vh] rounded-xl border">
      <TableHead>
        <TableRow>
          <TableHeaderCell className="w-64 border-b bg-slate-100">Date & Time</TableHeaderCell>
          <TableHeaderCell className="border-b bg-slate-100">URL</TableHeaderCell>
          <TableHeaderCell className="w-max border-b bg-slate-100">Form Name</TableHeaderCell>
          <TableHeaderCell className="border-b bg-slate-100">Response</TableHeaderCell>
        </TableRow>
      </TableHead>
      {isEmpty(data) && <div>No response</div>}
      <TableBody className="overflow-y-auto">
        {map(data, (response: TFormSubmission) => (
          <TableRow key={response.uuid}>
            <TableCell className="font-medium">{formatDate(response.created_at)}</TableCell>
            <TableCell>{response.page_url}</TableCell>
            <TableCell>{response.form_name || "--"}</TableCell>
            <TableCell className="">
              <FormSubmissionDataPopup data={response} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
