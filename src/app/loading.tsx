import dynamic from 'next/dynamic';
const Loader = dynamic(() => import('./_components/UI/loader/Loader'), {
  ssr: false,
});

export default function Loading() {
  return <Loader fullScreen />;
}
