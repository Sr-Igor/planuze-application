import { PlansTemplate } from '@/templates/plans';

import { ITabProps } from '../types';

export const Plans = (props: ITabProps) => {
    return (
        <div className='px-4 sm:px-5'>
            <PlansTemplate {...props} gridClassName='grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2' />
        </div>
    );
};
