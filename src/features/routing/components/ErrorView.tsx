import { AlertCircle, RefreshCcw, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import Button from '@/core-ui/components/atoms/Button';
import { ROUTES } from '@/features/routing/consts/routesPath';

interface ErrorViewProps {
  title?: string;
  message?: string;
  technicalDetails?: string;
  onReset?: () => void;
  status?: number | string;
}

export const ErrorView = ({
  title = 'Chyba',
  message = 'Něco se pokazilo. Zkuste to prosím později.',
  technicalDetails,
  onReset,
  status,
}: ErrorViewProps) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-slate-50 font-sans tracking-tight">
      <div className="max-w-md w-full bg-white p-10 rounded-[32px] shadow-2xl shadow-slate-200 border border-slate-100 text-center">
        <div className="w-16 h-16 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
          <AlertCircle size={32} />
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-2">{status === 404 ? '404' : title}</h1>
        <p className="text-slate-500 mb-8 leading-relaxed italic pr-4 pl-4 text-sm">{message}</p>

        {technicalDetails && (
          <div className="mb-10 p-4 bg-red-50/50 rounded-2xl border border-red-100 text-[11px] font-mono text-red-500/70 truncate overflow-hidden">
            {technicalDetails}
          </div>
        )}

        <div className="flex flex-col gap-3">
          {onReset && (
            <Button
              variant="primary"
              onClick={onReset}
              className="rounded-xl h-[46px] shadow-lg shadow-[#00a9ca]/20"
            >
              <RefreshCcw size={16} />
              <span className="font-bold">Zkusit znovu</span>
            </Button>
          )}
          <Button
            variant="outline"
            onClick={() => navigate(ROUTES.HOME)}
            className="rounded-xl h-[46px] border-slate-200 text-slate-600"
          >
            <Home size={16} />
            <span className="font-bold">Zpět na úvod</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
