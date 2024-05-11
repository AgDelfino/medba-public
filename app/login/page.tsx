import { LoginTabs } from '@/components/LoginTabs/LoginTabs';
import LoginLottie from './LoginLottie';

export default function Page() {
  return (
    <section className='w-full h-[100vh] bg-slate-400 flex justify-between items-center'>
      <div className='w-1/2 h-full bg-background shadow-xl flex items-center justify-center'>
        <LoginTabs />
      </div>
      <div className='w-1/2 h-full bg-loginLottie shadow-xl flex items-center justify-center relative'>
         <LoginLottie />
      </div>
    </section>
  );
}
