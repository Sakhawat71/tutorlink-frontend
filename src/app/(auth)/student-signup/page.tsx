import { StudentSignupForm } from '@/components/modules/auth/registration/StudentSignUpFrom';
import React from 'react';

const SignUpStudentPage = () => {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-slate-200  p-6 md:p-10">
            <div className='flex w-full max-w-sm flex-col gap-6'>
                <StudentSignupForm />
            </div>
        </div>
    );
};

export default SignUpStudentPage;