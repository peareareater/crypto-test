import Head from 'next/head'
import { FC, ComponentType, ReactNode } from 'react';

interface HeaderProps {
    title: string;
    Icon: ReactNode
}
export const Header: FC<HeaderProps> = ({ title, Icon }) => {
    return (
        <Head>
            <title>{title}</title>
            {Icon}
        </Head>
    )
}