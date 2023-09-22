import { ArrowLeftIcon } from '@/assets/icons';
import { Container, Prose } from '@/components';
import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Separator,
  Textarea,
  toast,
} from '@/components/ui';
import { mutationPostFormSchema, posts } from '@/pages';
import { formatDate } from '@/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  DotsHorizontalIcon,
  Pencil2Icon,
  TrashIcon,
} from '@radix-ui/react-icons';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import * as z from 'zod';

type EditPostForm = z.infer<typeof mutationPostFormSchema>;

export function PostDetail() {
  const navigate = useNavigate();
  const { postId } = useParams();
  const post = posts.find((post) => post.id === postId);

  const [isEditDialogOpen, setIsEditDialogConfirmOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogConfirmOpen] = useState(false);

  const form = useForm<EditPostForm>({
    resolver: zodResolver(mutationPostFormSchema),
    defaultValues: {
      title: post?.title,
      description: post?.description,
      content: post?.content,
    },
  });

  function onSubmit(data: EditPostForm) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  function cancelEditPost() {
    setIsEditDialogConfirmOpen(false);
    form.reset();
  }

  return (
    <Container className="mt-16 lg:mt-32">
      <div className="xl:relative">
        <div className="mx-auto max-w-2xl">
          <button
            type="button"
            onClick={() => navigate(-1)}
            aria-label="Go back to posts"
            className="group mb-8 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 transition dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20 lg:absolute lg:left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0"
          >
            <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
          </button>

          <article>
            <header className="flex flex-col">
              <div className="flex justify-between">
                <time
                  dateTime={post?.date}
                  className="flex items-center text-base text-zinc-400 dark:text-zinc-500"
                >
                  <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                  <span className="ml-3">{formatDate(post?.date)}</span>
                </time>

                {/* TODO: Add conditional rendering */}
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <Button
                      className="hover:cursor-pointer flex items-center justify-between dark:bg-zinc-800"
                      variant="secondary"
                    >
                      <DotsHorizontalIcon className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="bg-white dark:bg-zinc-900 w-40"
                    align="end"
                  >
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                      className="flex justify-between"
                      onClick={() => setIsEditDialogConfirmOpen(true)}
                    >
                      <p>Edit</p>
                      <Pencil2Icon className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      className="flex justify-between"
                      onClick={() => setIsDeleteDialogConfirmOpen(true)}
                    >
                      <p>Delete</p>
                      <TrashIcon className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <h1 className="mt-6 text-4xl font-bold tracking-normal text-zinc-800 dark:text-zinc-100 sm:text-5xl">
                {post?.title}
              </h1>
            </header>
            <Prose className="mt-8">{post?.content}</Prose>
          </article>
        </div>
      </div>

      {/* Edit dialog */}
      {/* This form should look exactly like form in pages/create-post */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogConfirmOpen}>
        <DialogContent className="dark:bg-zinc-900">
          <DialogHeader>
            <DialogTitle>Edit Post</DialogTitle>
          </DialogHeader>
          <Separator className="my-2" />
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Post title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="Post description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Post content" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col md:flex-row justify-between md:space-x-4 space-y-4 md:space-y-0">
                <Button className="md:w-1/2" type="submit">
                  Edit post
                </Button>
                <Button
                  className="md:w-1/2"
                  variant="outline"
                  onClick={cancelEditPost}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Confirm delete post dialog */}
      {/* https://github.com/radix-ui/primitives/discussions/1436 */}
      <Dialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogConfirmOpen}
      >
        <DialogContent className="h-60 sm:h-48 dark:bg-zinc-900">
          <DialogHeader>
            <DialogTitle>
              Are you sure you want to delete this post?
            </DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              post.
            </DialogDescription>
          </DialogHeader>
          <Separator className="my-2" />
          <div className="flex flex-col md:flex-row justify-between md:space-x-4 space-y-4 md:space-y-0">
            <Button className="md:w-1/2" variant="destructive">
              Yes, delete this post
            </Button>
            <Button className="md:w-1/2" variant="secondary">
              No
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Container>
  );
}