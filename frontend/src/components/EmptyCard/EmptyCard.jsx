import { GrDocumentMissing } from "react-icons/gr";

function EmptyCard({message}) {
  return (
    <div className='flex flex-col items-center justify-center mt-20'>
      <GrDocumentMissing className="text-9xl text-slate-400" />
      <p className='w-1/2 text-sm font-medium text-slate-700 text-center leading-7 mt-5'>{message}</p>
    </div>
  )
}

export default EmptyCard
