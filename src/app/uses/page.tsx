import Container from '@/components/content/Container';
import PageHeading from '@/components/ui/PageHeading';
import UsesItemGrid from '@/components/content/UsesItemGrid';
import UsesItemCard from '@/components/content/UsesItemCard';

export default function Uses() {
  // const computers = [
  //   {
  //     title: 'MacOS',
  //     items: [
  //       { value: '14" Apple MacBook Pro' },
  //       { value: 'M3 Pro' },
  //       { value: '12-core CPU' },
  //       { value: '18-core GPU' },
  //       { value: '36GB RAM' },
  //       { value: '1TB SSD' },
  //       { value: 'Silver' },
  //     ],
  //   },
  //   {
  //     title: 'Windows 11',
  //     items: [
  //       { value: 'NZXT H7 Flow w/ ARCTIC P14' },
  //       { value: 'Intel i7-14700KF 5.6GHz' },
  //       { value: 'MSI PRO Z790-A MAX Wifi' },
  //       { value: 'Gigabyte RTX 4090 AERO OC 24GB' },
  //       { value: 'Corsair Vengeance DDR5-6400 CL32 64GB' },
  //       { value: 'Corsair RM1000x SHIFT 1000W' },
  //       { value: 'WD Black SN850X 4TB NVME' },
  //       { value: 'Deepcool LT720' },
  //     ],
  //   },
  //   {
  //     title: 'Arch Btw',
  //     items: [
  //       { value: 'Lenovo ThinkPad T440s (Modded)' },
  //       { value: 'Intel Core i5-4200U 2.6GHz' },
  //       { value: '12GB DDR3L' },
  //       { value: 'Samsung EVO 850 500GB' },
  //     ],
  //   },
  //   {
  //     title: 'Phone',
  //     items: [
  //       { value: 'Apple iPhone 15 Pro 256GB' },
  //       { value: 'White Titanium' },
  //     ],
  //   },
  // ];

  const peripherals = [
    {
      title: 'PC',
      items: [
        { value: 'Win 10' },
      ],
    },
  ];

  const software = [
    {
      title: 'Code',
      items: [{ value: 'VS Code' }],
    },
    {
      title: 'Music',
      items: [{ value: 'Zing MP3' }],
    },
  ];

  const stack = [
    {
      title: 'Web',
      items: [
        { value: 'TypeScript' },
        { value: 'Next.js' },
        { value: 'Tailwind' },
        { value: 'Postgres' },
        { value: 'Supabase' },
        { value: 'Drizzle' },
        { value: 'MDX' },
      ],
    },
    {
      title: 'Shell',
      items: [
        { value: 'Ghostty' },
        { value: 'Node' },
        { value: 'Powerlevel10k' },
        { value: 'GitHub CLI' },
        { value: 'Vercel CLI' },
        { value: 'Supabase CLI' },
        { value: 'GitHub Copilot' },
      ],
    },
  ];

  const computers = [{
    title: 'Window',
    items: [
      { value: 'Win 10' },
    ],
  }];

  return (
    <Container>
      <div className="mt-8">
        <PageHeading title={'Uses'} />

        <div className="mb-10 max-w-7xl font-serif text-2xl md:mb-14 md:text-3xl">
          <p className="mb-6 font-light italic text-dark dark:text-light">
            Things I use to make things...
          </p>
        </div>

        <section className="mb-12" aria-labelledby="computers-heading">
          <h2
            id="computers-heading"
            className="mb-8 border-b-2 border-primary pb-4 text-xl text-dark dark:text-light"
          >
            Computers
          </h2>
          <UsesItemGrid columns={2} aria-labelledby="computers-heading">
            {computers.map((item, index) => (
              <UsesItemCard
                key={index}
                title={item.title}
                items={item.items}
                aria-label={`${item.title} specifications`}
              />
            ))}
          </UsesItemGrid>
        </section>

        <section className="mb-12" aria-labelledby="peripherals-heading">
          <h2
            id="peripherals-heading"
            className="mb-8 border-b-2 border-primary pb-4 text-xl text-dark dark:text-light"
          >
            Peripherals
          </h2>
          <UsesItemGrid columns={2} aria-labelledby="peripherals-heading">
            {peripherals.map((item, index) => (
              <UsesItemCard
                key={`periph-${index}`}
                title={item.title}
                items={item.items}
                aria-label={`${item.title} peripherals`}
              />
            ))}
          </UsesItemGrid>
        </section>

        <section className="mb-12" aria-labelledby="software-heading">
          <h2
            id="software-heading"
            className="mb-8 border-b-2 border-primary pb-4 text-xl text-dark dark:text-light"
          >
            Software
          </h2>
          <UsesItemGrid columns={2} aria-labelledby="software-heading">
            {software.map((item, index) => (
              <UsesItemCard
                key={`software-${index}`}
                title={item.title}
                items={item.items}
                aria-label={`${item.title} software`}
              />
            ))}
          </UsesItemGrid>
        </section>

        <section className="mb-12" aria-labelledby="stack-heading">
          <h2
            id="stack-heading"
            className="mb-8 border-b-2 border-primary pb-4 text-xl text-dark dark:text-light"
          >
            Stack
          </h2>
          <UsesItemGrid columns={2} aria-labelledby="stack-heading">
            {stack.map((item, index) => (
              <UsesItemCard
                key={`stack-${index}`}
                title={item.title}
                items={item.items}
                aria-label={`${item.title} technology stack`}
              />
            ))}
          </UsesItemGrid>
        </section>
      </div>
    </Container>
  );
}
