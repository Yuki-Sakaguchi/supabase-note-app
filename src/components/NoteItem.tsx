import type { FC } from 'react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { supabase } from '@/utils/supabase';
import useStore from '@/stores';
import { useMutateNote } from '@/hooks/useMutateNote';
import { Spinner } from './Spinner';
import { Note } from '@/types/types';

export const NoteItem: FC<
  Omit<Note, 'created_at' | 'note_id' | 'comments'>
> = ({ id, title, content, user_id }) => {
  const [userId, setUserId] = useState<string | undefined>('');
  const update = useStore((state) => state.updateEditerdNote);
  const { deleteNoteMutation } = useMutateNote();

  useEffect(() => {
    const getUser = async () => {
      const res = await supabase.auth.getUser();
      const { user } = res.data;
      setUserId(user?.id);
    };
    getUser();
  }, []);

  if (deleteNoteMutation.isLoading) {
    return <Spinner />;
  }

  return (
    <li className="my-3">
      <Link href={`/note/${id}`} prefetch={false}>
        <span className="cursor-pointer hover:text-pink-600">{title}</span>
      </Link>
      {userId === user_id && (
        <div className="float-right ml-20 flex">
          <PencilIcon
            className="mx-1 h-5 w-5 cursor-pointer text-blue-500"
            onClick={() => update({ id, title, content })}
          />
          <TrashIcon
            className="h-5 w-5 cursor-pointer text-blue-500"
            onClick={() => deleteNoteMutation.mutate(id)}
          />
        </div>
      )}
    </li>
  );
};
