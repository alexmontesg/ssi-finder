import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useFilings from "../hooks/useFilings.ts";

export default function FilingsTable() {
  const { filings } = useFilings();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            Company
          </TableHead>
          <TableHead>
            Filing Type
          </TableHead>
          <TableHead>
            Document
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filings.map((f) => (
          <TableRow key={f.id}>
            <TableCell>{f.company}</TableCell>
            <TableCell>{f.filing}</TableCell>
            <TableCell>{f.document}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
