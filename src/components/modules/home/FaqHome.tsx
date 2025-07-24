import Image from 'next/image';
import React from 'react';

const FaqHome = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 '>
            <div>

            </div>
            <div>
                <Image
                    alt='faq image'
                    src="https://i.ibb.co/BHQwz0Sq/medium-shot-kid-taking-notes.jpg"
                    width={500}
                    height={500}
                />
            </div>
        </div>
    );
};

export default FaqHome;