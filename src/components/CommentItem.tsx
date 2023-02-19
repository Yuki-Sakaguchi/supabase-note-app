import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';
import { supabase } from '@/utils/supabase';
import useStore from '@/stores';
import { useMutateComment } from '@/hooks/useMutateComment';
import { Spinner } from './Spinner';
import { Comment } from '@/types/types';

export const CommentItem: FC<Omit<Comment, 'created_at' | 'note_id'>> = ({
  id,
  content,
  user_id,
}) => {
  const [userId, setUserId] = useState<string | undefined>('');
  const update = useStore((state) => state.updateEditerdComment);
  const { deleteCommentMutation } = useMutateComment();

  useEffect(() => {
    const getUser = async () => {
      const res = await supabase.auth.getUser();
      const { user } = res.data;
      setUserId(user?.id);
    };
    getUser();
  }, []);

  if (deleteCommentMutation.isLoading) {
    return <Spinner />;
  }

  return (
    <li className="my-3">
      <span className="cursor-pointer hover:text-pink-600">{content}</span>
      {userId === user_id && (
        <div className="float-right ml-20 flex">
          <PencilIcon
            className="mx-1 h-5 w-5 cursor-pointer text-blue-500"
            onClick={() => update({ id, content })}
          />
          <TrashIcon
            className="h-5 w-5 cursor-pointer text-blue-500"
            onClick={() => deleteCommentMutation.mutate(id)}
          />
        </div>
      )}
    </li>
  );
};
