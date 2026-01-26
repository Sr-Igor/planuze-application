import { Shield } from 'lucide-react';

export default function Page() {
    return (
        <div className='flex h-[calc(100vh-68px)] w-full flex-col items-center justify-center gap-4 p-4'>
            <Shield size={82} />
            <h1 className='text-5xl font-bold'>Dashboard Admin</h1>
            <p className='text-xl text-gray-500'>
                Esse painel é destinado para o gerenciamento de features e planos do sistema
            </p>
        </div>
    );
}
