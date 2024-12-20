import { testAPI } from '@/api/test/test.api';
import { Item } from '@/components/ui/Item';
import { List } from '@/components/ui/List';
import { PrintButton } from '@/components/ui/PrintButton';
import { TestSchema } from '@backend/test.types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export function TestPage() {
  const { id } = useParams();
  const [test, setTest] = useState<TestSchema>();

  useEffect(() => {
    testAPI.getById({ id: id! }).then((res) => setTest(res));
  }, []);

  return (
    <>
      <header className="flex flex-col gap-1">
        <h2 className="text-2xl font-semibold">{test?.title}</h2>
        <p>{test?.created_at}</p>
      </header>
      <List>{test?.questions.map((q) => <Item>{q}</Item>)}</List>
      <footer className="flex justify-end print:hidden">
        <PrintButton />
      </footer>
    </>
  );
}
