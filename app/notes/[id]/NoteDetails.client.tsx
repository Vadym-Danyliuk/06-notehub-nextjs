'use client';

import { fetchNoteById, deleteNote } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import css from './NoteDetails.module.css';
import Loading from '../loading';
import { RiClockwise2Fill, RiDeleteBin5Fill, } from 'react-icons/ri';

const NoteDetailsClient = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  const handleDelete = async () => {
    const confirmed = confirm('Ви впевнені, що хочете видалити нотатку?');
    if (!confirmed) return;

    try {
      await deleteNote(id);
      router.push('/notes'); 
    } catch (err) {
      console.error('Помилка при видаленні:', err);
      alert('Не вдалося видалити нотатку.');
    }
  };

  if (error) throw error;

  return (
    <>
      {note && (
        <div className={css.container}>
          <div className={css.item}>
            <div className={css.header}>
              <h2>{note.title}</h2>
            </div>
            <p className={css.content}>{note.content}</p>
            <p className={css.date}>{note.createdAt}</p>
            <div className={css.actions}>
              <button className={css.backButton} onClick={() => router.back()}>
                <RiClockwise2Fill />Назад
              </button>
              <button className={css.deleteButton} onClick={handleDelete}>
                <RiDeleteBin5Fill />Видалити
              </button>
            </div>
          </div>
        </div>
      )}
      {isLoading && <Loading />}
      {!note && <p>Something went wrong.</p>}
    </>
  );
};

export default NoteDetailsClient;