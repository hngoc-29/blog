'use client';

import { useState, useRef, useEffect, useCallback, useReducer } from 'react';
import { useRouter } from 'next/navigation';
import { createPost } from '@/services/post-service';
import { getCategories } from '@/services/category-service';
import { useToast } from '@/components/ui/ToastContext';
import { useImageInsertion } from '@/hooks/useImageInsertion';
import { useUnsavedChanges } from '@/hooks/useUnsavedChanges';
import { Category } from '@/types/blog';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

import PostFormFields from '@/components/blog/PostFormFields';
import Button from '@/components/ui/Button';
import Modal from '@/components/ui/Modal';
import MediaGallery from '@/components/blog/MediaGallery';
import PostFormControls from '@/components/blog/PostFormControls';

interface FormState {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  categoryId: number | null;
  published: boolean;
  featured: boolean;
}

type UpdateFieldAction<K extends keyof FormState> = {
  type: 'UPDATE_FIELD';
  field: K;
  value: FormState[K];
};

type FormUpdateActions = {
  [K in keyof FormState]: UpdateFieldAction<K>;
}[keyof FormState];

type FormAction = FormUpdateActions | { type: 'CLEAR_FORM' };

const initialState: FormState = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  categoryId: null,
  published: false,
  featured: false,
};

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value };
    case 'CLEAR_FORM':
      return initialState;
    default:
      return state;
  }
}

interface NewPostFormProps {
  userId: number;
  categories?: Category[];
}

export default function NewPostForm({
  userId,
  categories: propCategories = [],
}: NewPostFormProps) {
  const router = useRouter();
  const { showToast } = useToast();
  const [state, dispatch] = useReducer(formReducer, initialState);
  const { title, slug, excerpt, content, categoryId, published, featured } =
    state;

  const [categories, setCategories] = useState<Category[]>(propCategories);
  const [categoriesLoading, setCategoriesLoading] = useState(
    !propCategories.length
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(
    null!
  ) as React.RefObject<HTMLInputElement>;

  useEffect(() => {
    if (!propCategories.length && categoriesLoading) {
      const fetchCategoriesOnce = async () => {
        try {
          const data = await getCategories();
          setCategories(data);
        } catch (err) {
          console.error('Failed to fetch categories:', err);
        } finally {
          setCategoriesLoading(false);
        }
      };

      fetchCategoriesOnce();
    }
  }, [propCategories, categoriesLoading]);

  useEffect(() => {
    const formChanged =
      state.title !== initialState.title ||
      state.slug !== initialState.slug ||
      state.excerpt !== initialState.excerpt ||
      state.content !== initialState.content ||
      state.categoryId !== initialState.categoryId ||
      state.featured !== initialState.featured ||
      state.published !== initialState.published;

    setHasUnsavedChanges(formChanged);
  }, [state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        ...state,
        category_id: state.categoryId,
        user_id: userId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      await createPost(payload);

      showToast('Post created successfully!', 'success');
      setHasUnsavedChanges(false);
      router.push(
        state.published ? `/blog/${state.slug}` : '/admin/blog/drafts'
      );
    } catch (err) {
      showToast((err as Error).message, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearForm = useCallback(() => {
    dispatch({ type: 'CLEAR_FORM' });
  }, []);

  const discardChanges = useCallback(() => {
    clearForm();
  }, [clearForm]);

  const {
    showUnsavedChangesModal,
    handleConfirmNavigation,
    handleCancelNavigation,
  } = useUnsavedChanges({
    hasUnsavedChanges,
    onDiscard: discardChanges,
  });

  const {
    textareaRef,
    cursorPosition,
    handleTextAreaSelect,
    insertImageAtCursor,
  } = useImageInsertion(
    content,
    (newContent: string) =>
      dispatch({ type: 'UPDATE_FIELD', field: 'content', value: newContent }),
    () => setShowGallery(false)
  );

  const createFieldDispatcher = useCallback(
    <K extends keyof FormState>(field: K) =>
      (value: FormState[K]) => {
        dispatch({ type: 'UPDATE_FIELD', field, value } as FormAction);
      },
    []
  );

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="font-mono text-dark dark:text-light"
      >
        <PostFormFields
          title={title}
          setTitle={createFieldDispatcher('title')}
          slug={slug}
          setSlug={createFieldDispatcher('slug')}
          excerpt={excerpt}
          setExcerpt={createFieldDispatcher('excerpt')}
          content={content}
          setContent={createFieldDispatcher('content')}
          published={published}
          setPublished={createFieldDispatcher('published')}
          featured={featured}
          setFeatured={createFieldDispatcher('featured')}
          showGallery={showGallery}
          setShowGallery={setShowGallery}
          textareaRef={textareaRef}
          onTextAreaSelect={handleTextAreaSelect}
          categories={categories}
          categoryId={categoryId}
          setCategoryId={createFieldDispatcher('categoryId')}
          categoriesLoading={categoriesLoading}
        />
        <div className="mt-4 flex flex-row items-center gap-2">
          <Button
            type="button"
            text="Preview"
            onClick={() => setShowPreview(true)}
          />
          <PostFormControls
            isSubmitting={isSubmitting}
            showDiscard={true}
            onDiscard={() => setShowCancelModal(true)}
            onSubmitText="Create Post"
          />
        </div>
      </form>

      <Modal
        isOpen={showGallery}
        title="Media Gallery"
        message=""
        onCancel={() => setShowGallery(false)}
        buttons="cancel"
        leftButton={
          <Button
            type="button"
            text="Upload"
            onClick={() => {
              if (fileInputRef.current) {
                fileInputRef.current.click();
              }
            }}
          />
        }
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
        />
        <MediaGallery
          onSelect={insertImageAtCursor}
          fileInputRef={fileInputRef}
          cursorPosition={cursorPosition}
        />
      </Modal>

      <Modal
        isOpen={showPreview}
        title=""
        message=""
        onCancel={() => setShowPreview(false)}
        buttons="cancel"
        className="!p-0"
      >
        <div
          className="mx-auto my-4 max-w-3xl overflow-y-auto rounded-xl border border-zinc-200 bg-white p-6 shadow-lg dark:border-zinc-800 dark:bg-zinc-900"
          style={{ maxHeight: '80vh' }}
        >
          <div className="mb-6 border-b border-zinc-200 pb-4 dark:border-zinc-700">
            <h1 className="mb-1 text-3xl font-bold dark:text-light">{title}</h1>
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              {slug}
            </div>
          </div>
          <div className="prose dark:prose-invert max-w-none dark:text-light">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {content}
            </ReactMarkdown>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showCancelModal}
        title="Discard Changes"
        message="Are you sure you want to discard your changes? This action cannot be undone."
        onCancel={() => setShowCancelModal(false)}
        onConfirm={() => {
          clearForm();
          router.push('/admin/');
        }}
        confirmText="Discard"
      />

      <Modal
        isOpen={showUnsavedChangesModal}
        title="Unsaved Changes"
        message="You have unsaved changes. Are you sure you want to leave this page?"
        onCancel={handleCancelNavigation}
        onConfirm={handleConfirmNavigation}
        confirmText="Leave Page"
      />
    </>
  );
}
