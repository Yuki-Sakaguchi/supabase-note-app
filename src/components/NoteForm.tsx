import { FormEvent } from 'react';
import type { FC } from 'react';
import { supabase } from '@/utils/supabase';
import useStore from '@/stores';
import { useMutateNote } from '@/hooks/useMutateNote';
import { Spinner } from './Spinner';

export const NoteForm: FC = () => {
  const { editedNote } = useStore();
  const update = useStore((state) => state.updateEditerdNote);
  const { createNoteMutation, updateNoteMutation } = useMutateNote();

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (editedNote.id === '') {
      const res = await supabase.auth.getUser();
      const { user } = res.data;
      createNoteMutation.mutate({
        title: editedNote.title,
        content: editedNote.content,
        user_id: user?.id,
      });
    } else {
      updateNoteMutation.mutate({
        id: editedNote.id,
        title: editedNote.title,
        content: editedNote.content,
      });
    }
  };

  if (updateNoteMutation.isLoading || createNoteMutation.isLoading) {
    return <Spinner />;
  }

  return (
    <form onSubmit={submitHandler}>
      <div>
        <input
          type="text"
          className="my-2 rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
          placeholder="title"
          value={editedNote.title}
          onChange={(e) => update({ ...editedNote, title: e.target.value })}
        />
      </div>
      <div>
        <textarea
          cols={50}
          rows={10}
          className="my-2 rounded border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:border-indigo-500 focus:outline-none"
          value={editedNote.content}
          onChange={(e) => update({ ...editedNote, content: e.target.value })}
        />
      </div>
      <div className="my-2 flex justify-center">
        <button
          type="submit"
          className="ml-2 rounded bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          {editedNote.id ? 'Update' : 'Create'}
        </button>
      </div>
    </form>
  );
};
