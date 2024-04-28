import { Button } from "../ui/button";
import { useActions } from "@/hooks/useActions";
import { DataVariant } from "@/types/types";

interface DeleteButtonProps {
  id: string;
  dataVariant: DataVariant;
}

const DeleteButton = ({ id, dataVariant }: DeleteButtonProps) => {
  const { loading, actions } = useActions({
    method: "DELETE",
    dataVariant,
    id,
  });

  return (
    <Button
      disabled={loading}
      type="button"
      onClick={() => actions()}
      className="px-2 py-1 h-min bg-destructive/20 text-destructive/80 hover:bg-destructive/25 dark:bg-destructive/40 hover:dark:bg-destructive/60 dark:text-destructive"
    >
      delete
    </Button>
  );
};

export default DeleteButton;
