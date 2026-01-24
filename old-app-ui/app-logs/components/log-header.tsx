import { useLang } from '@/hooks/language';

import { LogAction, LogEntry } from '../types';
import { logIcons } from './log-icons';

interface LogHeaderProps {
    log: LogEntry;
}

export const LogHeader = ({ log }: LogHeaderProps) => {
    const t = useLang();

    return (
        <>
            <div className='algin-center mb-1 flex flex-col gap-1 p-2 sm:flex-row sm:justify-between sm:gap-0 sm:p-3'>
                {log.action && (
                    <span className='flex items-center gap-2 text-xs font-semibold sm:text-sm'>
                        {logIcons[log.action as LogAction]}
                        {t.logs(log.action)}
                    </span>
                )}
                {log.createdAt && (
                    <span className='text-[10px] text-gray-500 sm:text-xs dark:text-gray-400'>
                        {t.helper('date')}: {new Date(log.createdAt).toLocaleString('pt-BR')}
                    </span>
                )}
            </div>

            {log.auth_ref_api && (
                <div className='algin-center mb-2 flex justify-between px-2 sm:mb-3 sm:px-3'>
                    <span className='text-[10px] font-semibold text-gray-500 sm:text-xs dark:text-gray-400'>
                        {t.helper('responsible')}: {log.auth_ref_api.name}
                    </span>
                </div>
            )}

            {log.auth_ref_integration && (
                <div className='algin-center mb-2 flex justify-between px-2 sm:mb-3 sm:px-3'>
                    <span className='text-[10px] font-semibold text-gray-500 sm:text-xs dark:text-gray-400'>
                        {t.helper('integration')}: {log.auth_ref_integration.name}
                    </span>
                </div>
            )}
        </>
    );
};
