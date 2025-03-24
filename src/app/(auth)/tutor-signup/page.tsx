import { TutorSignupForm } from '@/components/modules/auth/registration/TutorSignUpFrom';
import React from 'react';

const TutorSignUpPage = () => {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-slate-200  p-6 md:p-10">
            <div className='flex w-full max-w-sm flex-col gap-6'>
                <TutorSignupForm />
            </div>
        </div>
    );
};

export default TutorSignUpPage;