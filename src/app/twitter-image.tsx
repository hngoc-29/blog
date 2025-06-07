import { generateTwitterImage } from '@/components/og/TwitterImageTemplate';
import { size, contentType } from '@/components/og/OgImageTemplate';

export const alt = 'Tellwind';
export { size, contentType };

export default async function Image() {
  return generateTwitterImage({
    title: 'Tellwind — tellwind.sh',
    description:
      'Fullstack Engineer & UI Designer with 10+ years of experience creating innovative digital solutions.',
  });
}
