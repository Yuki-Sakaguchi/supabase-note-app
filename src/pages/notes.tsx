import type { NextPage, GetStaticProps } from 'next';
import {
  ArrowLeftOnRectangleIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/solid';
import { supabase } from '@/utils/supabase';
import { NoteForm } from '@/components/NoteForm';
import { NoteItem } from '@/components/NoteItem';
import { Layout } from '@/components/Layout';
import { Note } from '@/types/types';

export const getStaticProps: GetStaticProps = async () => {
  console.log('ISR invoked - notes page');
  const { data: notes, error } = await supabase
    .from('notes')
    .select('*')
    .order('created_at', { ascending: true });
  if (error) throw new Error(error.message);
  return {
    props: { notes },
    revalidate: false, // on demand ISR をするのでここはfalse
  };
};

type StaticProps = {
  notes: Note[];
};

const Notes: NextPage<StaticProps> = ({ notes }) => {
  const signOut = () => {
    supabase.auth.signOut();
  };
  return (
    <Layout title="Notes">
      <ArrowLeftOnRectangleIcon
        className="mb-6 h-6 w-6 cursor-pointer text-blue-500"
        onClick={signOut}
      />
      <DocumentTextIcon className="h-8 w-8 text-blue-500" />
      <ul className="my-2">
        {notes?.map((note) => (
          <NoteItem
            key={note.id}
            id={note.id}
            title={note.title}
            content={note.content}
            user_id={note.user_id}
          />
        ))}
      </ul>
      <NoteForm />
    </Layout>
  );
};

export default Notes;
