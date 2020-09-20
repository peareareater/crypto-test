import { useRouter } from 'next/router';

const Home = () => {
    const router = useRouter();
    if (typeof window !== 'undefined') {
        router.push('/robots');
    }
    return null;
};
export default Home;
