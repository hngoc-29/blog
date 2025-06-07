import { generateTwitterImage } from '@/components/og/TwitterImageTemplate';
import { size, contentType } from '@/components/og/OgImageTemplate';

export const alt = 'Tellwind Uses';
export { size, contentType };

export default async function Image() {
  return generateTwitterImage({
    title: 'Uses — Tellwind',
    description:
      'Things I use to make things... hardware, software, and other tools.',
  });
}
