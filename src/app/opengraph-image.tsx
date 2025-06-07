import {
  generateOgImage,
  size,
  contentType,
} from '@/components/og/OgImageTemplate';

export const alt = 'Tellwind';
export { size, contentType };

export default async function Image() {
  return generateOgImage({
    title: 'Tellwind — tellwind.sh',
    description:
      'Fullstack Engineer & UI Designer with 10+ years of experience creating innovative digital solutions.',
  });
}
