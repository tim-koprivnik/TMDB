import type { Metadata } from 'next';
import Main from './_layouts/main/Main';
import PageWrapper from './_components/UI/page-wrapper/PageWrapper';
import WhatsPopular from './_components/whats-popular/WhatsPopular';

export const metadata: Metadata = {
  title: 'TMDB',
  description:
    'Millions of movies, TV shows and people to discover. Explore now.',
};

export default function HomePage() {
  return (
    <PageWrapper>
      <Main>
        <div>
          <h1>Welcome.</h1>
          <p>
            Millions of movies, TV shows and people to discover. Explore now.
          </p>
        </div>
        <WhatsPopular />
      </Main>
    </PageWrapper>
  );
}
