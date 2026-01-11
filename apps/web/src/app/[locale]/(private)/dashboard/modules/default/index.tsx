import { IDashboardModule } from '../types';

export default function (_: IDashboardModule) {
    return (
        <div className='h-full w-full p-5'>
            <div>
                <h1 className='text-2xl font-bold'>Hello!</h1>
            </div>
        </div>
    );
}
