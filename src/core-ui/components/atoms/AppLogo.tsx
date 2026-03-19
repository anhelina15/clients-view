import { cn } from '@/shared/utils/cn';

const LOGO = 'https://cdn.raynetcrm.com/resources_app/resources/8f56fff8aa48738b.svg';
const LOGO_WITH_TEXT = 'https://cdn.raynetcrm.com/resources_app/resources/e38f53ff413a2108.svg';

type AppLogoProps = {
  className?: string;
  isOpen?: boolean;
};

const AppLogo = ({ className, isOpen = false }: AppLogoProps) => {
  return (
    <div className={cn('flex items-center justify-center cursor-pointer h-12.5', className)}>
      <img
        src={isOpen ? LOGO_WITH_TEXT : LOGO}
        alt="Raynet Logo"
        className={cn('w-auto shrink-0')}
      />
    </div>
  );
};

export default AppLogo;
