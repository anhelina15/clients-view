import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/core-ui/components/atoms/DialogPrimitive';
import { ApiAccessSetupForm } from '@/features/auth/components/ApiAccessSetupForm';

interface ApiAccessSetupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ApiAccessSetupModal = ({ isOpen, onClose }: ApiAccessSetupModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent size="sm">
        <DialogHeader>
          <DialogTitle>Nastavení API klíčů</DialogTitle>
          <DialogDescription>Zadejte prosím své údaje pro přístup k Raynet API.</DialogDescription>
        </DialogHeader>

        <ApiAccessSetupForm onClose={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default ApiAccessSetupModal;
