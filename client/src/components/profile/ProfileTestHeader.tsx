import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';
import { Text } from '../ui/Text';
import { toast } from '../ui/use-toast';

interface Props {
  title: string;
  id: string;
  typeOfTest: '/multiple-choice/' | '/basic-test/';
}

export function ProfileTestHeader({ id, title, typeOfTest }: Props) {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.origin + typeOfTest + id);
    toast({
      title: 'Copied to clipboard',
      description: 'Share the link with your friends',
    });
  };

  return (
    <header className="flex items-center justify-between">
      <section className="flex flex-col gap-2">
        <Text variant={'title'}>{title}</Text>
        <Text>2 de diciembre 2024</Text>
      </section>
      <section className="flex gap-2">
        <Button onClick={handleCopyLink}>Copy Link</Button>
        <Link to={typeOfTest + id}>
          <Button>Go to Test</Button>
        </Link>
      </section>
    </header>
  );
}
