
function Modal({isOpen, onClose, children }) {
    if (!isOpen) return null

    return (
        <>
            <section className="absolute h-[80%] w-[80%] top-10 backdrop-blur-lg bg-[rgba(0,0,0,0.02)] flex items-center justify-center z-[2]">
                <main className="bg-gray-900 h-[80%] p-5 rounded-2xl [box-shadow:0_4px_rgba(0,0,0,0,3)] flex aspect-square my-10 flex-col items-center">
                    <button onClick={onClose} className="absolute top-[10px] right-[10px] border-0 bg-[none] text-[20px] cursor-pointer" >✖</button>
                    {children}
                </main>
            </section>
        </>
    )
}

export default Modal