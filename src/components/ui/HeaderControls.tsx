import IconGithub from '@/components/icons/IconGithub';
import Tooltip from '@/components/ui/Tooltip';
import ThemeMenu from '@/components/ui/ThemeMenu';
import IconFacebook from '../icons/IconFacebook';

export default function HeaderExternalLinks() {
  const handleClickGithub = () => {
    window.open(
      'https://github.com/hngoc-29/blog',
      '_blank',
      'noopener,noreferrer'
    );
  };

  const handleClickFacebook = () => {
    window.open(
      'https://www.facebook.com/ngoc29FPG',
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div
      className="mt-2 flex items-center space-x-6 pr-20 md:pr-0"
      role="group"
      aria-label="External links and site controls"
    >
      <Tooltip text="Star on GitHub" pos="b">
        <button onClick={handleClickGithub} aria-label="Visit GitHub repository">
          <IconGithub />
        </button>
      </Tooltip>
      <Tooltip text="Facebook me" pos="b">
        <button onClick={handleClickFacebook} aria-label="Visit Facebook own">
          <IconFacebook />
        </button>
      </Tooltip>
      <ThemeMenu />
    </div>
  );
}
