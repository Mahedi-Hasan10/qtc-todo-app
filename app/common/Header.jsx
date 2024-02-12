import Link from 'next/link';

const Header = () => { 
  
  return (
        <section className='bg-teal-500 '>
            {/* navbar for the todo app  */}
            <nav className='flex items-center py-5 gap-[120px]  text-white max-w-[1320px] mx-auto'>
                <div className=" text-2xl font-bold text-center">
                    <a href="#" className="brand-logo text-center">QTC Todo App</a>
                </div>
               
            </nav>
        </section>
    );
};

export default Header;