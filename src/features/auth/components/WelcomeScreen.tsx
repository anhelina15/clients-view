import { useDisclosure } from '@/core-ui/hooks/useDisclosure';
import Button from '@/core-ui/components/atoms/Button';
import ApiAccessSetupModal from '@/features/auth/components/ApiAccessSetupModal';

const WelcomeScreen = () => {
  const [isModalOpen, { open, close }] = useDisclosure(false);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-slate-50 p-6 text-center">
      <div className="max-w-md space-y-6">
        <h1 className="text-3xl font-bold text-slate-900">Vítejte v aplikaci</h1>
        <p className="text-slate-600">
          Pro pokračování je nutné nastavit vaše API klíče pro přístup k Raynet CRM.
        </p>
        <Button onClick={open} size="lg" className="px-8">
          Vložit údaje
        </Button>
      </div>

      <ApiAccessSetupModal isOpen={isModalOpen} onClose={close} />
    </div>
  );
};

export default WelcomeScreen;
