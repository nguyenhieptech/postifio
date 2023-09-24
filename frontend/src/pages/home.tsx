import { PostPreview, SimpleLayout } from '@/components';
import { useGetPostsQuery } from '@/store/api';

export function Home() {
  const postsQuery = useGetPostsQuery();

  return (
    <SimpleLayout
      title="Being up-to-date with software design, start-up ideas and the software industry generally. Yeah yeah I know, it sounds boring."
      intro="This is an application that allows users to create, view, and manage posts."
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {postsQuery.data?.map((post) => (
            <PostPreview key={post.id} post={post} />
          ))}
          {/* TODO: Add Skeleton UI */}
          {postsQuery.isLoading ? <div>Loading...</div> : null}
          {postsQuery.isError ? <div>There were some errors...</div> : null}
        </div>
      </div>
    </SimpleLayout>
  );
}
