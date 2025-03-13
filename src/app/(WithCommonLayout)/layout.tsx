// import Footer from "@/components/shared/Footer";
// import Navbar from "@/components/shared/Navbar";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            {/* <Navbar /> */}
            <h1>Navbar</h1>
            <main className="min-h-screen">{children}</main>
            <h1>Footer</h1>
            {/* <Footer /> */}
        </>
    );
};

export default CommonLayout;