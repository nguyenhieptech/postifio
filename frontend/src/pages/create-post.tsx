import { Container } from '@/components';
import {
  Button,
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
import { useAppSelector } from '@/store';
import { useCreatePostMutation } from '@/store/api';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as z from 'zod';

export const mutationPostFormSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: 'Title must be at least 2 characters.',
    })
    .max(400, {
      message: 'Title must not be longer than 400 characters.',
    }),
  description: z
    .string()
    .min(10, {
      message: 'Description must be at least 10 characters.',
    })
    .max(3000, {
      message: 'Description must not be longer than 3000 characters.',
    }),
  content: z
    .string()
    .min(100, {
      message: 'Content must be at least 100 characters.',
    })
    .max(10000, {
      message: 'Content must not be longer than 10000 characters.',
    }),
});

type CreatePostForm = z.infer<typeof mutationPostFormSchema>;

export function CreatePost() {
  const navigate = useNavigate();
  const authorId = useAppSelector((state) => state.auth.userInfo?.id);

  const createForm = useForm<CreatePostForm>({
    resolver: zodResolver(mutationPostFormSchema),
    defaultValues: {
      title: '',
      description: '',
      content: '',
    },
  });

  const [createPostMutation] = useCreatePostMutation();

  async function onSubmit(createPostFormValues: CreatePostForm) {
    try {
      await createPostMutation({
        author_id: Number(authorId),
        ...createPostFormValues,
      }).unwrap();
      toast({
        title: 'Create post successfully',
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Create post failed',
      });
    }
  }

  return (
    <Container className="mt-16 lg:mt-20 xl:mx-48 md:mx-16">
      <div className="block space-y-6 p-10 pb-16">
        <div className="space-y-2">
          <h2 className="text-4xl font-bold">Create Post</h2>
          <p className="text-muted-foreground">
            Create a new post for others to see
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <div className="flex-1 lg:max-w-2xl">
            <Form {...createForm}>
              <form
                className="space-y-8"
                onSubmit={createForm.handleSubmit(onSubmit)}
              >
                <FormField
                  control={createForm.control}
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
                  control={createForm.control}
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
                  control={createForm.control}
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
                    Create post
                  </Button>
                  <Button
                    className="md:w-1/2"
                    variant="outline"
                    onClick={() => navigate('/')}
                  >
                    Back to home
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </Container>
  );
}
