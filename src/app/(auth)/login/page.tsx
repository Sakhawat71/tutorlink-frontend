// import { LoginForm } from '@/components/modules/auth/login/LoginForm';
import { LoginForm } from '@/components/modules/auth/login/login-form';
import React from 'react';

const LoginPage = () => {
    return (
        <div className="bg-slate-200 flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                <LoginForm />
            </div>
            <div>
                <h1>Hello world</h1>
            </div>
        </div>
        // <div className='h-screen w-screen flex justify-center items-center'>
        //     <LoginForm />
        // </div>
    );
};

export default LoginPage;