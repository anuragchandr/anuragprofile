
export default function Layout(){
    return (
        <>
        <Navbar />
        <VantaBg />
        <div className="home-container">
            <Outlet />
        </div>
        </>
    );
}