import { create } from 'zustand';
import { EditedNote, EditedComment } from '@/types/types';

type State = {
  editedNote: EditedNote;
  editedComment: EditedComment;
  updateEditerdNote: (payload: EditedNote) => void;
  updateEditerdComment: (payload: EditedComment) => void;
  resetEditedNote: () => void;
  resetEditedComment: () => void;
};

const useStore = create<State>((set) => ({
  editedNote: { id: '', title: '', content: '' },
  editedComment: { id: '', content: '' },
  updateEditerdNote: (payload) => {
    set({
      editedNote: {
        id: payload.id,
        title: payload.title,
        content: payload.content,
      },
    });
  },
  resetEditedNote: () => {
    set({ editedNote: { id: '', title: '', content: '' } });
  },
  updateEditerdComment: (payload) => {
    set({
      editedComment: {
        id: payload.id,
        content: payload.content,
      },
    });
  },
  resetEditedComment: () => {
    set({ editedComment: { id: '', content: '' } });
  },
}));

export default useStore;
