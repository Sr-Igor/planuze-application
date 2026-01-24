import Image, { ImageProps } from 'next/image';
import Link from 'next/link';

import { useTheme } from 'next-themes';

export interface IAppLogoProps extends Omit<ImageProps, 'alt' | 'src'> {}

export const AppLogo = ({ ...rest }: IAppLogoProps) => {
    const { resolvedTheme } = useTheme();

    const effectiveTheme = resolvedTheme ?? 'light';
    const logo = effectiveTheme === 'dark' ? '/images/logo-light.png' : '/images/logo-dark.png';

    return (
        <Link href='/'>
            <Image alt={process.env.NEXT_PUBLIC_SYSTEM_NAME!} src={logo} {...rest} />
        </Link>
    );
};
