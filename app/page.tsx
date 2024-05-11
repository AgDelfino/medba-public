import GlobalLayout from '@/components/GlobalLayout/GlobalLayout';
import SearchUser from '@/components/SearchUser/SearchUser';

export default async function Page() {
  return (
    <GlobalLayout id='1'>
      <div className='text-primary bg-background flex flex-col items-center justify-center h-[calc(100vh-180px)]'>
        <SearchUser />
      </div>
    </GlobalLayout>
  );
}
