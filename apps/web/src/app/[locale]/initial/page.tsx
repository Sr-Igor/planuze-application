'use client';

import { Nav } from '@/components/nav';

import { useLpConstants } from './hooks';
import { Benefits, Cta, Feature, Footer, Hero, How, Ia, Image } from './sections';
import { Wrapper } from './sections/wrapper';

export default function LPPage() {
    const { benefits, features, steps } = useLpConstants();

    return (
        <Wrapper>
            {/* Navigation */}
            <Nav intermediate={false} />
            {/* Hero Section */}
            <Hero />

            {/* Video/Image Section */}
            <Image />

            {/* AI Chat Section */}
            <Ia />

            {/* Features Section */}
            <Feature features={features} />

            {/* How It Works Section */}
            <How steps={steps} />

            {/* Benefits Section */}
            <Benefits benefits={benefits} />

            {/* CTA Section */}
            <Cta />

            {/* Footer */}
            <Footer />
        </Wrapper>
    );
}
