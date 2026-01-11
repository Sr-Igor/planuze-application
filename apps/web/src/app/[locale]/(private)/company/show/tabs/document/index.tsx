import { useCompanyDocument } from '@/api/callers/company_document';
import { company, company_document } from '@/api/generator/types';
import { useLogs } from '@/hooks/logs';
import { useTrash } from '@/hooks/trash';
import { CardListTemplate } from '@/templates/card-list';
import { RegisterCard } from '@/templates/card-list/cards/register';
import { useShow } from '@/templates/show/context';

import { useForm } from './use-form';

export const Document = () => {
    const logs = useLogs();
    const trash = useTrash();

    return (
        <CardListTemplate<company, company_document>
            path='company'
            translate='show.document'
            dataAccess='company_documents'
            useShow={useShow}
            card={(props) => {
                return (
                    <RegisterCard<company_document>
                        {...props}
                        key={props.local_id}
                        useForm={useForm}
                        logs={logs.company_document()}
                    />
                );
            }}
            hookReq={useCompanyDocument}
            getFilters={(data) => ({
                company_id: data?.id
            })}
            getBodyKeys={(data) => ({
                company_id: data?.id
            })}
            trash={trash.company_document()}
        />
    );
};
