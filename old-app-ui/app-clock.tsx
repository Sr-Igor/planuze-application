import Image, { ImageProps } from 'next/image';
import Link from 'next/link';

import { useTheme } from 'next-themes';

export interface IAppClockProps extends Omit<ImageProps, 'alt' | 'src'> {}

export const AppClock = ({ ...rest }: IAppClockProps) => {
    const { resolvedTheme } = useTheme();

    const effectiveTheme = resolvedTheme ?? 'light';
    const clock1 = effectiveTheme === 'dark' ? '/images/clock-1.png' : '/images/clock-dark.png';
    const clock2 = effectiveTheme === 'dark' ? '/images/clock-2.png' : '/images/clock-dark-2.png';

    return (
        <div className='relative'>
            <Link href='/'>
                <Image alt={process.env.NEXT_PUBLIC_SYSTEM_NAME!} src={clock1} {...rest} />
                <Image
                    alt={process.env.NEXT_PUBLIC_SYSTEM_NAME!}
                    src={clock2}
                    {...rest}
                    className={rest.className + ' absolute inset-0 animate-spin'}
                    style={{ animationDuration: '60s' }}
                />
            </Link>
        </div>
    );
};
