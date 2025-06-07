'use client';

import PageHeading from '@/components/ui/PageHeading';
import Container from '@/components/content/Container';
import Tooltip from '@/components/ui/Tooltip';
import { CldImage } from 'next-cloudinary';

export default function About() {
  return (
    <Container>
      <main className="mt-12" aria-labelledby="about-heading">
        <div id="about-heading">
          <PageHeading title={'About'} />
        </div>
        <section className="mb-4 max-w-7xl font-serif text-xl font-light italic leading-normal md:text-3xl md:leading-normal lg:mb-6 lg:text-4xl lg:leading-normal">
          <p className="mb-4 text-dark md:mb-6 lg:mb-8 dark:text-light">
            Website created with open source code <a className='underline text-blue-500' href='https://github.com/amirardalan/amirardalan.com'>Amir Ardalan</a>
          </p>
        </section>

        <section
          className="mt-8 flex flex-col justify-between border-t-2 border-zinc-200 pt-8 lg:mt-16 lg:flex-row lg:pt-12 dark:border-zinc-800"
          aria-label="Contact links"
        >
          <div className="flex flex-col justify-center">
            <div className="mb-2 flex flex-row items-center">

            </div>
            <div className="mb-2 flex flex-row items-center">
              <p className="text-zinc-600 dark:text-zinc-500" id="github-link">
                GitHub:
              </p>
              <Tooltip text="Explore my GitHub" pos="r">
                <a
                  href="https://github.com/hngoc-29"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="ml-1 text-primary"
                  aria-labelledby="github-link"
                >
                  @hngoc-29
                </a>
              </Tooltip>
            </div>
            <div className="mb-2 flex flex-row items-center">

            </div>
            <div className="mb-2 flex flex-row items-center">
              <p className="text-zinc-600 dark:text-zinc-500" id="resume-link">
                Facebook:
              </p>
              <Tooltip text="My facebook" pos="r">
                <a
                  href="/resume"
                  rel="noopener noreferrer"
                  target="_blank"
                  className="ml-1 text-primary"
                  aria-labelledby="resume-link"
                >
                  @ngoc29FPG
                </a>
              </Tooltip>
            </div>
          </div>
          <div className="mt-6 flex lg:mt-0" aria-hidden="true">
            <CldImage
              src="About/amir-avatar_e6puqu"
              alt="Amir Ardalan Avatar"
              width={125}
              height={125}
              className="rounded-full"
              autoColor
              priority
            />
          </div>
        </section>
      </main>
    </Container>
  );
}
