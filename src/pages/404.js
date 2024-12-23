// pages/404.js
import Link from 'next/link';

const Custom404 = () => {
    return (
        <div style={{ textAlign: 'center', padding: '50px' }}>
            <h1 style={{ color: 'red' }}>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            {/*    <Link href="/">
                <a>Go back to Home</a>
            </Link> */}
        </div>
    );
};

export default Custom404;
