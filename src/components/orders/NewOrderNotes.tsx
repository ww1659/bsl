import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'

type NewOrderNotesProps = {
  setOrderNotes: React.Dispatch<React.SetStateAction<string>>;
};

export function NewOrderNotes({ setOrderNotes }: NewOrderNotesProps) {
  return (
    <div>
      <Label htmlFor="order notes">Additional Notes</Label>
      <Textarea
        id="order notes"
        onChange={(e) => setOrderNotes(e.target.value)}
        placeholder="Add any extra notes to the order here"
      />
    </div>
  )
}
